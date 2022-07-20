const yargs = require("yargs");
const { client, connection } = require("./db/connection");
const Film = require("./utils");

const app = async (yargsObj) => {
  const collection = await connection();
  if (yargsObj.create) {
    console.log("(C)reated Entry");
    const newFilm = new Film(yargsObj.title, yargsObj.actor);
    await newFilm.add(collection);
    //add a film from the terminal into an object and save in database
  } 
  else if (yargsObj.read) {
    console.log("(R)ead the Database");
    const results = await collection.find().toArray();
    console.log(results);
    //list items from database
  } 
  else if (yargsObj.update) {
    console.log("(U)pdated Database");
    if (yargsObj.title) {
      const results = await collection.findOne({title: yargsObj.title});
      console.log(results);
      console.log("Has been updated to...")
      const updates = await collection.updateOne({title: yargsObj.title}, {$set: {title: yargsObj.newTitle}});
      const results2 = await collection.findOne({title: yargsObj.newTitle});
      console.log(results2);
    }
    else if (yargsObj.actor) {
      const results = await collection.findOne({actor: yargsObj.actor});
      console.log(results);
      console.log("Has been updated to...")
      const updates = await collection.updateOne({title: yargsObj.actor}, {$set: {title: yargsObj.newActor}});
      const results2 = await collection.findOne({title: yargsObj.newActor});
      console.log(results2);
    } 
    else {
      console.log("Please Specify (--title or --actor) and (--newTitle or --newActor) respectively")
    }
    //update one database entry
  } 
  else if (yargsObj.delete) {
    console.log("(D)elete");
    if (yargsObj.title) {
      const results = await collection.findOne({title: yargsObj.title});
      console.log(results);
      const delItem = await collection.deleteOne({title: yargsObj.title});
      console.log("Has been deleted")
      if (delItem.deletedCount === 1) {
        console.log("Successfully deleted one item");
      } else {
        console.log("No documents to delete")
      }
    } 
    else if (yargsObj.actor) {
      const results = await collection.findOne({actor: yargsObj.actor});
      console.log(results);
      const delItem = await collection.deleteOne({actor: yargsObj.actor});
      console.log("Has been deleted")
      if (delItem.deletedCount === 1) {
        console.log("Successfully deleted one item");
      } else {
        console.log("No documents to delete")
      }
    } 
    else {
      console.log("Please Specify --title or --actor")
    }
    //delete one database entry
  } else {
    console.log("Incorrect command");
  }
  await client.close();
};

app(yargs.argv);