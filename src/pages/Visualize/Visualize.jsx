import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

export default function Visualize() {
  
  const [autoGenerate, setAutoGenerate] = useState(true);  
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().slice(0, 10)); 
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
  });

   
  const handleAutoGenerate = () => {
    setAutoGenerate(true);
    setSelectedDate(new Date().toISOString().slice(0, 10));  
  };

  
  const handleManualSelect = () => {
    setAutoGenerate(false);
    setSelectedDate("");  
  };

  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();  

    const dataToSend = { ...formData, date: selectedDate };

    try {
      const response = await axios.post("http://localhost:5000/api/visualize/data", dataToSend);
      console.log(response.data);  
      alert("Data submitted successfully!");

       
      setFormData({
        name: "",
        email: "",
        phone: "",
        location: "",
      });
      
  
      if (autoGenerate) {
        setSelectedDate(new Date().toISOString().slice(0, 10)); 
      } else {
        setSelectedDate("");  
      }

    } catch (error) {
      console.error(error);
      alert("Error submitting data.");
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Visualize</h2>

       
      <div className="d-flex mb-3">
        <button
          className={`btn ${autoGenerate ? "btn-primary" : "btn-outline-primary"} me-2`}
          onClick={handleAutoGenerate}
        >
          Auto Generate Date
        </button>
        <button
          className={`btn ${!autoGenerate ? "btn-primary" : "btn-outline-primary"}`}
          onClick={handleManualSelect}
        >
          Select Date Manually
        </button>
      </div>

 
      {!autoGenerate && (
        <div className="d-inline">
          <input
            type="date"
            className="form-control d-inline w-auto"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </div>
      )}

      
      {autoGenerate && <div><p>Auto-Generated Date: {selectedDate}</p></div>}

      <hr />

   
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="phone" className="form-label">Phone Number</label>
          <input
            type="tel"
            className="form-control"
            id="phone"
            name="phone"
            placeholder="Enter your phone number"
            value={formData.phone}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="location" className="form-label">Location</label>
          <select
            className="form-select"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Location</option>
            <option value="Erode">Erode</option>
            <option value="Salem">Salem</option>
            <option value="Coimbatore">Coimbatore</option>
            <option value="Tirupur">Tirupur</option>
            <option value="Ooty">Ooty</option>
          </select>
        </div>

        <button type="submit" className="btn btn-success">Submit</button>
      </form>
    </div>
  );
}
