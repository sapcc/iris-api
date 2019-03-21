exports.shorthands = undefined;
 
exports.up = (pgm) => {
  pgm.addColumns('objects', {
    created_at: { type: 'timestamp', default: pgm.func('NOW()') },  
    updated_at: { type: 'timestamp', default: pgm.func('NOW()') }  
  })
  pgm.addColumns('clients', {
    created_at: { type: 'timestamp', default: pgm.func('NOW()') },  
    updated_at: { type: 'timestamp', default: pgm.func('NOW()') }  
  })
};

exports.down = (pgm) => {
  pgm.dropColumns('objects', ['created_at','updated_at'])
  pgm.dropColumns('clients', ['created_at','updated_at'])
};
