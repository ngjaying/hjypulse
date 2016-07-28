/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import User from '../api/user/user.model';
import Todo from '../api/todo/todo.model';

User.find({}).remove()
  .then(() => {
    User.create({
      provider: 'local',
      name: 'Test User',
      email: 'test@example.com',
      password: 'test'
    }, {
      provider: 'local',
      role: 'admin',
      name: 'Admin',
      email: 'admin@example.com',
      password: 'admin'
    })
    .then(() => {
      console.log('finished populating users');
    });
  });

Todo.find({}).remove()
  .then(() => {
    Todo.create({
      name: 'Learn MongoDB',
      info: '<b>Schema design</b><p>Write your own idea of schema</p>',
      active: true
    }, {
      name: 'Learn Express',
      info: '<b>Express/b><ul><li>Router</li><li>Route</li><li>middleware</li></ul>',
      active: true
    }, {
      name: 'Learn AngularJS',
      info: '<h2>Angular</h2><ol><li>Twoway binding</li><li>ModuleComponents</li><li>Routing</li></ol>',
      active: true,
    }, {
      name: 'Learn Node',
      info: '<p>Node js learning</p> Just do javascript',
      active: false
    })
    .then(() => {
      console.log('finished populating todos');
    });
  });
