exports.up = (pgm) => {
  pgm.alterColumn('posts', 'title', {
    type: 'varchar(50)',
    notNull: true
  })
};

exports.down = (pgm) => {
  pgm.alterColumn('posts', 'title', {
    type: 'varchar(30)',
    notNull: true
  })
};
