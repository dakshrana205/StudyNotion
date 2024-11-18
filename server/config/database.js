const mongoose = require('mongoose');
require('dotenv').config();
const dbUrl = 'mongodb+srv://ranadaksh205:380CHmKNVdGRhPWz@cluster0.x0hg8nd.mongodb.net/StudyNotionDB';

exports.connectDB = () => {
    mongoose.connect(dbUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log('Database connected successfully');
    })
    .catch(error => {
        console.log('Error while connecting server with Database');
        console.error(error);
        process.exit(1);
    });
};

