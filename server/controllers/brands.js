const Brand = require('../models/brands');

exports.getBrands = function(req, res) {
  Brand.find({})
        .exec((errors, brands) => {

    if (errors) {
      return res.status(422).send({errors});
    }

    return res.json(brands);
  });
}
