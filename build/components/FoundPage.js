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

var _reactRouterDom = require('react-router-dom');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FoundPage = function (_React$Component) {
    _inherits(FoundPage, _React$Component);

    function FoundPage(props) {
        _classCallCheck(this, FoundPage);

        var _this = _possibleConstructorReturn(this, (FoundPage.__proto__ || Object.getPrototypeOf(FoundPage)).call(this, props));

        _this.state = {
            errorMessage: ''
        };
        _this.handleChange = _this.handleChange.bind(_this);
        _this.handleSubmitButtonClicked = _this.handleSubmitButtonClicked.bind(_this);
        return _this;
    }

    _createClass(FoundPage, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            if (!this.props.location.state || !this.props.location.state.post) {
                this.props.history.push('/notFound', { message: "Post not found." });
            } else {
                var post = this.props.location.state.post;
                var postId = post.id;
                this.setState({ postId: postId });
            }
        }
    }, {
        key: 'handleChange',
        value: function handleChange(e) {
            this.setState(_defineProperty({}, e.target.name, e.target.value));
        }
    }, {
        key: 'handleSubmitButtonClicked',
        value: function handleSubmitButtonClicked() {
            var _this2 = this;

            var data = { username: this.state.username };
            _axios2.default.post(_Constants.DOMAIN_URL + '/api/v1/post/found/' + this.state.postId, data).then(function (response) {
                if (response.status === 200) {
                    _this2.props.history.push('/', { message: response.data.message });
                }
            }).catch(function (error) {
                console.log(error);
                _this2.setState({ errorMessage: error.response.data.message });
            });
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                null,
                this.state.errorMessage.length > 0 ? _react2.default.createElement(
                    'p',
                    null,
                    this.state.errorMessage
                ) : "",
                _react2.default.createElement(
                    'h1',
                    null,
                    'Finder\'s Username'
                ),
                _react2.default.createElement('input', { onChange: this.handleChange, type: 'text', name: 'username' }),
                _react2.default.createElement(
                    'button',
                    { type: 'button', onClick: this.handleSubmitButtonClicked },
                    'Submit'
                )
            );
        }
    }]);

    return FoundPage;
}(_react2.default.Component);

exports.default = FoundPage;
//# sourceMappingURL=FoundPage.js.map
