const mongoose = require('mongoose');

const mongoDBUrl = process.env.MONGODB_URL;
mongoose.connect(mongoDBUrl , {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.catch(err => {
    console.log(err);
});