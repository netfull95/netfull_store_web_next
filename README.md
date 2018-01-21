A simple webdesign. In this app:

# Server:

- Sử dụng Server viết bằng nodejs https://nodejs.org/en/
- Sử dụng kĩ thuật server side rendering để render react từ server

# Front end:

- Html.
- Css.
  + Sử dụng kĩ thuật BEM để naming class. http://getbem.com/

  + Sử dụng preprocessor SASS.http://sass-lang.com/

  + Sử dụng bộ Icons của Font-awesome http://fontawesome.io/icons/

  + Font-family: "Dosis", "Lato", sans-serif. `https://fonts.google.com/specimen/Dosis` `https://fonts.google.com/specimen/Lato`

- Javascript.
  + Sử dụng thư viện Reactjs để cấu trúc code. https://reactjs.org/
  + Sử dụng Owl carousel để làm slide images. https://owlcarousel2.github.io/OwlCarousel2/
  + Sử dụng Shufflejs để làm responsive grid images. https://vestride.github.io/Shuffle/

# Database

Sử dụng localStorage của trình duyệt đê lưu giỏ hàng người dùng.

# Development
To run this project:

Requires:
- Nodejs & npm - Install: https://nodejs.vn/
- Node-sass: `npm install -g node-sass`

### Run production mode in local:
- In root directory, run: `npm install`
- Run these commands in order: `npm run build` -> `npm run build-scss` -> `npm run start-window`

### Run development mode in local:
- In root directory, run: `npm install`
- Run these commands in order: `npm run build` -> `npm run build-scss` -> `npm run dev`

# Deployment

- Hosting: https://www.heroku.com/
- Website: zeitget.herokuapp.com
- Yêu cầu chạy server: Nodejs 7.x.x trở lên. [Download](https://nodejs.org/en/) và Git. [Download](https://git-scm.com/downloads)
- Sau khi có git và nodejs. Vào thư mục chứa project. Click `chuột phải` -> `git bash here`.
Trong command line interface. Gõ lệnh `node -v` và `npm -v` để check version của nodejs.
Sau đó chạy lệnh. `npm install`. Sau đó build file : `npm run build`. Sau khi build. chạy server : `npm start`.
- Chạy trên môi trường window: chạy command prompt ở chế độ Administrator.
`npm install` -> `npm run build` -> `npm run build-scss` -> `npm run start-window`
