const Price = require('../models/prices');

exports.getPrices = function(req, res) {
  Price.find({})
        .exec((errors, prices) => {

    if (errors) {
      return res.status(422).send({errors});
    }

    return res.json(prices);
  });
}
