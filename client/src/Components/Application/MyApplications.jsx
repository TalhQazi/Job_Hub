import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../main";
import axios from "axios";
import toast from "react-hot-toast";
import ResumeModal from "./ResumeModal";
import { useNavigate } from "react-router-dom";

function MyApplications() {
  const { user, isAuthorized } = useContext(Context);
  const [modalOpen, setModalOpen] = useState(false);
  const [imageUrl, setimageUrl] = useState("");
  const [applications, setApplications] = useState([]);
  
  useEffect(() => {
    try {
      if (user && user.role === "Employer") {
        axios
          .get("http://localhost:4000/api/apps/employer/getall", {
            withCredentials: true,
          })
          .then((res) => {
            setApplications(res.data.myApplications);
          });
      } else {
        axios
          .get("http://localhost:4000/api/apps/jobseeker/getall", {
            withCredentials: true,
          })
          .then((res) => {
            setApplications(res.data.myApplications);
          });
      }
    } catch (error) {
      toast.error(error.response.message);
    }
  }, [applications]);

  const deleteApp = async (id) => {
    
    try {
      await axios.delete(`http://localhost:4000/api/apps/deletejob/${id}`, {
          withCredentials: true,
        }).then(() => {
          toast.success("Deleted Successfully");
          //  setApplications((prevApps) => {
          //  prevApps.filter(app => app._id != id);
          //  });
          const navigatTo = useNavigate()
          navigatTo("/application/hell")
        });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const openModal = (imageUrl) => {
    setimageUrl(imageUrl);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  console.log("Page's rendered");
  return (
    <>
      <section className="my_applications page">
        {user && user.role == "Job Seeker" ? (
          <div className="container">
            <h3>My Applications</h3>
            {applications.map((app) => {
              return (
                <JobSeekerCard
                  element={app}
                  key={app._id}
                  deleteApplication={deleteApp}
                  openModal={openModal}
                />
              );
            })}
          </div>
        ) : (
          <div className="container">
            <h3>Applications Received</h3>
            {applications.map((app) => {
              return (
                <EmployerCard
                  element={app}
                  key={app._id}
                  openModal={openModal}
                />
              );
            })}
          </div>
        )}
        {modalOpen && <ResumeModal imageUrl={imageUrl} onClose={closeModal} />}
      </section>
    </>
  );
}

export default MyApplications;

const JobSeekerCard = ({element, deleteApplication, openModal}) => {
  
  return (
    <>
      <div className="job_seeker_card">
        <div  style={{width:"50%"}} className="details">
          <p>
            <span style={{fontWeight:"bold",marginRight:"10px"}}>Name:</span>
            {element.name}
          </p>
          <p>
            <span style={{fontWeight:"bold",marginRight:"10px"}}>Email:</span>
            {element.email}
          </p>
          <p>
            <span style={{fontWeight:"bold",marginRight:"10px"}}>Phone:</span>
            {element.phone}
          </p>
          <p>
            <span style={{fontWeight:"bold",marginRight:"10px"}}>Address:</span>
            {element.address}
          </p>
          <p  style={{width:"30%"}}>
            <span style={{fontWeight:"bold",marginRight:"10px"}}>Cover Letter:</span>
            {element.coverLetter}
          </p>
        </div>

        <div className="resume">
          <img
            src={element.resume.url}
            alt="resume"
            onClick={() => {
              openModal(element.resume.url);
            }}
          />
        </div>

        <div className="btn_area">
          <button onClick={() => deleteApplication(element._id)}>Delete</button>
        </div>
      </div>
    </>
  );
};

const EmployerCard = ({element,openModal}) => {
  console.log(element);
  return (
      <>
      <div className="job_seeker_card">
        <div  style={{width:"50%"}} className="details">
          <p>
            <span style={{fontWeight:"bold",marginRight:"10px"}}>Name:</span>
            {element.name}
          </p>
          <p>
            <span style={{fontWeight:"bold",marginRight:"10px"}}>Email:</span>
            {element.email}
          </p>
          <p>
            <span style={{fontWeight:"bold",marginRight:"10px"}}>Phone:</span>
            {element.phone}
          </p>
          <p>
            <span style={{fontWeight:"bold",marginRight:"10px"}}>Address:</span>
            {element.address}
          </p>
          <p  style={{width:"30%"}}>
            <span style={{fontWeight:"bold",marginRight:"10px"}}>Cover Letter:</span>
            {element.coverLetter}
          </p>
        </div>

        <div className="resume">
          <img
            src={element.resume.url}
            alt="resume"
            onClick={() => {
              openModal(element.resume.url);
            }}
          />
        </div>
      </div>  
  </>
)};
