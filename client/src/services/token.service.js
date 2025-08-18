const getUser = () => {
return JSON.parse(localStorage.getItem("user"))

}
//มี get อย่าลืมมี set ด้วย
const setUser = (user) => {
localStorage.setItem("user", JSON.stringify(user))
}

const getlocalAccessToken = () => {
    const user = getUser(); //เรียกใช้ฟังก์ชัน getUser เพื่อดึงข้อมูลผู้ใช้
    // if user 
    //    return user.token;
    // แบบข้างบนคือแบบเต็ม แบบที่ใช้ตอนนี้คือแบบย่อ
    return user?.token;
};

const removeUser = () => {
    localStorage.removeItem("user"); // ลบข้อมูลผู้ใช้จาก localStorage
}
const TokenService = { // สร้างออบเจ็กต์ TokenService เพื่อเก็บฟังก์ชันที่เกี่ยวข้องกับการจัดการ token
    getlocalAccessToken,  // ฟังก์ชันนี้จะใช้เพื่อดึง access token จาก localStorage
    getUser,             // ฟังก์ชันนี้จะใช้เพื่อดึงข้อมูลผู้ใช้จาก localStorage
    setUser,             // ฟังก์ชันนี้จะใช้เพื่อบันทึกข้อมูลผู้ใช้ลงใน localStorage
    removeUser           // ฟังก์ชันนี้จะใช้เพื่อลบข้อมูลผู้ใช้จาก localStorage
};
export default TokenService; // ส่งออก TokenService เพื่อให้สามารถนำไปใช้ในส่วนอื่น ๆ ของแอปพลิเคชันได้
// TokenService จะถูกใช้ในส่วนที่เกี่ยวข้องกับการจัดการ token เช่น การเข้าสู่ระบบ การออกจากระบบ และการตรวจสอบสถานะการเข้าสู่ระบบ
// การใช้ TokenService จะช่วยให้การจัดการ token เป็นระเบียบและง่ายต่อ