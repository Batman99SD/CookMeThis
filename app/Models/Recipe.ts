import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Recipe extends BaseModel {
  @column({ isPrimary: true })
  public id: number = 0 // Add an initializer to the 'id' property

  @column()
  public title: string = '' // Add an initializer to the 'title' property

  @column()
  public ingredients: string = '' // Add an initializer to the 'ingredients' property

  @column()
  public instructions: string = '' // Add an initializer to the 'instructions' property

  @column()
  public image_url: string = '' // Add an initializer to the 'image_url' property

  @column()
  public description: string = ''; // Add an initializer to the 'description' property

  @column()
  public popularity: number = 0; // Add an initializer to the 'popularity' property

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime = DateTime.now() // Add an initializer to the 'createdAt' property

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime = DateTime.now() // Add an initializer to the 'updatedAt' property
}
