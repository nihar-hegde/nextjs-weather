import React from "react";
import { IconType } from "react-icons";

interface WeatherCardProps {
  icon: React.ReactElement<IconType>;
  label: string;
  value: number | null;
  unit: string;
}

const WeatherCard: React.FC<WeatherCardProps> = ({
  icon,
  label,
  value,
  unit,
}) => (
  <div className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center justify-center">
    <div className="text-3xl mb-2 text-blue-500">{icon}</div>
    <div className="text-sm text-gray-500">{label}</div>
    <div className="text-xl font-bold">
      {value !== null ? `${value}${unit}` : "N/A"}
    </div>
  </div>
);

export default WeatherCard;
