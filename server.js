const database = require('./data/connection');
const { initialPrompt } = require('./utils/prompts')
//populates data from .sql files and starts the prompt
database.connect(err => {
  if (err) throw err;
  initialPrompt()
  console.log('Database connected.');
});
