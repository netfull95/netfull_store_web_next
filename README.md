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
- Nodejs & npm - Install first: https://nodejs.vn/. Check version node: `node -v`, npm: `npm -v`
- Node-sass: Install: `npm install -g node-sass`

### Run production mode in local (window environment):
- In root directory, run: `npm install`
- Build project: `npm run build`. Result:

```
$ next build
> Using external babel configuration
> Location: "/Users/username/Documents/project/zeiget-next/.babelrc"
> Using "webpack" config function defined in next.config.js.
Done in 19.98s.
```

- Build css: `npm run build-scss`. Result:

```
$ node-sass static/sass/global.scss static/dist/global.css
Rendering Complete, saving .css file...
Wrote CSS to /Users/username/Documents/project/zeiget-next/static/dist/global.css
Done in 0.84s.
```

- Start: `npm run start-window`. Result:

```
$ npm run build-scss && NODE_ENV=production node server.js

> zeiget@1.0.0 build-scss /Users/username/Documents/project/zeiget-next/
> node-sass static/sass/global.scss static/dist/global.css

Rendering Complete, saving .css file...
Wrote CSS to /Users/username/Documents/project/zeiget-next/static/dist/global.css
|> !!!Server is running on http://localhost:8090
```
Now you can visit address: http://localhost:8090.

Note: If you are in linux/unix environment. You might change script command in `package.json` to make commands run in order stead of parallel. (Change `&` to `&&` and use command `npm run start` to start server)

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
