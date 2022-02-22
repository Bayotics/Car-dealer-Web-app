
module.exports = function (io) {
  io.on('connection', function(socket) {
    console.log('connection has been established');

    socket.on('trade/subscribe', function(tradeId) {
      console.log('joining trade ', `trade-${tradeId}`);
      socket.join(`trade-${tradeId}`);
    })

    socket.on('trade/unsubscribe', function(tradeId) {
      console.log('leaving trade ', `trade-${tradeId}`);
      socket.leave(`trade-${tradeId}`);
    })

    socket.on('trade/postSaved', function(post) {
      console.log('emitting to trade', `trade-${post.trade}`)
      socket.to(`trade-${post.trade}`).emit('trade/postPublished', post)
    })
  })
}