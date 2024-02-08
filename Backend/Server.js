const express = require('express');
const chats = require("./data/data");
const dotenv = require('dotenv');
const app = express();
const cors = require('cors');
const connectDB = require('./config/db');
const UserRoutes = require('./models/UserModel');



dotenv.config();

connectDB();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('API is running...');
});

// Use the correct UserRoutes file, assuming it's in the ./routes directory
app.use('/api/users', require('./routes/UserRoutes'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}...`);
});
