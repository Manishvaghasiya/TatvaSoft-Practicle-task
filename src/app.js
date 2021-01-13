const express = require("express");
const cors = require('cors');
require('./db/mongoose');
const userRoutes = require('./routers/users');
const blogRoutes = require('./routers/blog');

const app = express();

app.use(cors());
app.use(express.json());
app.use(userRoutes);
app.use(blogRoutes);

module.exports = app;