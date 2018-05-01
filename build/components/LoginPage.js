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

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LoginPage = function (_React$Component) {
	_inherits(LoginPage, _React$Component);

	function LoginPage(props) {
		_classCallCheck(this, LoginPage);

		var _this = _possibleConstructorReturn(this, (LoginPage.__proto__ || Object.getPrototypeOf(LoginPage)).call(this, props));

		_this.state = {
			username: '',
			password: '',
			errorMessage: ''
		};
		_this.handleChange = _this.handleChange.bind(_this);
		_this.handleLoginButtonClicked = _this.handleLoginButtonClicked.bind(_this);
		_this.handleNewUserClicked = _this.handleNewUserClicked.bind(_this);
		return _this;
	}

	_createClass(LoginPage, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			var _this2 = this;

			_axios2.default.get(_Constants.DOMAIN_URL + '/api/v1/user/session').then(function (response) {
				if (response.status === 200) {
					_this2.props.history.push('/home');
				}
			}).catch(function (error) {
				console.log(error);
			});
		}
	}, {
		key: 'handleChange',
		value: function handleChange(e) {
			this.setState(_defineProperty({}, e.target.name, e.target.value));
		}
	}, {
		key: 'handleLoginButtonClicked',
		value: function handleLoginButtonClicked() {
			var _this3 = this;

			_axios2.default.post(_Constants.DOMAIN_URL + '/api/v1/user/login', {
				username: this.state.username,
				password: this.state.password
			}).then(function (response) {
				console.log(response);
				_this3.setState({ username: '', password: '' });
				_this3.props.history.push('/home');
			}).catch(function (error) {
				console.log(error);
				_this3.setState({ errorMessage: error.response.data.message });
			});
		}
	}, {
		key: 'handleNewUserClicked',
		value: function handleNewUserClicked() {
			this.setState({ username: '', password: '' });
			this.props.history.push('/signup');
		}
	}, {
		key: 'render',
		value: function render() {
			var errorMessage = '';

			if (this.state.errorMessage.length > 0) {
				errorMessage = _react2.default.createElement(
					'p',
					null,
					this.state.errorMessage
				);
			} else if (!!this.props.location.state) {
				errorMessage = _react2.default.createElement(
					'p',
					null,
					this.props.location.state.message
				);
			}

			return _react2.default.createElement(
				'div',
				null,
				errorMessage,
				_react2.default.createElement(
					'h4',
					null,
					'Username:'
				),
				_react2.default.createElement('input', { onChange: this.handleChange, type: 'text', name: 'username' }),
				_react2.default.createElement(
					'h4',
					null,
					'Password:'
				),
				_react2.default.createElement('input', { onChange: this.handleChange, type: 'password', name: 'password' }),
				_react2.default.createElement(
					'button',
					{ type: 'button', onClick: this.handleLoginButtonClicked },
					'Login'
				),
				_react2.default.createElement(
					'button',
					{ type: 'button', onClick: this.handleNewUserClicked },
					'New User'
				)
			);
		}
	}]);

	return LoginPage;
}(_react2.default.Component);

// LESSONS LEARNED
// 1. Make sure bind all on(*) handles
// 2. on(*) handles come with event e, retrieve UI element with e.target
// 3. Doublecheck HTTP verb for each route used (GET? POST? PUT? PATCH? DELETE?)


exports.default = LoginPage;
//# sourceMappingURL=LoginPage.js.map
