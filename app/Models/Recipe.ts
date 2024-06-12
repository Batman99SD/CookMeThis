import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Recipe extends BaseModel {
  @column({ isPrimary: true })
  public id: number = 0 // Add an initializer to the 'id' property

  @column()
  public title: string = ''

  @column()
  public ingredients: string = ''

  @column()
  public instructions: string = ''

  @column()
  public image_url: string = ''

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime = DateTime.now() // Add an initializer to the 'createdAt' property

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime = DateTime.now()
}