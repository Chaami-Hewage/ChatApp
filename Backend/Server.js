const express = require('express');
const dotenv = require('dotenv');
const app = express();
const cors = require('cors');
const connectDB = require('./config/db');
const UserRoutes = require('./routes/UserRoutes');
const { notfound, errorHandler } = require('./middleware/errorMiddleware');
const ChatRoutes = require('./routes/chatRoutes');

dotenv.config();

connectDB();

app.use(cors());
app.use(express.json());
app.use(errorHandler);

app.get('/', (req, res) => {
    res.send('API is running...');
});

// Correctly use '/api/users' and '/api/chats' for routes
app.use('/api/users', UserRoutes);
app.use('/api/chats', ChatRoutes);

// Use notfound and errorHandler after the route handling
app.use(notfound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}...`);
});
