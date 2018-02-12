exports.up = (pgm) => {
  pgm.createTable('post-tags', {
    id: 'id',
    post_id: {
      type: 'int',
      notNull: true,
      references: 'posts(id)'
    },
    tag_id: {
      type: 'int',
      notNull: true,
      references: 'tags(id)'
    }
  })
};

exports.down = (pgm) => {
  pgm.dropTable('post-tags');
};
