import api from './api';
const RESTO_API = import.meta.env.VITE_API_URL; // ชื่อ VITE_API_URL ต้องตรงกับที่ตั้งไว้ในไฟล์ .env

//get all restaurants
const getAllRestaurants = async () => {
    return await api.get(RESTO_API);
};

// get restaurants by ID
const getRestaurantById = async (id) => {
    return await api.get(`${RESTO_API}/${id}`);
};  
// update restaurant by ID
const editRestaurantById = async (id, restaurant) => {
    return await api.put(`${RESTO_API}/${id}`, restaurant);
};
//add restaurant
const insertRestaurant = async (restaurant) => {
    return await api.post(RESTO_API, restaurant);
};
//delete restaurant
const deleteRestaurant = async (id) => {
    return await api.delete(`${RESTO_API}/${id}`);
};


const RestaurantService = {
    getAllRestaurants,
    getRestaurantById,
    editRestaurantById,
    insertRestaurant,
    deleteRestaurant
}

export default RestaurantService;