exports.up = (pgm) => {
  pgm.addColumns('posts', {
    type: {
      type: 'varchar(10)',
      notNull: true,
      default: 'text'
    }
  });
};

exports.down = (pgm) => {
  pgm.dropColumns('posts', ['type']);
};
