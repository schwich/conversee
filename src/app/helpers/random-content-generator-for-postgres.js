// const db = require('../../server/db')
// import { randomTitle, randomDomain, randomNum, randomTextContent, getRandomInt } from './random-content';

// // get real users from DB
// // todo generate fake users (with auth)
// db.any(`SELECT id FROM USERS`)
//   .then(users => {
//     // console.log(users[getRandomInt(users.length)].id)
//     for (let i = 0; i < 1000; i++) {
//       if (i % 2 === 0) {
//         // if even, make a link post
//         db.none(`INSERT INTO posts (title, link, num_points, owner, type) VALUES ($1, $2, $3, $4, 'link')`, [
//           randomTitle(),
//           randomDomain(),
//           randomNum(),
//           users[getRandomInt(users.length)].id
//         ])
//           .catch(err => console.log(err))
//       }
//       else {
//         // otherwise, make a text post
//         db.none(`INSERT INTO posts (title, content, num_points, owner, type) VALUES ($1, $2, $3, $4, 'text')`, [
//           randomTitle(),
//           randomTextContent(),
//           randomNum(),
//           users[getRandomInt(users.length)].id
//         ])
//           .catch(err => console.log(err))
//       }
//     }
//   })
//   .catch(err => console.log(err));
