import React from "react";
import Products from "./Products";
import Services from "./Services";
import Consultations from "./Consultations";
import Subscriptions from "../Subscriptions";

const AllOrdersBookings = () => {
  return (
    <div className="space-y-4">
      <Products />
      <Services />
      <Consultations />
      <Subscriptions />
    </div>
  );
};

export default AllOrdersBookings;
