const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const jobRouter = require("./routes/job");
const bookmarkRouter = require("./routes/bookmark");

dotenv.config();

mongoose.connect(process.env.MONGO_URL).then(() => console.log('db connected')).catch((err) => console.log(err));

app.use(express.json());
app.use('/api/', authRouter);
app.use('/api/users', userRouter);
app.use('/api/jobs', jobRouter);
app.use('/api/bookmarks', bookmarkRouter);

// app.get('/', (req, res) => res.send('Hello Keygen!'))
app.listen(process.env.PORT || 5001, () => console.log(`Example app listening on port ${process.env.PORT}!`))
app.listen(process.env.PORT_SECURE || 5002, () => console.log(`Example app listening on port ${process.env.PORT_SECURE}!`))