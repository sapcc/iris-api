exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable("objects", {
    id: { type: "varchar(500)", notNull: true, unique: true },
    name: { type: "varchar(1000)"},
    object_type: { type: "varchar(500)", notNull: true },
    payload: { type: 'jsonb' }
  })

  pgm.createIndex("objects", "id")
  pgm.createIndex("objects", "object_type")

  // add more indices on payload for keys wich are used in where clausels
};

exports.down = (pgm) => {
  pgm.dropTable("objects", { ifExists: true })
};;
