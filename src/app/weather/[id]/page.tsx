import React from "react";

const WeatherPage = ({ params }: { params: { id: string } }) => {
  return (
    <main className="flex flex-col items-center justify-center h-screen p-24">
      <h1 className="text-4xl font-bold">Weather Page</h1>
      <p className="text-xl">ID: {params.id}</p>
    </main>
  );
};

export default WeatherPage;
