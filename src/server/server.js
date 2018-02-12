const express = require('express');
const config = require('../../config/config');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const ExtractJwt = require('passport-jwt').ExtractJwt;
const JwtStrategy = require('passport-jwt').Strategy;

// database tools
const db = require('./db');

// for webpack-dev-middleware
// const webpackConfig = require('../../webpack.config');
// const compiler = webpack(webpackConfig);

// routes
const index = require('./routes/index');
const posts = require('./routes/posts');
const users = require('./routes/users');
const auth = require('./routes/auth');

// init express
const app = express();

// middleware
app.use(logger('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../../dist/app')));

// add cors middlware
// add csurf (XSRF protection) middleware

// for CORS
// todo I think this is a middleware package
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
// app.use(webpackDevMiddleware(compiler, {
//   publicPath: config.output.publicPath
// }));

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.JSON_WEB_TOKEN_SECRET
}

const strategy = new JwtStrategy(jwtOptions, function (jwt_payload, next) {
  console.log('payload received ', jwt_payload);
  // get user from DB
  db.one('SELECT id FROM users WHERE id = $1', [jwt_payload.id])
    .then(function (user) {
      if (user) {
        next(null, user);
      }
      else {
        next(null, false);
      }
    })
})

passport.use(strategy);
app.use(passport.initialize());

// register routes files
app.use('/', index);
app.use('/api/posts/', posts);
app.use('/api/users', users);
app.use('/api/auth/', auth);

// middleware for errors
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;