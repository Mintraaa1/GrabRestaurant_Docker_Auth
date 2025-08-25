import jwt, { verify } from "jsonwebtoken";
import authConfig from "../config/auth.config.js";
import db from "../models/index.js";
import sequelize from "../models/db.js";

const User = sequelize


const verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"]; // ไปดูจากclientว่าส่งtokenมาในheadersชื่ออะไร service/api.js
    if (!token) {
        return res.status(403).send({ message: "No token provided!" });// ถ้าไม่มี token จะส่ง status 403 กับ message ไป
    }
    jwt.verify(token, authConfig.secret, (err, decoded) => { // ตรวจสอบ token ว่าถูกต้องไหม โดยใช้ secret ที่กำหนดไว้ใน auth.config.js
        if (err) {
            return res.status(401).send({ message: "Unauthorized!" }); //
        }
        req.username = decoded.username; // ถ้าtokenถูกต้อง จะเอาidจากtokenมาเก็บไว้ในreq.userId
        next(); // ทำงานเสร็จแล้วจะไม่ returnอะไร แต่จะเรียก middleware ตัวถัดไป
    });
 };
 const isAdmin = (req, res, next) => { 
    User.findByPk(req.userId).then(user => { // หา user จากidที่ได้จากtoken
        user.getRoles().then((roles) => { // หา roles ของ user คนนั้น
            for (let i = 0; i < roles.length; i++) { // วนลูปเช็คว่า roles มี admin ไหม
                if (roles[i].name === "admin") {
                    next(); // ถ้ามีจะเรียก middleware ตัวถัดไป
                    return;
                }
            }
            res.status(401).send({ message: "Unauthorizef access, erquire admin role!" }); // ถ้าไม่มีจะส่ง status 401 กับ message ไป
        });
    });
 };


const authJWT = { verifyToken };

export default authJWT;