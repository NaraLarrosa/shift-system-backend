const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://nara:hola1234@cluster0.xkfnw3f.mongodb.net/shift-system?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    //useCreateIndex: true,
    //useFindAndModify: false,
    useUnifiedTopology: true
})
.catch(err => {
    console.log(err);
});