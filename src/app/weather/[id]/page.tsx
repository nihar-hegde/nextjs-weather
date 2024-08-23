"use client";

import { AppDispatch, RootState } from "@/redux/store";
import { fetchWeatherData } from "@/redux/weatherSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const WeatherPage = ({ params }: { params: { id: string } }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading, error } = useSelector(
    (state: RootState) => state.weather
  );

  useEffect(() => {
    dispatch(fetchWeatherData(params.id));
  }, [dispatch, params.id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-24">
      <h1 className="text-4xl font-bold mb-8">Weather Information</h1>
      {data ? (
        <div className="bg-white shadow-md rounded-lg p-6">
          <p className="text-xl mb-4">Locality ID: {params.id}</p>
          <p>Temperature: {data.temperature}°C</p>
          <p>Humidity: {data.humidity}%</p>
          <p>Wind Speed: {data.wind_speed} m/s</p>
          <p>Wind Direction: {data.wind_direction}°</p>
          <p>Rain Intensity: {data.rain_intensity} mm/hr</p>
          <p>Rain Accumulation: {data.rain_accumulation} mm</p>
        </div>
      ) : (
        <p>No weather data available</p>
      )}
    </main>
  );
};

export default WeatherPage;
