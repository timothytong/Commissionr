'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function () {
    _Database2.default.sync({ force: true }).then(function () {
        return _user2.default.userDb.bulkCreate([{ user_name: 'laetansx', email: 'laetansx@gmail.com', password: 'default1', active: true }, { user_name: 'ckhyena', email: 'ckhyena@gmail.com', password: 'default1', active: true }, { user_name: 'cupidthedeer', email: 'cupidthedeer@jail.com', password: 'default1', active: false }]);
    }).then(function () {
        return _post2.default.postDb.bulkCreate([{
            name: 'Lae',
            last_seen: '2017-11-29T05:40:35.324Z',
            reward: 300.00,
            longitude: 45,
            latitude: 50,
            city: 'Seattle',
            state: 'WA',
            country: 'USA',
            contact: 'laetansx@gmail.com',
            description: 'Blue dog',
            found: false,
            found_user_id: 1,
            deleted: false,
            submitter_user_id: 2
        }, {
            name: 'Ck',
            last_seen: '2017-11-29T05:40:35.324Z',
            reward: 0.00,
            longitude: 45,
            latitude: 50,
            city: 'Seattle',
            state: 'WA',
            country: 'USA',
            contact: 'hello@gmail.com',
            description: 'Blue yeen',
            found: false,
            found_user_id: null,
            deleted: false,
            submitter_user_id: 1
        }, {
            name: 'Cupid',
            last_seen: '2017-11-29T05:40:35.324Z',
            reward: 0.00,
            longitude: 45,
            latitude: 50,
            city: 'Portland',
            state: 'ME',
            country: 'USA',
            contact: 'hello@gmail.com',
            description: 'Blue pedo',
            found: false,
            found_user_id: null,
            deleted: false,
            submitter_user_id: 1
        }, {
            name: 'Rai',
            last_seen: '2017-11-29T05:40:35.324Z',
            reward: 0.00,
            longitude: 45,
            latitude: 50,
            city: 'St. Paul',
            state: 'MN',
            country: 'USA',
            contact: 'hello@gmail.com',
            description: 'Blue corgi',
            found: false,
            found_user_id: null,
            deleted: true,
            submitter_user_id: 3
        }]);
    }).then(function () {
        return _attribute2.default.attributeDb.bulkCreate([{
            id: 1,
            key: 'sashimi',
            value: 'salmon',
            post_id: 1
        }, {
            id: 2,
            key: 'cringe',
            value: 'furry',
            post_id: 2
        }, {
            id: 3,
            key: 'oh hai',
            value: 'mark',
            post_id: 2
        }]);
    }).catch(function (e) {
        return console.log('Error: ' + e + '\nHint: Is your postgres running?');
    });
};

var _user = require('./user');

var _user2 = _interopRequireDefault(_user);

var _post = require('./post');

var _post2 = _interopRequireDefault(_post);

var _attribute = require('./attribute');

var _attribute2 = _interopRequireDefault(_attribute);

var _Database = require('./Database');

var _Database2 = _interopRequireDefault(_Database);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//# sourceMappingURL=RegenDb.js.map
