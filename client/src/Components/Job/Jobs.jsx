import React, { useContext, useEffect, useState } from 'react'
import {Context} from "../../main"
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Toaster } from 'react-hot-toast'


function Jobs() {
  const [jobs,setJobs] = useState([])
  const {isAuthorized} = useContext(Context)
  
  const navigateto = useNavigate()

  useEffect(()=>{
    try {
      axios.get("http://localhost:4000/api/jobs/getAll",{withCredentials:true}).then(res=>{
        setJobs(res.data)
      })
    } catch (error) {
      Toaster.error(error)
    }
  },[])

  if(!isAuthorized){
    navigateto("/login")
  }
  return (
    <>
      <section className="jobs page">
        <div className="container">
          <h1>All Jobs</h1>
          <div className="banner">
            {
              jobs.jobs && jobs.jobs.map(e=>{
                return (
                  <div key={e._id} className="card">
                    <p>{e.title}</p>
                    <p>{e.category}</p>
                    <p>{e.country}</p>
                    <Link to={`/job/${e._id}`}>View Details</Link>
                  </div>
                )
              })
            }
          </div>
        </div>
      </section>
    
    </>
    )
}

export default Jobs