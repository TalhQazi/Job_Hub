import React from "react";
import { FaSuitcase, FaBuilding, FaUsers, FaUserPlus } from "react-icons/fa"

function HeroSection() {
  const details = [
    {
      id: 1,
      title: "1,23,441",
      subTitle: "Live Job",
      icon: <FaSuitcase />,
    },
    {
      id: 2,
      title: "91220",
      subTitle: "Companies",
      icon: <FaBuilding />,
    },
    {
      id: 3,
      title: "2,34,200",
      subTitle: "Job Seekers",
      icon: <FaUsers />,
    },
    {
      id: 4,
      title: "1,03,761",
      subTitle: "Employers",
      icon: <FaUserPlus />,
    },
  ];
  return (
    <div className="heroSection">
      <div className="container">
        <div className="title">
          <h1>Find a job that suits</h1>
          <h1>your intrests and skills</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati
            dolorum nihil doloribus velit unde? Quibusdam nulla ratione
            perferendis illum ipsam debitis numquam reiciendis doloremque
            recusandae, iusto nostrum, ad qui dolores!
          </p>
        </div>
        <div className="image">
          <img src="/heroS.jpg" alt="hero" />
        </div>
      </div>
      <div className="details">
        {
          details.map((e) => {
            return (
              <div className="card" key={e.id}>
                <div className="icon">{e.icon}</div>
                <div className="content">
                  <p>{e.title}</p>
                  <p>{e.subTitle}</p>
                </div>
              </div>)
          })
        }
      </div>
    </div>
  );
}

export default HeroSection;
