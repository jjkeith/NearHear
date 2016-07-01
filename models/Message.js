var
  mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  messageSchema = new Schema ({
    body: String,
    timestamp: Date
  })

messageSchema.pre('save', function(next){
  this.timestamp = new Date()
  next()
})

var Message = mongoose.model('Message', messageSchema)
module.exports = Message
