//việc cấu hình type là module sẽ giúp chúng ta sử dũng các keyword như là: import mà kh cần phải sử dụng keyword require nưax

import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 5500;
app.use(express.json()); //để nhận dữ liệu Json được submit lên từ phía Client

//thực tế thì sẽ lưu mảng refreshToken này ở trong Db
const refreshTokens = []; // mẳng chưa tất cả các mã Token khi mà ngdung đăng nhập vô

app.post("/refreshToken", (req, res) => {
  const refreshToken = req.body.token;
  console.log(refreshToken);
  if (!refreshToken) res.sendStatus(401);
  if (!refreshTokens.includes(refreshToken)) res.sendStatus(403); // k có quyền

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, data) => {
    console.log(err, data);
    if (err) res.sendStatus(403);

    //nếu AcccessToken hợp lệ thì ta sẽ tạo ra 1 accessToken mới
    const accessToken = jwt.sign(
      { username: data.username },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "30s" }
    );

    res.json({ accessToken });
  });
});

app.post("/login", (req, res) => {
  //Authendication

  //Authorization
  //3 tham số
  /*
    1. Thông tin payload mà ta muốn đưa vào token này
    2. SecretKey
    3. ExpirerIn, ... (nhiều option mà ta muốn, ở đây ví dụ là thời gian token này nãy được cấp lại sau 30s)
    */
  const data = req.body; // là thông tin client gửi lên ( username, email, ...)
  const accessToken = jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "30s",
  });

  const refreshToken = jwt.sign(data, process.env.REFRESH_TOKEN_SECRET);
  refreshTokens.push(refreshToken);
  console.log(refreshTokens);
  res.json({ accessToken, refreshToken });
  console.log({ data });
});

// khi client đăng xuất, chúng ta cần xoá đi accessToken
app.post("/logout", (req, res) => {
  const refreshToken = req.body.token;
  refreshTokens.filter((refToken) => refToken !== refreshToken);
  res.sendStatus(200);
});
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
