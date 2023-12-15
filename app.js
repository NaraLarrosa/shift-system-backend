const express = require('express');
require('./db/mongoose');
const bodyParser = require('body-parser');
// const userRoutes = require('./routes/user-routes');
const doctorRoutes = require('./routes/doctor-routes');
const specialtyRoutes = require('./routes/specialty-routes');
const shiftRoutes = require('./routes/shift-routes');
const HttpError = require('./models/http-error');

const port = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.json());

// app.use(cors({ origin: true }));

// app.use('/api/user', userRoutes);
app.use('/api/doctor', doctorRoutes);
app.use('/api/specialty', specialtyRoutes);
app.use('/api/shift', shiftRoutes);

app.use((req, res, next) => {
  const error = new HttpError('Could not find the given path.', 404);
  throw error;
});

// const mongoose = require('mongoose');

// mongoose.connect(
//   `mongodb+srv://nara:hola1234@cluster0.xkfnw3f.mongodb.net/shift-system?retryWrites=true&w=majority`
// )
// .then(() => {
//   app.listen(5000);
// })
// .catch(err => {
//   console.log(err);
// });

app.listen(port, () => {
  console.log('Server is up on port ' + port);
});