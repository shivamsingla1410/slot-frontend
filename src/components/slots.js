import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchData } from "../redux/dataSlice";

function Slots() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { slots, status, error } = useSelector((state) => state.data);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  const handleSlotClick = (slot) => {
    navigate("/slot/book", { state: slot });
  };

  const formatTime = (time) => {
    const [hours, minutes] = time.split(":");
    const date = new Date();
    date.setHours(hours, minutes);
    return date.toLocaleTimeString("en-US", { hour: "numeric", hour12: true });
  };

  return (
    <div>
      <h1 style={{textAlign: "center"}}>Slots</h1>
      {status === "loading" && <p>Loading...</p>}
      {status === "failed" && <p>Error: {error}</p>}
      <ul>
        {slots?.slots.length > 0 ? (
          slots?.slots.map((item) => (
            <li key={item._id} style={{
              backgroundColor: item.is_booked === 1 ? "#ffcccc" : "white",
              cursor: "pointer",
              padding: "10px",
              margin: "5px 0",
              borderRadius: "5px",
              border: "1px solid #ddd",
              listStyle: "none"
            }} onClick={() => handleSlotClick(item)}>
              {formatTime(item.from_time)} to {formatTime(item.to_time)}
            </li>
          ))
        ) : (
          <p>No slots available</p>
        )}
      </ul>
    </div>
  );
}

export default Slots;
