import React from "react";
import Products from "./Products";
import Services from "./Services";
import Consultations from "./Consultations";

const AllOrdersBookings = () => {
  return (
    <div className="space-y-4">
      <Products />
      <Services />
      <Consultations />
    </div>
  );
};

export default AllOrdersBookings;
