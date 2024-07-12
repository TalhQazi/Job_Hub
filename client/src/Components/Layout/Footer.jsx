import React, { useContext } from 'react'
import { Context } from '../../main'
import { Link } from 'react-router-dom'
import {FaFacebook,FaYoutube,FaLinkedin} from "react-icons/fa"
import {RiInstagramFill} from "react-icons/ri"

function Footer() {
  const {isAuthorized} = useContext(Context)
  return (
    <footer className={isAuthorized ? "footerShow" : "footerHide"}> 
      <div>
        &copy; All Rights Reserved By JobHUB
      </div>
      <div>
      <Link path={"/"} target="_black" ><FaFacebook /></Link>
      <Link path={"/"} target="_black" ><FaYoutube /></Link>
      <Link path={"/"} target="_black" ><FaLinkedin /></Link>
      <Link path={"/"} target="_black" ><RiInstagramFill/></Link>
        
      </div>
    </footer>
  )
}

export default Footer