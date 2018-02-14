exports.up = (pgm) => {
  pgm.addColumns('posts', {
    num_points: 'int'
  })
};

exports.down = (pgm) => {
  pgm.dropColumns('posts', ['num_points'])
};
