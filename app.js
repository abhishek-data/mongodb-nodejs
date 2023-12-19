const path = require('path');

const express = require('express');
const dotenv = require('dotenv')
dotenv.config()
const bodyParser = require('body-parser');
const mongoose = require('mongoose')

const errorController = require('./controllers/error');

const User = require('./models/user')

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById('6581a5ac89b5cbc749856172')
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

const PORT = process.env.PORT || 3000

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    User.findOne()
      .then(user => {
        if (!user) {
          const user = new User({ name: "Abhishek Kumar", email: "iabheeee@gmail.com", cart: { items: [] } })
          user.save()
        }
      })
    app.listen(PORT)
  })
  .catch(err => console.log(err))



