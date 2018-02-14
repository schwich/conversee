exports.up = (pgm) => {
  pgm.addColumns('posts', {
    owner: {
      type: 'int',
      notNull: true,
      references: 'users'
    }
  })
};

exports.down = (pgm) => {
  pgm.dropColumn('posts', ['owner'])
};
