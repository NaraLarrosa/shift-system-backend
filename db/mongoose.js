const mongoose = require('mongoose');
const dotenv = require("dotenv");

dotenv.config();

const mongoDBUrl = process.env.MONGODB_URL;
mongoose.connect(mongoDBUrl , {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.catch(err => {
    console.log(err);
});