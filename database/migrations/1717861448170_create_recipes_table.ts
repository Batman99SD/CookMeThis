import { BaseSchema } from '@adonisjs/lucid/schema'

export default class Recipes extends BaseSchema {
  protected tableName = 'recipes'

  public async up () {
    // Create the 'recipes' table
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id') // Auto-incrementing ID column
      table.string('title').notNullable() // Title column, not nullable
      table.text('ingredients').notNullable() // Ingredients column, not nullable
      table.text('instructions').notNullable() // Instructions column, not nullable
      table.string('image_url').notNullable() // Image URL column, not nullable
      table.timestamps(true) // Timestamps for created_at and updated_at columns
    })
  }

  public async down () {
    // Drop the 'recipes' table
    this.schema.dropTable(this.tableName)
  }
}