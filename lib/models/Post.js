const pool = require('../utils/pool');

// add post class
module.exports = class Post {
  id;
  post;
  // add constructor
  constructor(row) {
    this.id = row.id;
    this.post = row.post;
  }
  // add insert
  static async insert({ post }) {
    const { rows } = await pool.query(
      'INSERT INTO posts (post) VALUES ($1) RETURNING *',
      [post]
    );
    return new Post(rows[0]);
  }
};
// add getAll
