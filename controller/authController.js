const User = require("./../model/users");
const jwt = require("jsonwebtoken");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.signup = async (req, res, next) => {
  try {
    const newUser = await User.create(req.body);

    const token = signToken(newUser._id);

    res.status(201).json({
      status: "success",
      data: {
        user: newUser,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      console.log("Please provide email and password");
      return;
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await user.correctPassword(password, user.password))) {
      console.log("Incorrect email or password");
      return;
    }
    const token = signToken(user.__id);
    res.status(201).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

// function login(email, password, callback) {
//   const bcrypt = require("bcrypt");
//   const MongoClient = require("mongodb@3.1.4").MongoClient;
//   const client = new MongoClient(
//     "mongodb+srv://priyaraj:ananya17@cluster0.egr8p.mongodb.net/test?retryWrites=true&w=majority"
//   );

//   client.connect(function (err) {
//     if (err) return callback(err);

//     const db = client.db("db-name");
//     const users = db.collection("users");

//     users.findOne({ email: email }, function (err, user) {
//       if (err || !user) {
//         client.close();
//         return callback(err || new WrongUsernameOrPasswordError(email));
//       }

//       bcrypt.compare(password, user.password, function (err, isValid) {
//         client.close();

//         if (err || !isValid)
//           return callback(err || new WrongUsernameOrPasswordError(email));

//         return callback(null, {
//           user_id: user._id.toString(),
//           nickname: user.nickname,
//           email: user.email,
//         });
//       });
//     });
//   });
// }
