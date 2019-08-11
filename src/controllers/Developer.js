const axios = require('axios');
const Developer = require('../model/Developer')

module.exports = {
  async index (request, response) {
    const { user } = request.headers;

    const loggedDeveloper = await Developer.findById(user);

    const developers = await Developer.find({
      $and: [
        { _id: { $ne: user } },
        { _id: { $nin: loggedDeveloper.likes } },
        { _id: { $nin: loggedDeveloper.dislikes } },
      ]
    })

    return response.send(developers);
  },
  async store(request, response) {
    const { username } = request.body;

    const userExists = await Developer.findOne({ user: username });

    if (userExists) {
      return response.json(userExists);
    }

    const githubResponse = await axios.get(`https://api.github.com/users/${username}`);

    const { name, bio, avatar_url: avatar } = githubResponse.data;

    const developer = await Developer.create({
      name,
      user: username,
      bio,
      avatar
    });

    return response.json(developer);
  }
}