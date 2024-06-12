import { BaseSchema } from '@adonisjs/lucid/schema'

export default class Recipes extends BaseSchema {
  protected tableName = 'recipes'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('title').notNullable()
      table.text('ingredients').notNullable()
      table.text('instructions').notNullable()
      table.string('image_url').notNullable()
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}