const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');

dotenv.config();
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));

// app.use('/user', require('./routes/userRoutes'));
// app.use('/group', require('./routes/groupRoutes'));

app.use('/', (req,res) =>{
    res.send("app is working!!!");
})

const port = process.env.PORT||5000;

app.listen(port, ()=> {
    console.log(`server is running on port ${port}`);
})