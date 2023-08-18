//việc cấu hình type là module sẽ giúp chúng ta sử dũng các keyword như là: import mà kh cần phải sử dụng keyword require nưax

import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json()); //để nhận dữ liệu Json được submit lên từ phía Client

const books = [
  {
    id: 1,
    name: "Chi Pheo",
    author: "Nguyen Manh Hung",
  },
  {
    id: 2,
    name: "Doraemon",
    author: "Tran Quang Lam",
  },
];

app.get("/books", authenToken, (req, res) => {
  res.json({ status: "success", data: books });
});

function authenToken(req, res, next) {
  //token này đươc lấy từ phía bên client, đi qua middleware thì ta lấy ra headers
  const authorizationHeader = req.headers["authorization"];
  const authorizationCookies = req.cookies;
  console.log(authorizationHeader);
  // Beaer ['token']
  const token = authorizationHeader.split(" ")[1];
  if (!token) res.status(401); // lỗi 401 là lỗi truy cập bị từ chối
  // verify authorization xem có hợp lệ hay không
  /* truyền vào gồm 3 tham số
    1. token mà ta lấy được ở phía client
    2. SecretKey
    3. callback
  */
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
    // console.log(err, data);
    if (err) res.sendStatus(403); // lỗi 403 là lỗi kh có quyền để truy xuất
    next(); // đây là middleware nên ta phải dùng next() để chuyển tiếp chu trình đến phần tiếp theo
  });
}

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
