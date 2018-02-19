import Dexie from 'dexie';

const db = new Dexie('converseer');

db.version(1).stores({
  posts: `id`,
  userVotes: `postId`
});

export default db;