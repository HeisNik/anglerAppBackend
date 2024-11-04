const mongoose = require('mongoose')

const storySchema = new mongoose.Schema({
  author: String,
  story: String,
  likes: Number,
  comments: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

storySchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Story = mongoose.model('Story', storySchema)

module.exports = Story