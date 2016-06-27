var
  mongoose = require('mongoose'),
  bcrypt = require('bcrypt-nodejs'),
  Schema = mongoose.Schema,
  userSchema = new Schema({
    local: {
      name: String,
      zipcode: Number,
      email: String,
      password: String
    }
  })

// the function run when the user is created.
// 8 is the number of times the data is encrypted.
// The more times you encrypt, the more server space you take.
userSchema.methods.generateHash = function(password){
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8))
}

//function used when the user is signing in
userSchema.methods.validPassword = function(password){
  return bcrypt.compareSync(password, this.local.password)
}

var User = mongoose.model('User', userSchema)

module.exports = User
