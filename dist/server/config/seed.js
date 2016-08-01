/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var _user = require('../api/user/user.model');

var _user2 = _interopRequireDefault(_user);

var _todo = require('../api/todo/todo.model');

var _todo2 = _interopRequireDefault(_todo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_user2.default.find({}).remove().then(function () {
  _user2.default.create({
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
  }).then(function () {
    console.log('finished populating users');
    _user2.default.find({ email: 'test@example.com' }).then(function (users) {
      var userId = users[0]._id;
      console.log(userId);
      _todo2.default.find({}).remove().then(function () {
        _todo2.default.create({
          name: 'Learn MongoDB',
          info: '<b>Schema design</b><p>Write your own idea of schema</p>',
          complete: false,
          user: userId
        }, {
          name: 'Learn Express',
          info: '<b>Express/b><ul><li>Router</li><li>Route</li><li>middleware</li></ul>',
          complete: true,
          user: userId
        }, {
          name: 'Learn AngularJS',
          info: '<h2>Angular</h2><ol><li>Twoway binding</li><li>ModuleComponents</li><li>Routing</li></ol>',
          complete: false,
          user: userId
        }, {
          name: 'Learn Node',
          info: '<p>Node js learning</p> Just do javascript',
          complete: false,
          user: userId
        }).then(function () {
          console.log('finished populating todos');
        });
      });
    });
  });
});
//# sourceMappingURL=seed.js.map
