"use client";

import { AppDispatch, RootState } from "@/redux/store";
import { fetchWeatherData } from "@/redux/weatherSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Cloud, Droplets, Sun, Wind } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
const WeatherPage = ({ params }: { params: { id: string } }) => {
  const [bgColor, setBgColor] = useState("from-blue-400 to-blue-600");
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading, error } = useSelector(
    (state: RootState) => state.weather
  );

  useEffect(() => {
    dispatch(fetchWeatherData(params.id));
  }, [dispatch, params.id]);

  useEffect(() => {
    if (data && data.temperature !== null) {
      if (data.temperature < 10) {
        setBgColor("from-blue-400 to-blue-600");
      } else if (data.temperature < 20) {
        setBgColor("from-green-400 to-blue-500");
      } else if (data.temperature < 30) {
        setBgColor("from-yellow-400 to-orange-500");
      } else {
        setBgColor("from-orange-400 to-red-500");
      }
    }
  }, [data, data?.temperature]);

  const formatValue = (value: number | null, unit: string) => {
    return value !== null ? `${value.toFixed(1)}${unit}` : "N/A";
  };

  const WeatherIcon = () => {
    if (data?.rain_intensity && data.rain_intensity > 0) {
      return <Cloud className="w-16 h-16 text-white mb-4" />;
    } else if (data?.temperature && data.temperature > 25) {
      return <Sun className="w-16 h-16 text-white mb-4" />;
    } else {
      return <Cloud className="w-16 h-16 text-white mb-4" />;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        Error: {error}
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex justify-center items-center h-screen">
        No weather data available
      </div>
    );
  }

  return (
    <div
      className={`flex justify-center items-center min-h-screen w-full bg-gradient-to-br ${bgColor} p-4 transition-all duration-500`}
    >
      <Card className="w-full max-w-md bg-white/10 backdrop-blur-md shadow-lg rounded-2xl overflow-hidden border border-white/20">
        <CardContent className="p-6">
          <div className="flex flex-col items-center mb-6">
            <WeatherIcon />
            <h1 className="text-4xl font-bold text-white mb-2">Weather Now</h1>
            <div className="text-6xl font-extrabold text-white">
              {formatValue(data.temperature, "°C")}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              {
                icon: <Droplets className="w-6 h-6" />,
                label: "Humidity",
                value: formatValue(data.humidity, "%"),
              },
              {
                icon: <Wind className="w-6 h-6" />,
                label: "Wind Speed",
                value: formatValue(data.wind_speed, "m/s"),
              },
              {
                icon: <Cloud className="w-6 h-6" />,
                label: "Rain Intensity",
                value: formatValue(data.rain_intensity, "mm/h"),
              },
              {
                icon: <Cloud className="w-6 h-6" />,
                label: "Rain Accumulation",
                value: formatValue(data.rain_accumulation, "mm"),
              },
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-center p-3 bg-white/20 rounded-xl transition-all duration-300 hover:bg-white/30 hover:scale-105"
              >
                <div className="mr-3 text-white">{item.icon}</div>
                <div>
                  <div className="text-sm font-medium text-white/80">
                    {item.label}
                  </div>
                  <div className="text-lg font-bold text-white">
                    {item.value}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WeatherPage;
