exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable('clients', {
    id: 'id',
    api_key: { type: 'varchar(60)', unique: true, default: pgm.func('md5(random()::text || clock_timestamp()::text)::uuid')},
    secret: { type: 'varchar(60)', default: pgm.func('md5(random()::text)') },
    permissions: { type: 'text[]' }
  })

  pgm.createIndex('clients', 'api_key')

};

exports.down = (pgm) => {
  pgm.dropTable('clients', { ifExists: true })
};
