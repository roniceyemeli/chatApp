const express = require("express");
const app = express();
const connectDB = require('./config/connectDB');
const cors = require('cors');
const morgan = require("morgan");
const helmet = require("helmet");


app.use(express.json());
app.use(cors())
app.use(helmet());
app.use(morgan('common'));
connectDB();


//routes
app.use('/api/user', require('./routes/userRouter'));
app.use('/api/conv', require('./routes/conversationRouter'));
app.use('/api/mess', require('./routes/messageRouter'));


const PORT = process.env.PORT || 6000;
app.listen(PORT, err =>{
    err ? console.error(err) : console.log("api is running on port %s", PORT)
})