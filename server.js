const database = require('./data/connection');
const { initialPrompt } = require('./utils/prompts')

database.connect(err => {
  if (err) throw err;
  initialPrompt()
  console.log('Database connected.');
});
