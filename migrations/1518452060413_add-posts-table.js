exports.up = (pgm) => {
  pgm.createTable('posts', {
    id: 'id', // shorthand for serial/PK
    title: {
      type: 'varchar(30)',
      notNull: true
    },
    link: 'varchar(30)', // shorthand
    content: 'string'
  })
};

exports.down = (pgm) => {
  pgm.dropTable('posts');
};
