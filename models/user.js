const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  email:  {
    type: String,
    minlength: 5,
    required: true,
    unique: true
  },
  username: {
    type: String,
    minlength: 3,
    required: true,
    unique: true
  },
  passwordHash: String,
  stories: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Story'
    }
  ],
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    // the passwordHash should not be revealed
    delete returnedObject.passwordHash
  }
})

const User = mongoose.model('User', userSchema)

module.exports = User