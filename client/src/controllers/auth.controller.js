import db from "../models/index.js";
const User = db.User;
const Role = db.Role;
import config from "../config/auth.config.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Op } from "sequelize";

const authController = {};

authController.signup = async (req, res) => {
  const { username, name, email, password } = req.body;

  if (!username || !name || !email || !password) {
    return res.status(400).send({ message: "Please provide all required fields!" });
  }

  try {
    const existingUser = await User.findOne({
      where: { username },
      attributes: { exclude: ['password'] } 
    });

    if (existingUser) {
      return res.status(400).send({ message: "Username already exists!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      name,
      email,
      password: bcrypt.hashSync(hashedPassword, 8), //ใส่การเข้ารหัสรหัสผ่าน
    });

    if (req.body.roles) {
      const roles = await Role.findAll({
        where: {
          name: {
            [Op.or]: req.body.roles
          }
        }
      });

      await newUser.setRoles(roles);
    } else {
      await newUser.setRoles([1]);
    }

    return res.send({ message: "User registered successfully." });

  } catch (error) {
    return res.status(500).send({
      message: error.message || "Something went wrong while registering a new user",
    });
  }
};

authController.signin = async (req, res) => {
  const { username, password } = req.body;  
  if (!username || !password) {
    res.status(400).send({ 
      message: "Username or password are missing!" 
    });
    return;
  }
  
  await User.findOne({
    where: { username: username },
  })
  .then((user) => {
    if (!user) {
      res.status(404).send({ message: "User not found!" });
      return;
    }
    const passwordIsValid = bcrypt.compareSync(password, user.password);
    if (!passwordIsValid) {
      res.status(401).send({ message: "Invalid Password" });
    }
    //Validate user 
    const token = jwt.sign({ username: user.username }, config.secret, { 
      expiresIn: 86400 // หมดอายุ ภายใน 24 hours
    });
    const authorities = [];
    user.getRoles().then((roles) => {
      for (let i = 0; i < roles.length; i++) {
        console.log("name", roles[i].name.toUpperCase());
        //ROLE_USER list
        authorities.push("ROLE_" + roles[i].name.toUpperCase());
      }
      // ส่งข้อมูลผู้ใช้และ token กลับไป ในสเตปที่ 3 ใน User Login ในเอกสารที่อาจารย์ให้มา
      res.send({ //ไม่ใส่ status 200 ก็ได้ เพราะเป็นค่าเริ่มต้น จะดึงอัตโนมัติ ถ้าเป็นค่าอื่นจะต้องใส่ status ด้วย เช่น 201, 400, 404, 500
        token: token,
        authorities: authorities,
        userInfo: {
          name: user.name,
          email: user.email,
          username: user.username,
          //เพื่อความปลอดภัย ไม่ให้ส่งรหัสผ่านกลับไป ไม่ฉะนั้นเขาจะเห็นรหัสผ่านของเราได้
          // password: user.password
        },
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
  });
};

export default authController;
