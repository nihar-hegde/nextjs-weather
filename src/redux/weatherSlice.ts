import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface WeatherData {
  temperature: number;
  humidity: number;
  wind_speed: number;
  wind_direction: number;
  rain_intensity: number;
  rain_accumulation: number;
}

interface WeatherState {
  data: WeatherData | null;
  loading: boolean;
  error: string | null;
}

const initialState: WeatherState = {
  data: null,
  loading: false,
  error: null,
};

export const fetchWeatherData = createAsyncThunk(
  "weather/fetchWeatherData",
  async (localityId: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "https://www.weatherunion.com/gw/weather/external/v0/get_locality_weather_data",
        {
          params: { locality_id: localityId },
          headers: { "X-Zomato-Api-Key": process.env.NEXT_PUBLIC_API_KEY },
        }
      );
      const data = await response.data;

      return data.locality_weather_data;
    } catch (error: any) {
      if (error.response) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue("An error occurred while fetching weather data");
    }
  }
);

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeatherData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWeatherData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchWeatherData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default weatherSlice.reducer;
