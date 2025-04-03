require('dotenv').config({ path: `.env.${process.env.NODE_ENV || 'development'}` });

const config = {
    env: process.env.NODE_ENV || 'development',
    db: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        port: process.env.DB_PORT || 3306,
    },
};

module.exports = config;


// Cách sử dụng
// Cách 1: Dùng trực tiếp
// NODE_ENV=development node server.js
// Cách 2: Dùng npm script
// package.json
// {
//   "scripts": {
//     "start": "NODE_ENV=production node server.js",
//     "dev": "NODE_ENV=development node server.js",
//     "pm2:start": "pm2 start server.js --name my-app --env production",
//     "pm2:dev": "pm2 start server.js --name my-app --env development"
//   }
// }
// npm run start
// npm run dev
// npm run pm2:start
// npm run pm2:dev

