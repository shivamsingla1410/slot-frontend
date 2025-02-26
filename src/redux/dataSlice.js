import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

// Getting all slots
export const fetchData = createAsyncThunk("slots", async () => {
  const response = await axios.get(`${API_URL}slots`);
  return response.data;
});

// Getting slot by id
export const fetchDataById = createAsyncThunk("slot/:id", async (id) => {
    const response = await axios.get(`${API_URL}slot/${id}`);
    return response.data;
});

// Booking slot
export const postData = createAsyncThunk("slot/book", async (newData) => {
  const response = await axios.post(`${API_URL}slot/book`, newData);
  return response.data;
});

const dataSlice = createSlice({
    name: "data",
    initialState: {
      data: [],
      selectedSlot: null,
      status: "idle",
      error: null,
    },
    reducers: {
      setSelectedSlot: (state, action) => {
        state.selectedSlot = action.payload;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchData.pending, (state) => {
            state.status = "loading";
        })
        .addCase(fetchData.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.slots = action.payload;
        })
        .addCase(fetchData.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
        })
        .addCase(fetchDataById.pending, (state) => {
            state.status = "loading";
        })
        .addCase(fetchDataById.fulfilled, (state, action) => {
            state.selectedSlot = action.payload;
            state.status = "succeeded";
        })
        .addCase(fetchDataById.rejected, (state, action) => {
            state.error = action.error.message;
            state.status = "failed";
        })
        .addCase(postData.fulfilled, (state, action) => {
            state.data.push(action.payload);
        });
    },
});

export const { setSelectedSlot } = dataSlice.actions;
export default dataSlice.reducer;
