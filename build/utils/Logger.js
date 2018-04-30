'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Logger = function () {
    function Logger() {
        _classCallCheck(this, Logger);
    }

    _createClass(Logger, [{
        key: 'error',
        value: function error(context, err, message) {
            console.log('ERROR:\n\tContext: %s\n\tError Type: %s\n\tMessage: %s', context, err.name, message);

            if (err.name === 'SequelizeUniqueConstraintError') {
                var msg = err.errors[0].message.replace(/_/g, ' ');
                msg = msg.replace(/must be unique/g, 'is already in use.');

                return {
                    message: msg,
                    value: err.errors[0].value
                };
            }
        }
    }]);

    return Logger;
}();

exports.default = Logger;
//# sourceMappingURL=Logger.js.map
