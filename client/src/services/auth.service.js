import api from "./api";
import TokenService from "./token.service";

const API_URL = import.meta.env.VITE_API_URL; // ชื่อ API_URL ต้องตรงกับที่ตั้งไว้ในไฟล์ .env

const register = async (username, name, email, password) => {
    return await api.post(API_URL + "/signup", {
        username,
        name,
        email,
        password,
    });
};

const login = async (username, password) => {
    const response = await api.post(API_URL + "/signin", {
        username,
        password,
    });
    // ถ้า response มี token ให้เก็บไว้ใน localStorage
    if (!response.data.token) {
        return response; // ถ้าไม่มี token ใน response ให้ส่ง response กลับไป
    }
    TokenService.setUser(response.data); // เก็บข้อมูลผู้ใช้และ token ลงใน localStorage
    return response; // ส่ง response กลับไปเพื่อให้สามารถใช้งานต่อได้
};

const logout = () => {    // ไม่เป็น async เพราะไม่ต้องรอการตอบกลับจาก server หรือไม่ต้องไปบอกเขาว่าเราออกจากระบบแล้ว
    TokenService.removeUser(); // ลบข้อมูลผู้ใช้และ token ออกจาก localStorage
};

const AuthService = {
    register,
    login,
    logout,
};
export default AuthService; // ส่งออก AuthService เพื่อให้สามารถนำไปใช้ในส่วนอื่น ๆ ของแอปพลิเคชันได้
// AuthService จะถูกใช้ในส่วนที่เกี่ยวข้องกับการจัดการการเข้าสู่ระบบ