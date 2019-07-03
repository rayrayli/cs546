const dbConnection = require("./mongoConnection");

/* This will allow you to have one reference to each collection per app */
/* Feel free to copy and paste this this */
const getCollectionFn = collection => {
  let _col = undefined;

  return async () => {
    if (!_col) {
      const db = await dbConnection();
      _col = await db.collection(collection);
    }

    return _col;
  };
};

/* Now, you can list your collections here: */
module.exports = {
  book_menu: getCollectionFn("book_Menu"),
  user_profile: getCollectionFn("users"),
  order_list: getCollectionFn("order_list"),
  
  //back end
  users: getCollectionFn("users"),
  sessionId: getCollectionFn("sessionId"),
  bookes: getCollectionFn("book_Menu"),
  orders: getCollectionFn("orders")
};
