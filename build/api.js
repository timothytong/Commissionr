'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _expressSession = require('express-session');

var _expressSession2 = _interopRequireDefault(_expressSession);

var _redis = require('redis');

var _redis2 = _interopRequireDefault(_redis);

var _connectRedis = require('connect-redis');

var _connectRedis2 = _interopRequireDefault(_connectRedis);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _UserRouter = require('./routes/UserRouter');

var _UserRouter2 = _interopRequireDefault(_UserRouter);

var _PostRouter = require('./routes/PostRouter');

var _PostRouter2 = _interopRequireDefault(_PostRouter);

var _Args = require('./utils/Args');

var _RegenDb = require('./models/RegenDb');

var _RegenDb2 = _interopRequireDefault(_RegenDb);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Api = function () {

    // create the express instance, attach app-level middleware, attach routers
    function Api() {
        _classCallCheck(this, Api);

        this.express = (0, _express2.default)();
        this.middleware();
        this.routes();
        this.generateDb();
    }

    // register middlewares

    // annotate with the express $Application type


    _createClass(Api, [{
        key: 'middleware',
        value: function middleware() {
            var store = (0, _connectRedis2.default)(_expressSession2.default);
            var redisStoreOptions = process.env.NODE_ENV === 'production' ? new store({ url: process.env.REDIS_URL }) : new store({
                host: process.env.REDIS_HOST,
                port: process.env.REDIS_PORT
            });
            this.express.use((0, _morgan2.default)('dev'));
            this.express.use((0, _expressSession2.default)({
                secret: 'abc',
                resave: false,
                store: redisStoreOptions,
                saveUninitialized: false,
                cookie: {
                    maxAge: 7 * 24 * 60 * 60 * 1000 // 24h * 7 in milliseconds
                }
            }));
            this.express.use(_bodyParser2.default.json());
            this.express.use(_bodyParser2.default.urlencoded({ extended: false }));
            this.express.use((0, _cors2.default)());
        }

        // connect resource routers

    }, {
        key: 'routes',
        value: function routes() {
            var userRouter = new _UserRouter2.default();
            var postRouter = new _PostRouter2.default();

            // attach it to our express app
            this.express.use(userRouter.path, checkRedisConnect, userRouter.router);
            this.express.use(postRouter.path, checkRedisConnect, postRouter.router);

            this.express.use(_express2.default.static(_path2.default.join(__dirname, 'static')));
            this.express.get('/*', function (req, res) {
                return res.sendFile(_path2.default.resolve(__dirname, 'static', 'index.html'));
            });
        }

        // generate databases

    }, {
        key: 'generateDb',
        value: function generateDb() {
            if (_Args.REGEN_LOCAL_DB || process.env.NODE_ENV === 'staging') {
                (0, _RegenDb2.default)();
            }
        }
    }]);

    return Api;
}();

exports.default = Api;


function checkRedisConnect(req, res, next) {
    if (!req.session) {
        return next(new Error('Redis not connected.'));
    }
    return next();
}
//# sourceMappingURL=api.js.map
