import React from "react";
import Card from "./Card";
import { useAuthContext } from "../context/AuthContext";
const Restaurants = ({ restaurants }) => {
  const { user } = useAuthContext();
  if (!Array.isArray(restaurants)) {
    return <div>No content</div>;
  }
  return (
    <div className="flex">
      <div className="flex flex-wrap justify-center gap-4">
        {restaurants.map((restaurant) => (
          <Card
            key={restaurant.id}
            id={restaurant.id}
            title={restaurant.title}
            type={restaurant.type}
            img={restaurant.img}
          />
        ))}
        {user && <div>You don't have permission to access this content</div>}
      </div>
    </div>
  );
};

export default Restaurants;
