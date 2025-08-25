import React from "react";
import { useAuthContext } from "../context/AuthContext";
import RestaurantService from "../services/restaurant.service";

const Card = (props) => {
  const { user } = useAuthContext();
  const handleDelete = async (id) => {
    try {
      const response = await fetch("http://localhost:5000/restaurants/" + id, {
        method: "DELETE",
      });
      if (response.ok) {
        alert("Restaurant deleted successfully!!");
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="card bg-base-100 w-96 shadow-sm">
      <figure>
        <img src={props.img} alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {props.title}
          <div className="badge badge-secondary">NEW</div>
        </h2>
        <p>{props.type}</p>
        {user && user?.authorites?.includes("ADMIN") && (
        <div className="card-actions justify-end">
          <button
            onClick={() => handleDelete(props.id)}
            className="btn btn-error"
          >
            Delete
          </button>
          <a href={"/update/" + props.id} className="btn btn-warning">
            Edit
          </a>
        </div>
        )}
      </div>
    </div>
  );
};

export default Card;
