const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./connectDB/connectMongo');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');
const userRoutes = require('./routes/userRoutes');

dotenv.config({ quiet: true });
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use('/api/users', userRoutes); 
app.use('/api/groups', require('./routes/groupRoutes'));

app.use('/', (req,res) =>{
    res.send("app is working!!!");
})

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT||5000;

connectDB().then(() => {
  app.listen(port, ()=> {
    console.log(`Server is running on port ${port} in ${process.env.NODE_ENV} mode`);
  });
}).catch((err) => {
    console.log("Failed to start server due to DB connection error:", err.message);
});