exports.up = (pgm) => {
  pgm.createTable('users', {
    id: 'id',
    username: {
      type: 'varchar(15)',
      notNull: true,
      unique: true
    },
    password_hash: {
      type: 'char(60)',
      notNull: true
    },
    created: {
      type: 'timestamp',
      default: 'now()'
    }
  })
};

exports.down = (pgm) => {
  pgm.dropTable('users');
};
