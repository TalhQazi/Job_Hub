import React from 'react'
import { FaApple, FaMicrosoft } from 'react-icons/fa';
import {SiTesla} from "react-icons/si"

function PopularCompanies() {
  
const companies = [
  {
    id: 1,
    title: "LEGEND COLLEGE",
    location: "Multan, Pakistan",
    openPositions: 10,
    icon: <FaMicrosoft />,
  },
  {
    id: 2,
    title: "Tesla",
    location: "Street 10 Karachi, Pakistan",
    openPositions: 5,
    icon: <SiTesla />,
  },
  {
    id: 3,
    title: "Apple",
    location: "Street 10 Karachi, Pakistan",
    openPositions: 20,
    icon: <FaApple />,
  },
];

  return (
    <>
    <div className="companies">
      <div className="container">
        <h3>Top Companies</h3>
        <div className="banner">
          {
            companies.map(e=>{
              return(
                <div className="card" key={e.id}>
                  <div className="content">
                    <div className="icon">{e.icon}</div>
                    <div className="text">
                      <p>{e.title}</p>
                      <p>{e.location}</p>
                    </div>
                  </div>

                  <button>Open Positions {e.openPositions}</button>
                </div>
              )
            })
          }
        </div>
      </div>

    </div>
    </>
  )
}

export default PopularCompanies