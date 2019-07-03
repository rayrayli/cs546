const mongoCollections = require("../config/mongoCollections");
const book_lists = mongoCollections.book_menu;
//const uuid = require("node-uuid");

const exportedMethods = {
  async getAllbookes() {
    const bookCollection = await book_lists();
    return await bookCollection.find({}).toArray();
  }  /*remember to add ,*/


};

module.exports = exportedMethods;
