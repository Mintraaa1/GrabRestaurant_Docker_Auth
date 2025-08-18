import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import Restaurants from "../components/Restaurants";
import RestaurantsService from "../services/RestaurantService"; // แก้ชื่อ import ให้ถูกต้อง
import Swal from "sweetalert2"; // แก้ชื่อ import ให้ถูกต้อง

const API_URL = import.meta.env.VITE_API_URL; // ชื่อ VITE_API_URL ต้องตรงกับที่ตั้งไว้ในไฟล์ .env

const Home = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [loding, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = (keyword) => {
    if (keyword === "") {
      setFilteredRestaurants(restaurants);
      return;
    }
    const result = restaurants.filter((restaurant) => {
      return (
        restaurant.title.toLowerCase().includes(keyword.toLowerCase()) ||
        restaurant.type.toLowerCase().includes(keyword.toLowerCase())
      );
    });
    setFilteredRestaurants(result);
  };


  useEffect(() => {
    // call api: getAllRestaurants
    const getAllRestaurants = async () => {
      try {
        const response = await RestaurantService.getAllRestaurants();
        if (response.status === 200) {
          setRestaurants(response.data);
          setFilteredRestaurants(response.data);
        }
      } catch (error) {
        Swal.fire({
          title: "Get All Restaurants",
          icon: "error",
          text: error?.response?.data?.message || error.message,
        });
      }
    };
    getAllRestaurants();
  }, []);






  return (
    <div className="container mx-auto">
      {/* Navigation Bar */}
      <NavBar />

      {/* Header */}
      <div>
        <h1 className="title justify-center text-3xl text-center m-5 p-5">
          Grab Restaurant 5555
        </h1>
      </div>

      {/* Search Box */}
      <div className="mb-5 flex justify-center items-center ">
        <label className="input flex items-center gap-2 w-2xl">
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox=