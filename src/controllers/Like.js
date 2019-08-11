const Developer = require('../model/Developer');

module.exports = {
  async store (request, response) {
    const { developerId } = request.params;
    const { user } = request.headers;

    const loggedDeveloper = await Developer.findById(user);
    const targetDeveloper = await Developer.findById(developerId);

    if (!targetDeveloper) {
      return response.status(400).json({ error: 'Developer not exists' });
    }

    if (targetDeveloper.likes.includes(loggedDeveloper._id)) {
      console.log('DEU MATCH!');
    }

    loggedDeveloper.likes.push(targetDeveloper._id);

    await loggedDeveloper.save();
    console.log(`${loggedDeveloper.name} liked ${targetDeveloper.name}`)
    return response.json(loggedDeveloper);
  }
}