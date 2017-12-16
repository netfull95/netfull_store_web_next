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

# Deployment

- Hosting: https://www.heroku.com/
- Website: zeitget.herokuapp.com
- Yêu cầu chạy server: Nodejs 7.x.x trở lên. [Download](https://nodejs.org/en/) và Git. [Download](https://git-scm.com/downloads)
- Sau khi có git và nodejs. Vào thư mục chứa project. Click `chuột phải` -> `git bash here`.
Trong command line interface. Gõ lệnh `node -v` và `npm -v` để check version của nodejs.
Sau đó chạy lệnh. `npm install`. Sau đó build file : `npm run build`. Sau khi build. chạy server : `npm start`.

# CODE Overview

## Css

Sử dụng preprocessor để viết sass dễ dàng hơn

```scss
$color-white: #fff;

.zg-ilist {
  padding: 60px 0;
  background-color: $color-white;
  margin-top: 20px;

  &--item {
    max-width: 20%;
    margin: 15px;
    overflow: hidden;

    img {
      width: 100%;
      height: auto;
      margin: auto;
      transition: all 0.4s ease 0s;
      transform: translate3D(0, 0, 0);

      &:hover {
        transform: scale(1.3)
      }
    }
  }
}
```

Sẽ được chuyển thành
```css
.zg-ilist {
  padding: 60px 0;
  background-color: #fff;
  margin-top: 20px;
}

.zg-ilist--item {
  max-width: 20%;
  margin: 15px;
  overflow: hidden;
}

.zg-ilist--item img {
  width: 100%;
  height: auto;
  margin: auto;
  transition: all 0.4s ease 0s;
  transform: translate3D(0, 0, 0);
}

.zg-ilist--item img:hover {
  transform: scale(1.3);
}
```

Sử dụng BEM kết hợp với SMACSS để đặt tên cho markup class