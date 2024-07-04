const db = require("../models");
const User = db.user;
const Role = db.role;

exports.allAccess = async (req, res) => {
  try {
    const data = []
    const user = await User.findAll();
    for (let i = 0; i < user.length; i++) {
      data.push({
        id: user[i].id,
        username: user[i].username,
        email: user[i].email,
        roles: []
      })
      const roles = await user[i].getRoles();
      for (let j = 0; j < roles.length; j++) {
        // console.log(roles[j])
        data[i].roles.push("ROLE_" + roles[j].name.toUpperCase());
      }


    }
    return res.status(200).send({
      data: data
    });

  }
  catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};
