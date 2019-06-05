'use strict';

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/** @typedef {import('App/Models/Tool')} Tool */
const Tool = use('App/Models/Tool');

const Database = use('Database');

/**
 * Resourceful controller for interacting with tools
 */
class ToolController {
  /**
   * Show a list of all tools.
   * GET tools
   */
  async index() {
    const tools = await Tool.query()
      .orderBy('id')
      .with('tags')
      .fetch();

    return tools;
  }

  /**
   * Create/save a new tool.
   * POST tools
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   */
  async store({ request }) {
    const dataTool = request.only(['title', 'link', 'description']);

    const dataTags = request.input('tags');
    const tagsToSave = [];

    dataTags.forEach(name => {
      tagsToSave.push({ name });
    });

    const trx = await Database.beginTransaction();

    const tool = await Tool.create(dataTool, trx);

    await tool.tags().createMany(tagsToSave, trx);

    await trx.commit();

    return tool;
  }

  /**
   * Delete a tool with id.
   * DELETE tools/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
    const tool = await Tool.findOrFail(params.id);

    tool.delete();
  }

  /**
   * Search tools by tag.
   * GET tools/tags/:tag
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   */
  async searchByTag({ request }) {
    const { tag } = request.get();

    const tools = await Database.select('*')
      .from('tools')
      .leftJoin('tags', 'tools.id', 'tags.tool_id')
      .where('tags.name', 'like', `%${tag}%`);

    return tools;
  }
}

module.exports = ToolController;
