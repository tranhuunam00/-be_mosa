const mongoose = require('mongoose');
async function connect() {
  try {
    mongoose.connect(
      process.env.DB_URL ||
        'mongodb+srv://nam18020938:tS6B1fs2tVuGsKtD@cluster0.tdb8j.mongodb.net/khoa_luan?retryWrites=true&w=majority',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // useFindAndModify: false,
        // useCreateIndex: true,
      }
    );
    console.log('connect mongo db done!');
  } catch (e) {
    console.log(e.message);
  }
}
module.exports = {
  connect,
};
