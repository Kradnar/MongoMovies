class Film {
  constructor(title, actor = "Not specified") {
    this.title = title;
    this.actor = actor;
  }
  async add(collection) {
    await collection.insertOne(this);
    //need to save 'this' into database
  }
}

module.exports = Film;