'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _Constants = require('../utils/Constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DeleteButton = function (_React$Component) {
    _inherits(DeleteButton, _React$Component);

    function DeleteButton(props) {
        _classCallCheck(this, DeleteButton);

        var _this = _possibleConstructorReturn(this, (DeleteButton.__proto__ || Object.getPrototypeOf(DeleteButton)).call(this, props));

        _this.handleDeleteButtonClicked = _this.handleDeleteButtonClicked.bind(_this);
        return _this;
    }

    _createClass(DeleteButton, [{
        key: 'handleDeleteButtonClicked',
        value: function handleDeleteButtonClicked() {
            var _this2 = this;

            _axios2.default.delete(_Constants.DOMAIN_URL + '/api/v1/post/delete/' + this.props.postId).then(function (response) {
                if (response.status === 200 || response.status === 202) {
                    _this2.props.deletePost(_this2.props.postIndex);
                    console.log('Successfully deleted.');
                }
            }).catch(function (error) {
                console.log(error);
            });
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'button',
                    { type: 'button', onClick: this.handleDeleteButtonClicked },
                    'Delete'
                )
            );
        }
    }]);

    return DeleteButton;
}(_react2.default.Component);

exports.default = DeleteButton;
//# sourceMappingURL=DeleteButton.js.map
