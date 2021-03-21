const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
const shortid = require('shortid');

// import { checkRegisterParam } from './auth';
const app = express();

app.use(cors());
app.use(bodyParser.json());

// db connect --------------------------------------------------------
// const MONGODB_URL = "mongodb+srv://lodny:lodny@cluster0.tyk7q.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const MONGODB_URL = 'mongodb://localhost/realworld';
mongoose.connect(
  MONGODB_URL,
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  },
  (err) => {
    if (err) {
      console.log(err);
    }
  }
);

// Users -----------------------------------------------------------
// -----------------------------------------------------------------
const Users = mongoose.model(
  'users',
  new mongoose.Schema({
    id: { type: String, default: shortid.generate },
    email: String,
    createdAt: String,
    updatedAt: String,
    username: String,
    password: String,
    bio: String,
    image: String,
    token: String
  })
);

app.get('/api/users', async (req, res) => {
  const users = await Users.find({});
  res.send(users);
});

// login
app.post('/api/users/login', async (req, res) => {
  const { email, password } = req.body.user;

  const errors = await checkLoginParam(Users, email, password);
  const errCount = errors['email or password'].length;
  if (errCount > 0) return res.status(422).send({ errors });

  const user = await Users.findOne({ email: email, password: password });
  console.log(user);
  return res.send({ user });
});

// register
app.post('/api/users', async (req, res) => {
  // console.log('add user : ', req.body.email, req.body.usernam, req.body.password);
  // console.log(req.body);

  const { username, email, password } = req.body.user;

  const errors = await checkRegisterParam(Users, username, email, password);
  const errCount = errors.username.length + errors.email.length + errors.password.length;
  if (errCount > 0) return res.status(422).send({ errors });

  let user = {
    // id: 151568,
    email: email,
    createdAt: new Date(),
    updatedAt: new Date(),
    username: username,
    password: password,
    bio: null,
    image: null,
    token:
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MTUxNTY4LCJ1c2VybmFtZSI6ImRyaW5ranVpY2U1IiwiZXhwIjoxNjIxNTE0MjQzfQ.ARav1u0LDSMgVk9LqB8oFtLDlNcRqF3mNRuI3Ub7EIk'
  };

  const newUser = await Users(user).save();
  console.log('newUser : ', newUser);
  return res.send({ user });
});

// function --------------------------------------------------------
// -----------------------------------------------------------------
async function checkLoginParam(Users, email, password) {
  console.log('checkLoginParam() : ', email, password);

  const errors = { 'email or password': [] };

  if (!email || !password) {
    errors['email or password'].push('is invalid');
  } else {
    const ret = await Users.findOne({ email: email, password: password });
    if (!ret) {
      errors['email or password'].push('is invalid');
    }
  }

  console.log(errors);
  return errors;
}

async function checkRegisterParam(Users, username, email, password) {
  console.log('checkRegisterParam() : ', username, email, password);

  const errors = { username: [], email: [], password: [] };

  if (!username) errors.username.push("can't be blank");
  if (username.length < 1) {
    errors.username.push('is too short (minimum is 1 character)');
  } else if (username.length > 20) {
    errors.username.push('is too long (maximum is 20 characters)');
  } else {
    const ret = await Users.findOne({ username: username });
    if (ret) {
      // exist username
      errors.username.push('has already been taken');
    }
  }

  if (!email) {
    errors.email.push("can't be blank");
  } else {
    const ret = await Users.findOne({ email: email });
    if (ret) {
      // exist username
      errors.email.push('has already been taken');
    }
  }

  if (!password) errors.password.push("can't be blank");

  console.log(errors);
  return errors;
}

// listen --------------------------------------------------------
// -----------------------------------------------------------------
const port = process.env.PORT || 5000;
app.listen(port, () => console.log('serve at http://localhost:5000'));
