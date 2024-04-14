import React from 'react'
import './Usp.css'
import Tree from '../Assets/Tree Planting.png'
import Sales from '../Assets/Total Sales.png'
import Honeycombs from '../Assets/Honeycombs.png'
import Crowd from '../Assets/Crowd.png'
import Bee from '../Assets/Bee.png'

const Usp = () => {
  return (
    <>
      <div className="usp">
        <div className="organic">
            <p>Organic.Raw.Natural</p>
        </div>
        <div className="usp-one">
            <div className="usp-left">
                <div className="pollinator">
                    <img src={Bee} alt="Bee" />
                    <p>Pollinator Wellfare</p>
                </div>
                <div className="community">
                    <img src={Crowd} alt="Crowd" />
                    <p>Community Engagement</p> 
                </div>
            </div>
            <div className="usp-right">
                <div className="beee">
                    <img src={Honeycombs} alt="Honeycombs" />
                    <p>Bee-Friendly Farming</p>
                </div>
                <div className="continuous">
                    <img src={Sales} alt="Sales" />
                    <p>Continuous Improvement</p>
                </div>
            </div>
        </div>
        <div className="usp-two">
            <img src={Tree} alt="Tree" />
            <p>Environmental Stewardship</p>
        </div>
      </div>
    </>
  )
}

export default Usp
