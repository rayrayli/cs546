const bookData = require("./book_lists");
const userPData = require("./user_profile");

//model.js - register not in 
//index.js - register not in
module.exports = {
  users: require("./users"),
  bookes: require("./bookes"),
  orders: require("./orders"),
  
  book_lists: bookData,
  user_profile: userPData
};
