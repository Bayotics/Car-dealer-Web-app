const Trade = require('../models/trades');
const User = require('../models/users');

exports.getSecret = function (req, res) {
  return res.json({secret: 'I am secret Message'})
}

exports.getTrades = function(req, res) {
  const {category, price, brand, location} = req.query;

  const findQuery = location ? Trade.find({ processedLocation: { $regex: '.*' + location + '.*' } })
                             : Trade.find({})
  findQuery
        .populate('category')
        .populate('brand')
        .populate('price')
        .populate('joinedPeople')
        .limit(10)
        .sort({'createdAt': -1})
        .exec((errors, trades) => {
    if (errors) {
      return res.status(422).send({errors});
    }

    // WARNING: requires improvement, can decrease performance
    if (category) {
      trades = trades.filter(trade => {
        return trade.category.name === category
      })
    }
    if (brand){
      trades = trades.filter(trade => {
        return trade.brand.name === brand
      })
    }
    if (price){
      trades = trades.filter(trade =>{
        return trade.price.name === price
      })
    }

    return res.json(trades);
  });
}


exports.getTradeById = function(req, res) {
  const {id} = req.params;

  Trade.findById(id)
        .populate('tradeCreator', 'name id avatar')
        .populate('category')
        .populate('brand')
        .populate('price')
        .populate({path: 'joinedPeople',
           options: {limit: 5, sort: {username: -1}}})
        .exec((errors, trade) => {
    if (errors) {
      return res.status(422).send({errors});
    }

    return res.json(trade);
  });
}

exports.createTrade = function(req, res) {
  const tradeData = req.body;
  const user = req.user;

  const trade = new Trade(tradeData);
  trade.user = user;
  trade.status = 'active';

  trade.save((errors, createdTrade) => {
    if (errors) {
      return res.status(422).send({errors});
    }

    return res.json(createdTrade)
  })
}

exports.joinTrade = function (req, res) {
  const user = req.user;
  const {id} = req.params;

  Trade.findById(id, (errors, trade) => {
    if (errors) {
      return res.status(422).send({errors})
    }

    trade.joinedPeople.push(user);
    trade.joinedPeopleCount++;

    return Promise.all(
      [trade.save(),
      User.updateOne({ _id: user.id }, { $push: { joinedTrades: trade }})])
      .then(result => res.json({id}))
      .catch(errors => res.status(422).send({errors}))
  })
}

exports.leaveTrade = function (req, res) {
  const user = req.user;
  const {id} = req.params;

  Promise.all(
    [Trade.updateOne({ _id: id }, { $pull: { joinedPeople: user.id }, $inc: {joinedPeopleCount: -1}}),
     User.updateOne({ _id: user.id }, { $pull: { joinedTrades: id }})])
    .then(result => res.json({id}))
    .catch(errors => res.status(422).send({errors}))
}

exports.updateTrade = function (req, res) {
  const tradeData = req.body
  const {id} = req.params
  const user = req.user;
  tradeData.updatedAt = new Date()

  if (user.id === tradeData.tradeCreator._id) {
    Trade.findByIdAndUpdate(id, { $set: tradeData}, { new: true })
          .populate('tradeCreator', 'name id avatar')
          .populate('category')
          .populate('brand')
          .populate('price')
          .exec((errors, updatedTrade) => {

      if (errors) {
        return res.status(422).send({errors})
      }

      return res.json(updatedTrade)
    })
  } else {
    return res.status(401).send({errors: {message: 'Not Authorized!'}})
  }
}










