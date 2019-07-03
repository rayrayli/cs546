//back end bookes js

const mongoCollections = require("../config/mongoCollections");
const bookes = mongoCollections.bookes;
const uuid = require("node-uuid");
const ObjectId = require('mongodb').ObjectId; 

const exportedMethods = {
    async addNewbook(name, version, category, price, description) {
        try {
            const bookCollection = await bookes();
            const newbook = {
                name: name,
                version: version,
                category: category,
                price: price,
                description: description
            };
            const newInsertInformation = await bookCollection.insertOne(newbook);
            return true;
        } catch (error) {
            throw `${error}`;
        }
    },

    async getbookByName(name) {
        try {
            const bookCollection = await bookes();
            const book = await bookCollection.findOne({ name : name });
            if (!book) {
                return undefined;
            }
            return book;
        } catch (error) {
            throw `${error}`;
        }
    },

     async getAllbookes() {
        try {
            const bookCollection = await bookes();
            const book = await bookCollection.find({}).toArray();
            return book;
        } catch (error) {
            throw `${error}`;
        }
     },
  
     async getbookById(id) {
         try {
            const bookCollection = await bookes();
            const _id = ObjectId(id);
            const book = await bookCollection.findOne({ _id : _id });
            if (!book) {
                return null;
            }
            return book;
         } catch (error) {
            throw `${error}`;
         }
     },

     async deletebookById(id) {
         try {
            const bookCollection = await bookes();
            const _id = ObjectId(id);
            await bookCollection.removeOne({ _id : _id});
            return true;
         } catch (error) {
            throw `${error}`;
         }
     },

     async updatebook(updatebook) {
         try {
            const bookCollection = await bookes();
            const _id = ObjectId(updatebook.id);
           
            const updatedbookData = {};
            updatedbookData.name = updatebook.name;
            updatedbookData.version = updatebook.version;
            updatedbookData.category = updatebook.category;
            updatedbookData.price = updatebook.price;
            updatedbookData.description = updatebook.description;

            const query = {
                _id: _id
            };
            const updateCommand = {
                $set: updatedbookData
            };

            const updateInfo = await bookCollection.update(query, updateCommand);
            if (updateInfo.modifiedCount === 0) {
                throw `Could not update book successfully`;
            }
            return true;
         } catch (error) {
            throw `${error}`;
         }
     }
}

module.exports = exportedMethods;