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

var Navbar = function (_React$Component) {
    _inherits(Navbar, _React$Component);

    function Navbar(props) {
        _classCallCheck(this, Navbar);

        var _this = _possibleConstructorReturn(this, (Navbar.__proto__ || Object.getPrototypeOf(Navbar)).call(this, props));

        _this.handleLogoutButtonClicked = _this.handleLogoutButtonClicked.bind(_this);
        _this.handleLoginButtonClicked = _this.handleLoginButtonClicked.bind(_this);
        _this.handleEditProfileButtonClicked = _this.handleEditProfileButtonClicked.bind(_this);
        return _this;
    }

    _createClass(Navbar, [{
        key: 'handleLogoutButtonClicked',
        value: function handleLogoutButtonClicked(e) {
            var _this2 = this;

            _axios2.default.get(_Constants.DOMAIN_URL + '/api/v1/user/logout').then(function (response) {
                console.log(response);
                _this2.props.history.push('/');
            }).catch(function (error) {
                console.log(error);
            });
        }
    }, {
        key: 'handleLoginButtonClicked',
        value: function handleLoginButtonClicked(e) {
            this.props.history.push('/');
        }
    }, {
        key: 'handleEditProfileButtonClicked',
        value: function handleEditProfileButtonClicked(e) {
            this.props.history.push('/updateProfile');
        }
    }, {
        key: 'render',
        value: function render() {
            var loginOutButton = _react2.default.createElement(
                'button',
                { type: 'button', onClick: this.handleLoginButtonClicked },
                'Login'
            );
            var editProfileButton = null;

            if (this.props.authenticated) {
                loginOutButton = _react2.default.createElement(
                    'button',
                    { type: 'button', onClick: this.handleLogoutButtonClicked },
                    'Logout'
                );
                editProfileButton = _react2.default.createElement(
                    'button',
                    { type: 'button', onClick: this.handleEditProfileButtonClicked },
                    'Edit profile'
                );
            }

            return _react2.default.createElement(
                'div',
                null,
                loginOutButton,
                editProfileButton
            );
        }
    }]);

    return Navbar;
}(_react2.default.Component);

exports.default = Navbar;
//# sourceMappingURL=Navbar.js.map
