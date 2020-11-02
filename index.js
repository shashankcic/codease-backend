const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const db = require('./db');

const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

db.on('error', console.error.bind(console, 'MongoDB connection error: '));

const imagesRouter = require('./routes/images');
const authorsRouter = require('./routes/authors');
const learningPathsRouter = require('./routes/learningPaths');
const categoriesRouter = require('./routes/categories');
const blogsRouter = require('./routes/blogs');
const modulesRouter = require('./routes/modules');

app.use('/images', imagesRouter);
app.use('/authors', authorsRouter);
app.use('/learningPaths', learningPathsRouter);
app.use('/categories', categoriesRouter);
app.use('/blogs', blogsRouter);
app.use('/modules', modulesRouter);

app.listen(port, function() {
    console.log("Server is running on Port: " + port);
});