'use strict';

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route');

Route.group(() => {
  Route.post('sessions', 'SessionController.store');

  Route.post('users', 'UserController.store');
}).prefix('api');

Route.group(() => {
  Route.get('tools', 'ToolController.index');
  Route.get('tools/tags', 'ToolController.searchByTag');
  Route.post('tools', 'ToolController.store');
  Route.delete('tools', 'ToolController.destroy');
})
  .middleware('auth')
  .prefix('api');
