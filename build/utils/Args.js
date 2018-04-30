'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.REGEN_LOCAL_DB = undefined;

var _minimist = require('minimist');

var _minimist2 = _interopRequireDefault(_minimist);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var argv = (0, _minimist2.default)(process.argv.slice(2));

var REGEN_LOCAL_DB = exports.REGEN_LOCAL_DB = process.env.NODE_ENV !== 'production' && argv['regenDb'] === true;
//# sourceMappingURL=Args.js.map
