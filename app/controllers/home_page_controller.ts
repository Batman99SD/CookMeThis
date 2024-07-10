import type { HttpContext } from '@adonisjs/core/http'

/**
 * Controller class for the home page.
 */
export default class HomePageController {
    /**
     * Renders the home page view.
     * @param {HttpContext} context - The HTTP context object.
     * @returns {Promise<void>} - A promise that resolves when the view is rendered.
     */
    public async index({ view }: HttpContext) {
        return view.render('home')
    }
}