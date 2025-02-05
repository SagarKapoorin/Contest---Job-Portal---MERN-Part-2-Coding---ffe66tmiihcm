const app = require('./app');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
// console.log(process.env.DATABASE_URL);
mongoose.connect(
  process.env.DATABASE_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  async () => {
    console.log('connected to DB');
  }
);

app.listen(3000, () => console.log('Server running......'));
