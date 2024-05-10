1/ Mở folder vào chạy "npm start".
2/ Chuyển đến client, chạy "npm start".
3/ Mở trình duyệt chạy localhost:3000, đăng nhập bằng tài khoản admin - 12345678 (vì tài khoản bị mã hóa và được lưu trong file userToken.json)
Khi đăng nhập bằng user không có trong file json, hệ thống sẽ tạo tài khoản mới dựa theo thông tin đó.


Nguồn JWT React: https://clerk.com/blog/building-a-react-login-page-template
Middleware authJWT: https://stackabuse.com/authentication-and-authorization-with-jwts-in-express-js/