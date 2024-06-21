const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors")
const {MONGODB_CONNECTION_URL} = require('./secrets');


app.use(express.json());
app.use(cors());

// Database connection with MongoDB
mongoose.connect(MONGODB_CONNECTION_URL)

//API creation

app.get("/",(req, res)=>{
    res.send("Express App is Running")
})

// Image Storage Engine

const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req,file,cb)=>{
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({storage:storage})

//Creating upload endpoint for images
app.use('/images', express.static('upload/images'))

app.post("/upload",upload.single('product'),(req,res)=>{
    res.json({
        success:1,
        image_url:`http://localhost:${port}/images/${req.file.filename}`
    })
})

//Schema for creating products

const Product = mongoose.model("Product",{
    id: {
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    weights: [
        {
            weight: {
                type: String,
                required: true
            },
            price: {
                type: Number,
                required: true
            }
        }
    ],
    date: {
        type: Date,
        default: Date.now
    },
    available: {
        type: Boolean,
        default: true
    }
})

//Creating API for adding products

app.post('/addproduct',async(req,res)=>{
    let products = await Product.find({});
    let id_auto;
    if(products.length>0)
    {
        let last_product_array = products.slice(-1);
        let last_product = last_product_array[0];
        id_auto = last_product.id+1;
    }
    else{
        id_auto=1;
    }
    const product = new Product({
        id:id_auto,
        name:req.body.name,
        image:req.body.image,
        price:req.body.price,
    });
    console.log(product);
    await product.save();
    console.log("Saved");
    res.json({
        success: true,
        name: req.body.name,
    })
})

// Creating API for deleting Products

app.post('/removeproduct', async(req, res)=>{
    await Product.findOneAndDelete({id:req.body.id});
    console.log("Removed");
    res.json({
        success:true,
        name:req.body.name
    })
})

//Creating API for getting all products

app.get('/allproducts', async (req,res)=>{
    let products = await Product.find({});
    console.log("All products fetched");
    res.send(products);
})

// Schema creating for User model

const Users = mongoose.model('Users', {
    name: {
        type:String,
    },
    email: {
        type:String,
        unique:true,
    },
    password: {
        type:String,
    },
    cartData: {
        type:Object,
    },
    date:{
        type:Date
    }

})

//Creating Endpoint for registering the user
app.post('/signup', async(req,res)=>{
    let check = await Users.findOne({email:req.body.email});
    if(check){
        return res.status(400).json({success:false,errors:"existing user found with same email id!"})
    }
    let cart = {};
    for (let i = 0; i < 300; i++) {
        cart[i] = {}; // Each product ID now maps to an empty object
    }
    const user = new Users({
        name:req.body.username,
        email:req.body.email,
        password:req.body.password,
        cartData:cart,
    })

    await user.save();

    const data = {
        user:{
            id: user.id
        }
    }

    const token = jwt.sign(data, 'secret_ecom');
    res.json({success:true,token})
})

//Creating endpoint for user login
app.post('/login', async (req, res)=>{
    let user = await Users.findOne({email:req.body.email});
    if(user){
        const passCompare = req.body.password === user.password;
        if(passCompare){
            const data = {
                user:{
                    id:user.id
                }
            }
            const token = jwt.sign(data,'secret_ecom');
            res.json({success:true,token});
        }
        else{
            res.json({success:false,errors:"Wrong Password"});
        }
    }
    else{
        res.json({success:false,errors:"Wrong Email Id"})
    }
})

//Creating middleware to fetch user
const fetchUser = async(req, res, next)=>{
    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({errors:"Please authenticate using valid token"})
    }
    else {
        try{
            const data = jwt.verify(token, 'secret_ecom');
            req.user = data.user;
            next();
        } catch (error) {
            res.status(401).send({errors:"please authenticate using a valid token"})
        }
    }
}

//Creating endpoint for adding products in cart data
app.post('/addtocart', fetchUser, async (req, res) => {
    const { itemId, weight } = req.body;
    console.log("Added", itemId, weight);
    
    try {
        let userData = await Users.findOne({ _id: req.user.id });
        console.log(userData)
        if (!userData.cartData) {
            userData.cartData = {};
        }

        if (!userData.cartData[itemId]) {
            userData.cartData[itemId] = {};
        }
        
        if (!userData.cartData[itemId][weight]) {
            userData.cartData[itemId][weight] = 0;
        }

        userData.cartData[itemId][weight] += 1;

        await Users.findOneAndUpdate(
            { _id: req.user.id },
            { cartData: userData.cartData }
        );

        res.send("Product Added");
    } catch (error) {
        console.error("Error adding product to cart:", error);
        res.status(500).send("Internal Server Error");
    }
});

//Creating endpoint for removing products in cart data
app.post('/removefromcart', fetchUser, async (req, res) => {
    const { itemId, weight } = req.body;
    console.log("Removed", itemId, weight);
    
    try {
        let userData = await Users.findOne({ _id: req.user.id });

        if (userData.cartData[itemId] && userData.cartData[itemId][weight]) {
            userData.cartData[itemId][weight] -= 1;

            // Remove the weight if the quantity drops to 0
            if (userData.cartData[itemId][weight] <= 0) {
                delete userData.cartData[itemId][weight];
            }

            // Remove the item if no weights are left
            if (Object.keys(userData.cartData[itemId]).length === 0) {
                delete userData.cartData[itemId];
            }

            await Users.findOneAndUpdate(
                { _id: req.user.id },
                { cartData: userData.cartData }
            );

            res.send("Product Removed");
        } else {
            res.status(400).send("Product not found in cart or weight not found");
        }
    } catch (error) {
        console.error("Error removing product from cart:", error);
        res.status(500).send("Internal Server Error");
    }
});


app.post('/getcart', fetchUser, async(req, res)=>{
    console.log("Get Cart");
    let userData = await Users.findOne({_id:req.user.id});
    res.json(userData.cartData);
})



app.listen(port,(error)=>{
    if(!error){
        console.log("Server Running on Port "+port)
    }
    else{
        console.log("Error: "+error)
    }
})