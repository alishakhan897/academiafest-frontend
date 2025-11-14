import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "../App.css";

const Login = () => {
  const [form, setForm] = useState({
    india: false,
    abroad: false,
    name: "",
    gender: "",
    mobile: "",
    whatsapp: "",
    parents: "",
    email: "",
    city: "",
    course: [],
    event: "",
    ref1: "",
    ref1mobile: "",
    ref2: "",
    ref2mobile: "",
    referName: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

   
    if (name === "course") {
      let updatedCourses = [...form.course];
      if (checked) updatedCourses.push(value);
      else updatedCourses = updatedCourses.filter((c) => c !== value);

      return setForm({ ...form, course: updatedCourses });
    }

  
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

 
const handleSubmit = async (e) => {
  e.preventDefault();

  const payload = {
    interestedin: form.india
      ? "India"
      : form.abroad
      ? "Abroad"
      : "",

    name: form.name,
    gender: form.gender,
    mobile: form.mobile,
    whatsapp: form.whatsapp,
    parentMobile: form.parents,
    email: form.email,
    city: form.city,
    course: form.course,
    eventInterest: form.event,

    firstReferral: {
      name: form.ref1,
      mobile: form.ref1mobile,
    },

    secondReferral: {
      name: form.ref2,
      mobile: form.ref2mobile,
    },

    source: form.referName,
  };

  try {
    const res = await fetch("https://academiafest-backend.onrender.com/api/student", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    alert(data.message || "Form submitted successfully!");

  
  navigate("/result", { state: form });


  } catch (error) {
    console.error("Submit Error:", error);
    alert("Something went wrong!");
  }
};


  const courses = [
    "BBA", "BCA", "B.Tech", "Fashion Designing", "MBBS",
    "Law", "MBA", "PGDM",
  ];

  const events = [
    "Muzaffarpur - 06th Dec, 2025",
    "Patna - 07th Dec, 2025",
    "Jamshedpur - 13th Dec, 2025",
    "Gaya - 14th Dec, 2025",
    "Agra - 28th Dec, 2025",
    "Kanpur - 10th Jan, 2026",
    "Lucknow - 11th Jan, 2026",
    "Jaipur - 18th Jan, 2026",
  ];

  const names = [
    "Kamal", "Mayank", "Priya", "Rakesh",
    "Saniya", "Sana", "Shweta Gupta",
    "Narendra Sir", "Others",
  ];

  return (
    <>
      <main className="main-page">
        <section className="form-div">
          <header className="image-container">
            <figure className="image1">
              <img src="https://res.cloudinary.com/alishakhan987/image/upload/v1763042965/logo_rwu7oz.png" />
            </figure>
            <h1 className="heading">Students Registration Form</h1>
          </header>

          <section className="form-sec">
            <form onSubmit={handleSubmit}>
              
              <section>
                <p className="para">Interested In</p>
                <div className="checklist-container">
                  <div className="li-india">
                    <input
                      type="checkbox"
                      id="india"
                      name="india"
                      checked={form.india}
                      onChange={handleChange} 
                      className="checkbox-large"
                    />
                    <label htmlFor="india" className="label">Study in India</label>
                  </div>

                  <div className="li-india">
                    <input
                      type="checkbox"
                      id="abroad"
                      name="abroad"
                      checked={form.abroad}
                      onChange={handleChange}
                      className="checkbox-large"
                    />
                    <label htmlFor="abroad" className="label">Study Abroad</label>
                  </div>
                </div>
              </section>

         <section className="section-2">
                <label className="para">Student Name</label>
                <input
                  type="text"
                  placeholder="Enter Full Name"
                  className="student-input"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </section>

         
              <section className="section-2">
                <label className="para">Gender</label>
                <section className="radio-sec">
                  <div className="radio-gen">
                    <input
                      type="radio"
                      id="male"
                      name="gender"
                      value="Male"
                      onChange={handleChange}
                      required
                    />
                    <label htmlFor="male" className="radio-para">Male</label>
                  </div>

                  <div className="radio-gen">
                    <input
                      type="radio"
                      id="female"
                      name="gender"
                      value="Female"
                      onChange={handleChange}
                      required
                    />
                    <label htmlFor="female" className="radio-para">Female</label>
                  </div>
                </section>
              </section>

          
              <section className="section-3">
                <div className="contact-detail">
                  <label className="para">Mobile Number</label>
                  <input
                    type="number"
                    name="mobile"
                    placeholder="Enter your mobile number"
                    value={form.mobile}
                    onChange={handleChange}
                    required
                    className="student-input2"
                  />
                </div>

                <div className="contact-detail">
                  <label className="para">Whatsapp Number</label>
                  <input
                    type="number"
                    name="whatsapp"
                    placeholder="Enter your WhatsApp number"
                    value={form.whatsapp}
                    onChange={handleChange}
                    className="student-input2"
                  />
                </div>

                <div className="contact-detail">
                  <label className="para">Parent's Mobile Number</label>
                  <input
                    type="number"
                    name="parents"
                    placeholder="Enter Parent's Mobile"
                    value={form.parents}
                    onChange={handleChange}
                    className="student-input2"
                  />
                </div>

                <div className="contact-detail">
                  <label className="para">Email Id</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your Email"
                    value={form.email}
                    onChange={handleChange}
                    className="student-input2"
                  />
                </div>
              </section>

          
              <section className="section-2">
                <label className="para">City</label>
                <input
                  type="text"
                  className="student-input"
                  placeholder="Enter City"
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  required
                />
              </section>

          
              <section className="section-2">
                <label className="para">Course</label>
                <div className="course-grid">
                  {courses.map((course) => (
                    <label key={course} className="course-item">
                      <input
                        type="checkbox"
                        name="course"
                        value={course}
                        checked={form.course.includes(course)}
                        onChange={handleChange}
                      />
                      <span>{course}</span>
                    </label>
                  ))}
                </div>
              </section>

         
              <section className="section-2">
                <label className="para">Interested to Attend our Event in</label>
                <select
                  className="student-input"
                  name="event"
                  value={form.event}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select..</option>
                  {events.map((event, index) => (
                    <option key={index} value={event}>
                      {event}
                    </option>
                  ))}
                </select>
              </section>

        
              <section className="section-3">
                <div className="contact-detail">
                  <label className="para">First Referral Name</label>
                  <input
                    type="text"
                    name="ref1"
                    placeholder="Enter Friend Name"
                    value={form.ref1}
                    onChange={handleChange}
                    required
                    className="student-input2"
                  />
                </div>

                <div className="contact-detail">
                  <label className="para">Mobile</label>
                  <input
                    type="number"
                    name="ref1mobile"
                    placeholder="Enter Friend Mobile"
                    value={form.ref1mobile}
                    onChange={handleChange}
                    className="student-input2"
                  />
                </div>

                <div className="contact-detail">
                  <label className="para">Second Referral Name</label>
                  <input
                    type="text"
                    name="ref2"
                    placeholder="Enter Friend Name"
                    value={form.ref2}
                    onChange={handleChange}
                    className="student-input2"
                  />
                </div>

                <div className="contact-detail">
                  <label className="para">Mobile</label>
                  <input
                    type="number"
                    name="ref2mobile"
                    placeholder="Enter Friend Mobile"
                    value={form.ref2mobile}
                    onChange={handleChange}
                    className="student-input2"
                  />
                </div>
              </section>

          
              <section className="section-2">
                <label className="para">How you came to know about the event?</label>
                <select
                  className="student-input"
                  name="referName"
                  value={form.referName}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select..</option>
                  {names.map((name, index) => (
                    <option key={index} value={name}>
                      {name}
                    </option>
                  ))}
                </select>
              </section>

            
              <div className="section-4">
                <button type="submit">Submit</button>
              </div>
            </form>
          </section>
        </section>
      </main>
    </>
  );
};

export default Login;
