import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchDataById } from "../redux/dataSlice";

function BookSlot() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { selectedSlot, status } = useSelector((state) => state.data);

  useEffect(() => {
    if (!selectedSlot) {
      navigate("/");
    } else {
      dispatch(fetchDataById(selectedSlot._id));
    }
  }, [selectedSlot, dispatch, navigate]);

  if (status === "loading" || !selectedSlot.slot) return <p>Loading...</p>;

  return (
    <div>
      <h1>Book Slot</h1>
      <form>
        <label>
          First Name:
          <input type="text" defaultValue={selectedSlot.slot.user ? selectedSlot.slot.user.first_name : ''} />
        </label>
        <br />
        <label>
          Last Name:
          <input type="text" defaultValue={selectedSlot.slot.user ? selectedSlot.slot.user.last_name : ''} />
        </label>
        <br />
        <label>
          Phone:
          <input type="text" defaultValue={selectedSlot.slot.user ? selectedSlot.slot.user.phone : ''} />
        </label>
        <br />
        <button type="button">Save</button>
        <button type="button" onClick={() => navigate("/")}>Cancel</button>
      </form>
    </div>
  );
}

export default BookSlot;
