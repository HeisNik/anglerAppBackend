const storiesRouter = require('express').Router()
const Story = require('../models/story')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const userExtractor = require('../utils/middleware').userExtractor

storiesRouter.get('/', userExtractor, (request, response) => {
  Story.find({}).then(stories => {
    response.json(stories)
  })
})

storiesRouter.post('/', userExtractor, async (request, response) => {
    const body = request.body

    const user = request.user
    console.log('user', user)
  
    const story = new Story({
      author: body.author,
      story: body.story,
      likes: body.likes,
      comments: body.comments,
      user: user._id
    })
  
    const savedStory = await story.save()
    user.stories = user.stories.concat(savedStory.id)
    await user.save()
  
    response.json(savedStory)
  })

module.exports = storiesRouter
