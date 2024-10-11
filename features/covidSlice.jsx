// features/covidSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchCovidData = createAsyncThunk('covid/fetchData', async () => {
    const response = await fetch('https://disease.sh/v3/covid-19/countries');
    return response.json();
});

const covidSlice = createSlice({
    name: 'covid',
    initialState: {
        data: [],
        status: 'idle', // or 'loading', 'succeeded', 'failed'
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCovidData.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCovidData.fulfilled, (state, action) => {
                state.status = 'succeeded';
                // Add any fetched data to the array
                state.data = action.payload;
            })
            .addCase(fetchCovidData.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default covidSlice.reducer;
