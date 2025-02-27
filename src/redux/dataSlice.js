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
export const postData = createAsyncThunk(
    "slot/book",
    async (slotData, { rejectWithValue }) => {
      try {
        const response = await axios.post(`${API_URL}slot/book`, slotData);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Failed to book slot");
      }
    }
);

const dataSlice = createSlice({
    name: "data",
    initialState: {
      data: [],
      status: "idle",
      error: null,
    },
    reducers: {},
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
            state.status = "succeeded";
            state.data = action.payload;
        })
        .addCase(fetchDataById.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
        })
        .addCase(postData.pending, (state) => {
            state.status = "loading";
        })
        .addCase(postData.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.data = action.payload;
        })
        .addCase(postData.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.payload;
        });
    },
});

export default dataSlice.reducer;
