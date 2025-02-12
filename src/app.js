require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const { NODE_ENV } = require('./config');

const app = express();

const morganOption = NODE_ENV === 'production' ? 'tiny' : 'common';

app.use(morgan(morganOption));
app.use(helmet());

// cors enabling
app.options(cors());
app.use(cors());

// import routers
const authRouter = require('./auth/auth-router');
const usersRouter = require('./users/users-router');
const vacancyRouter = require('./vacancies/vacancies-router');
const projectsRouter = require('./projects/projects-router');
const requestsRouter = require('./requests/requests-router');
const chatsRouter = require('./chats/chats-router');
const postsRouter = require('./posts/posts-router');
const notificationsRouter = require('./notifications/notifications-router');
const wsAuthRouter = require('./wsauth/ws-auth-router');

// set up routes
const routes = [
  { url: '/api/auth', router: authRouter },
  { url: '/api/users', router: usersRouter },
  { url: '/api/projects', router: projectsRouter },
  { url: '/api/requests', router: requestsRouter },
  { url: '/api/vacancies', router: vacancyRouter },
  { url: '/api/chats', router: chatsRouter },
  { url: '/api/posts', router: postsRouter },
  { url: '/api/notifications', router: notificationsRouter },
  { url: '/api/ws/auth', router: wsAuthRouter }
];

// add routes to app
routes.forEach(({ url, router }) => {
  app.use(url, router);
});

// base route for happiness
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

// anything else
app.route('*', (req, res) => {
  res.status(404);
});

app.use(function errorHandler(error, req, res) {
  let response;
  if (NODE_ENV === 'production') {
    response = { error: 'server error' };
  } else {
    // eslint-disable-next-line no-console
    console.error(error);
    response = { error };
  }

  res.status(500).json(response);
});

module.exports = app;
