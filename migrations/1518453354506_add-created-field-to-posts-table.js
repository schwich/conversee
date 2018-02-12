exports.up = (pgm) => {
  pgm.addColumns('posts', {
    created: {
      type: 'timestamp',
      default: 'now()'
    }
  })
};

exports.down = (pgm) => {
  pgm.dropColumns('posts', ['created'])
};
