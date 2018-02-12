exports.up = (pgm) => {
  pgm.addColumns('users', {
    email: {
      type: 'varchar(30)',
      unique: true
    }
  })
};

exports.down = (pgm) => {
  pgm.dropColumns('users', ['email'])
};
