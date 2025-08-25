import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Update = () => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState({
    name: "",
    type: "",
    imageUrl: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // ดึงข้อมูลร้านอาหารตาม id
  useEffect(() => {
    fetch("http://localhost:5000/api/v1/restaurants/" + id)
      .then((res) => res.json())
      .then((response) => {
        setRestaurant(response);
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to fetch restaurant data",
        });
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRestaurant({ ...restaurant, [name]: value });
  };

  const handleSubmit = async () => {
    if (!restaurant.name || !restaurant.type || !restaurant.imageUrl) {
      Swal.fire({
        icon: "warning",
        title: "Missing Data",
        text: "Please fill in all fields.",
      });
      return;
    }
    setIsLoading(true);
    try {
      const response = await fetch(
        "http://localhost:5000/api/v1/restaurants/" + id,
        {
          method: "PUT",
          body: JSON.stringify(restaurant),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Update Restaurant",
          text: "Restaurant updated successfully!",
          timer: 1500,
          showConfirmButton: false,
        }).then(() => {
          navigate("/");
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Update Restaurant",
          text: "Failed to update restaurant",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Update Restaurant",
        text: "Failed to update restaurant",
      });
    }
    setIsLoading(false);
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <div className="container mx-auto">
      <div>
        <h1 className="text-2xl text-center mt-2">Update restaurant</h1>
      </div>
      <div className="space-y-2 flex items-center flex-col my-2 w-full">
        <label className="input input-bordered flex items-center gap-2 w-[500px]">
          Restaurant Name:
          <input
            type="text"
            name="name"
            value={restaurant.name}
            className="grow w-80"
            placeholder="Restaurant Name"
            onChange={handleChange}
          />
        </label>
        <label className="input input-bordered flex items-center gap-2 w-[500px]">
          Restaurant Type:
          <input
            type="text"
            name="type"
            value={restaurant.type}
            onChange={handleChange}
            className="grow  w-80"
            placeholder="Restaurant Type"
          />
        </label>
        <label className="input input-bordered flex items-center gap-2 w-[500px]">
          Restaurant ImageUrl:
          <input
            type="text"
            className="grow"
            value={restaurant.imageUrl}
            onChange={handleChange}
            placeholder="Restaurant ImageUrl"
            name="imageUrl"
          />
        </label>
        {restaurant.imageUrl && (
          <div className="flex items-center gap-2">
            <img className="h-32" src={restaurant.imageUrl} alt="preview" />
          </div>
        )}
        <div className="space-x-2">
          <button
            className="btn btn-outline btn-success"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? "Updating..." : "Update"}
          </button>
          <button
            className="btn btn-outline btn-error"
            onClick={handleCancel}
            type="button"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Update;