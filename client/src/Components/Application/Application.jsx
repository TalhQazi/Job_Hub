import React, { useContext, useState } from "react";
import { Context } from "../../main";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

function Application() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [resume, setResume] = useState(null);

  const { isAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();

  if (user && user.role === "Employer") {
    navigateTo("/");
  }
  //Function foo handling input file
  const handeFileChange = (e) => {
    const resume = e.target.files[0];
    setResume(resume);
    // console.log(resume);
  };

  const { id } = useParams();
  const handleApplication = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("address", address);
    formData.append("coverLetter", coverLetter);
    formData.append("resume", resume);
    formData.append("jobId", id);
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/apps/postApplication",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success("Application submitted successfully");
      navigateTo("/application/me");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <>
      <div className="application">
        <div className="container">
          <h3>Application Fomr</h3>
          <form onSubmit={handleApplication}>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="number"
              placeholder="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />

            <input
              type="text"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />

            <textarea
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              placeholder="Cover Letter"
            />

            <div>
              <label
                style={{
                  textAlign: "start",
                  display: "block",
                  fontSize: "20px",
                }}
              >Select Resume</label>

              <input style={{width:"100%"}} type="file" accept=".jpg,.png,.webp,.jpeg" onChange={handeFileChange}/>
            </div>

            <button type="submit">Submit Application</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Application;
