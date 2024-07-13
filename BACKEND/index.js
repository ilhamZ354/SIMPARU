require ('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser')
const routes = require('./config/routes');
const path = require('path')
// import UserRoute from "./routes/UserRoute.js";

const PORT = process.env.APP_PORT || 8080
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.use(express.json());
// app.use(UserRoute);

app.use(bodyParser.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static("uploads"))
routes(app);

mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', (error) => console.log(error));
db.once('open', () => console.log('Database Connected...'));

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
});

app.listen(PORT, function (err) {
    if (err) console.log(err);
    console.log('Server listening on PORT', PORT);
});