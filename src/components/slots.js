import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSelectedSlot, fetchData } from "../redux/dataSlice";

function Slots() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { slots, status, error } = useSelector((state) => state.data);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  const handleSlotClick = (slot) => {
    dispatch(setSelectedSlot(slot));
    navigate("/slot");
  };

  return (
    <div>
      <h1>Slots:</h1>
      {status === "loading" && <p>Loading...</p>}
      {status === "failed" && <p>Error: {error}</p>}
      <ul>
        {slots?.slots.length > 0 ? (
          slots?.slots.map((item) => (
            <li key={item._id}>
              <button onClick={() => handleSlotClick(item)}>
                {item.from_time} to {item.to_time}
              </button>
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
