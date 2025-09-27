const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./connectDB/connectMongo');

dotenv.config({ quiet: true });
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

// app.use('/user', require('./routes/userRoutes'));
app.use('/group', require('./routes/groupRoutes'));

app.use('/', (req,res) =>{
    res.send("app is working!!!");
})

const port = process.env.PORT||5000;

connectDB().then(() => {
  app.listen(port, ()=> {
    console.log(`server is running on port ${port}`);
  });
});