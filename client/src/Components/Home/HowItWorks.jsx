import React from "react";
import { FaUserPlus } from "react-icons/fa";
import { MdFindInPage } from "react-icons/md";
import { IoMdSend } from "react-icons/io";

function HowItWorks() {
  return (
    <div className="howitworks">
      <div className="container">
        <h3>How JobHUB works</h3>
        <div className="banner">
          <div className="card">
            <FaUserPlus />
            <p>Create Account</p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quae
              nemo cupiditate earum laborum autem excepturi.
            </p>
          </div>
       
          <div className="card">
            <MdFindInPage />
            <p>Find a job/Post a job</p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quae
              nemo cupiditate earum laborum autem excepturi.
            </p>
          </div>

                  
          <div className="card">
            <IoMdSend />
            <p>Create Account</p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quae
              nemo cupiditate earum laborum autem excepturi.
            </p>
          </div>

        </div>


      </div>
    </div>
  );
}

export default HowItWorks;
