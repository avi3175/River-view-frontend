import React from "react";

const About = () => {
  return (
    <div
      className="relative h-screen bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://st.depositphotos.com/57907330/56483/i/450/depositphotos_564831544-stock-photo-sunset-twilight-landscape-silhpuette-blue.jpg')", // Replace this URL with your image URL
      }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 flex items-center justify-center h-full text-center text-white px-6">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold">
          More than you think. <br /> More than you expect.
        </h1>
      </div>
    </div>
  );
};

export default About;
