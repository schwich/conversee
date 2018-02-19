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
      default: pgm.func('CURRENT_TIMESTAMP')
    }
  })
};

exports.down = (pgm) => {
  pgm.dropTable('users');
};
