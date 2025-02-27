import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchDataById, postData } from "../redux/dataSlice";
import "../App.css";

function BookSlot() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { data, status } = useSelector((state) => state.data);

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    phone: "",
  });

  const [errors, setErrors] = useState(null);

  useEffect(() => {
    if (!location.state) {
      navigate("/");
    }
    if (location.state) {
      dispatch(fetchDataById(location.state._id));
    }
  }, [dispatch, location.state, navigate]);

  useEffect(() => {
    if (data?.slot?.user) {
      setFormData({
        first_name: data.slot.user.first_name || "",
        last_name: data.slot.user.last_name || "",
        phone: data.slot.user.phone || "",
      });
    } else {
      // Resetting formData
      setFormData({
        first_name: "",
        last_name: "",
        phone: "",
      });
    }
  }, [data]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors(null);

    try {
      const response = await dispatch(
        postData({
          slot_id: data.slot._id,
          ...formData,
        })
      ).unwrap();

      if (status === "succeeded") {
        alert(response.message);
        navigate("/");
      }
    } catch (err) {
      setErrors(err || "Something went wrong!");
    }
  };

  const formatTime = (time) => {
    const [hours, minutes] = time.split(":");
    const date = new Date();
    date.setHours(hours, minutes);
    return date.toLocaleTimeString("en-US", { hour: "numeric", hour12: true });
  };

  if (status === "loading" || !data?.slot) return <p>Loading...</p>;

  return (
    <div className="book-slot-container">
      <h1 className="book-slot-heading">Book Slot ({formatTime(data.slot.from_time)} to {formatTime(data.slot.to_time)})</h1>
      {errors && <p className="book-slot-error">{errors}</p>}
      <form onSubmit={handleSubmit} className="book-slot-form">
        <label className="book-slot-label">First Name:</label>
        <input
          type="text"
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
          className="book-slot-input"
          placeholder="Enter first name"
        />

        <label className="book-slot-label">Last Name:</label>
        <input
          type="text"
          name="last_name"
          value={formData.last_name}
          onChange={handleChange}
          className="book-slot-input"
          placeholder="Enter last name"
        />

        <label className="book-slot-label">Phone:</label>
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="book-slot-input"
          placeholder="Enter phone number"
        />

        <div className="book-slot-button-container">
          <button type="submit" className="book-slot-button">Save</button>
          <button type="button" onClick={() => navigate("/")} className="book-slot-cancel-button">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );


}

export default BookSlot;
