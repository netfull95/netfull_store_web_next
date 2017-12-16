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
  +
- Javascript.
  + Sử dụng thư viện Reactjs để cấu trúc code. https://reactjs.org/
  + Sử dụng Owl carousel để làm slide images. https://owlcarousel2.github.io/OwlCarousel2/
  + Sử dụng Shufflejs để làm responsive grid images. https://vestride.github.io/Shuffle/

# Database
  
Sử dụng localStorage của trình duyệt đê lưu giỏ hàng người dùng.

# Deployment

- Hosting: https://www.heroku.com/
- Website: zeitget.herokuapp.com
- Requirement: Nodejs 7.x.x trở lên. Git. 
- Run in local: `npm install` -> `npm install node-sass -g` -> `npm run build` -> `npm start`. Server is running on localhost:8090.
