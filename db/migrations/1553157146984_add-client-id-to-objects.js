exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.addColumns('objects', {
    client_id: { type: 'serial', notNull: true} 
  })

  pgm.addIndex('objects', 'client_id')
};

exports.down = (pgm) => {
  pgm.dropColumns('objects', 'client_id')
  pgm.dropIndex('objects','client_id')
};
