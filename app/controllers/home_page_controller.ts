import type { HttpContext } from '@adonisjs/core/http'

export default class HomePageController {
    public async index({ view }: HttpContext) {
        return view.render('home')
    }
}