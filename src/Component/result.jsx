import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import "../App.css";

const Result = () => {
  const location = useLocation();
  const student = location.state;

  const name = student?.name || "N/A";
  const reg =
    (student?.city?.slice(0, 4) || "reg").toLowerCase() + 10092;
    
  useEffect(() => {
  document.body.classList.add("body-white");

  return () => {
    document.body.classList.remove("body-white");
  };
}, []);


  return (
    <main className="result-page">
      <img src="https://res.cloudinary.com/alishakhan987/image/upload/v1763069456/success_eusajr.png"/>

      <h1 className="result-title">
        Thank You for your registration, You can save the Pass below
      </h1>

      <p>Back to academiafest</p>
      <img src="https://res.cloudinary.com/alishakhan987/image/upload/v1763042965/logo_rwu7oz.png"/>

      <h1 className="entry-pass-head">ENTRY PASS</h1>

      <div className="poster-wrapper">
        <img
          src="https://res.cloudinary.com/alishakhan987/image/upload/v1763071735/Untitled_design_10_arssyd.png"
          className="poster-image"
          alt="Entry Pass"
        />

        <div className="poster-overlay">
          <p>{name}</p>
        </div>

        <div className="poster-overlay2">
          <p>{reg}</p>
        </div>
      </div>
    </main>
  );
};

export default Result;
