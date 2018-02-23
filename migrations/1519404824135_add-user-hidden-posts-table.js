exports.up = (pgm) => {
  pgm.createTable('user-hidden-posts', {
    id: 'id',
    user_id: {
      type: 'int',
      notNull: true,
      references: 'users(id)'
    },
    post_id: {
      type: 'int',
      notNull: true,
      references: 'posts(id)'
    },
    created: {
      type: 'timestamptz',
      default: pgm.func('CURRENT_TIMESTAMP'),
      notNull: true
    }
  })
};

exports.down = (pgm) => {
  pgm.dropTable('user-hidden-posts');
};
