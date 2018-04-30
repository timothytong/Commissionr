'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _Navbar = require('./Navbar');

var _Navbar2 = _interopRequireDefault(_Navbar);

var _Constants = require('../utils/Constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EditProfilePage = function (_React$Component) {
    _inherits(EditProfilePage, _React$Component);

    function EditProfilePage(props) {
        _classCallCheck(this, EditProfilePage);

        var _this = _possibleConstructorReturn(this, (EditProfilePage.__proto__ || Object.getPrototypeOf(EditProfilePage)).call(this, props));

        _this.state = {
            username: '',
            email: ''
        };
        _this.handleChange = _this.handleChange.bind(_this);
        _this.handleUpdateButtonClicked = _this.handleUpdateButtonClicked.bind(_this);
        return _this;
    }

    _createClass(EditProfilePage, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            _axios2.default.get(_Constants.DOMAIN_URL + '/api/v1/user/session').then(function (response) {
                if (response.status === 200 || response.status === 304) {
                    _this2.setState({ retrievedUsername: response.data.user_name, username: response.data.user_name, email: response.data.email });
                }
            }).catch(function (error) {
                console.log(error);
                _this2.setState({ loading: false });
            });
        }
    }, {
        key: 'handleUpdateButtonClicked',
        value: function handleUpdateButtonClicked() {
            var _this3 = this;

            var data = _extends({}, this.state);
            if (this.state.retrievedUsername === this.state.username) {
                delete data.username;
            }
            _axios2.default.post(_Constants.DOMAIN_URL + '/api/v1/user/updateProfile', data).then(function (response) {
                if (response.status === 200 || response.status === 201) {
                    console.log('Successfully edited.');
                    _this3.props.history.push('/', { message: response.data.message });
                }
            }).catch(function (error) {
                console.log(error);
                _this3.setState({ errorMessage: error.response.data.error.replace(/notNull Violation: /g, "") });
            });
        }
    }, {
        key: 'handleChange',
        value: function handleChange(e) {
            this.setState(_defineProperty({}, e.target.name, e.target.value));
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'h1',
                    null,
                    'Edit profile'
                ),
                _react2.default.createElement(
                    'h4',
                    null,
                    'Username:'
                ),
                _react2.default.createElement('input', { onChange: this.handleChange, type: 'text', name: 'username', value: this.state.username }),
                _react2.default.createElement(
                    'h4',
                    null,
                    'Email:'
                ),
                _react2.default.createElement('input', { onChange: this.handleChange, type: 'text', name: 'email', value: this.state.email }),
                _react2.default.createElement(
                    'button',
                    { type: 'button', onClick: this.handleUpdateButtonClicked },
                    'Update'
                )
            );
        }
    }]);

    return EditProfilePage;
}(_react2.default.Component);

exports.default = EditProfilePage;
//# sourceMappingURL=EditProfilePage.js.map
