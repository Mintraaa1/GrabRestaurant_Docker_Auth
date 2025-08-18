import axios from "axios";
const baseURL = import.meta.env.VITE_API_URL; // ชื่อ VITE_API_URL ต้องตรงกับที่ตั้งไว้ในไฟล์ .env
import TokenService from "./token.service";

const instance = axios.create({
    baseURL: baseURL,
    headers: {                               // headers จะรับมาเป็น object
        "Content-Type": "application/json",  //mesage ที่ส่งไปจะเป็น JSON
    },
});

//add interceptors to request objects คือการดักจับ request ก่อนที่จะส่งไปยัง server
instance.interceptors.request.use(   //object ใหญ่สุดคือinstance     .คือaxios.create     จะไปดักจับ request ที่จะส่งไปยัง server ถ้าเจอ use เมื่อไร จะใช้ middleware เสมอ
    (config) => {
        //receive after logged in
        //TODO

        const token = TokenService.getlocalAccessToken(); // ดึง token จากที่เก็บไว้ใน localStorage หรือที่อื่น ๆ
        if (token) {
            config.headers["x-access-token"] = token; // ถ้ามี token จะเพิ่มเข้าไปใน headers ของ request
        }
        return config; // ส่ง config กลับไปเพื่อให้ request ดำเนินการต่อ
    },
    (error) => {
        return Promise.reject(error); // ถ้ามี error ในการดักจับ request จะส่ง error กลับไป
    }
);

export default instance;
