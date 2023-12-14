const HttpError = require('../models/http-error');
const Specialty = require('../models/specialty');

const getSpecialties = async (req, res, next) => {
    let specialties;
    try {
        specialties = await Specialty.find({});
    } catch (err) {
      const error = new HttpError(
        'Fetching users failed, please try again later.',
        500
      );
      return next(error);
    }
    res.json({ specialties: specialties.map(specialty => specialty.toObject({ getters: true })) });
};

exports.getSpecialties = getSpecialties;