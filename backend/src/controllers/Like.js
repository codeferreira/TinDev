const Developer = require('../model/Developer');

module.exports = {
  async store (request, response) {
    const { user } = request.headers;
    const { developerId } = request.params;

    const loggedDeveloper = await Developer.findById(user);
    const targetDeveloper = await Developer.findById(developerId);

    if (!targetDeveloper) {
      return response.status(400).json({ error: 'Developer not exists' });
    }

    if (targetDeveloper.likes.includes(loggedDeveloper._id)) {
      console.log('MATCH')
      const loggedSocket = request.connectedUsers[user];
      const targetSocket = request.connectedUsers[developerId];

      if(loggedSocket) {
        request.io.to(loggedSocket).emit('match', targetDeveloper)
      }

      if(targetSocket) {
        request.io.to(targetSocket).emit('match', loggedDeveloper)
      }
    }

    loggedDeveloper.likes.push(targetDeveloper._id);

    await loggedDeveloper.save();
    console.log(`${loggedDeveloper.name} liked ${targetDeveloper.name}`)
    return response.json(loggedDeveloper);
  }
}