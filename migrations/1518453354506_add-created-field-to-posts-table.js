exports.up = (pgm) => {
  pgm.addColumns('posts', {
    created: {
      type: 'timestamptz',
      default: pgm.func('CURRENT_TIMESTAMP'),
      notNull: true
    }
  })
};

exports.down = (pgm) => {
  pgm.dropColumns('posts', ['created'])
};
