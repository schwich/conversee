exports.up = (pgm) => {
  pgm.createTable('tags', {
    id: 'id',
    name: {
      type: 'varchar(12)',
      notNull: true,
      unique: true
    }
  })
};

exports.down = (pgm) => {
  pgm.dropTable('tags');
};
