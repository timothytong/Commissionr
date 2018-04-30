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

var SignUpPage = function (_React$Component) {
	_inherits(SignUpPage, _React$Component);

	function SignUpPage(props) {
		_classCallCheck(this, SignUpPage);

		var _this = _possibleConstructorReturn(this, (SignUpPage.__proto__ || Object.getPrototypeOf(SignUpPage)).call(this, props));

		_this.state = {
			username: '',
			password: '',
			confirmedPassword: '',
			errorMessage: ''
		};
		_this.handleChange = _this.handleChange.bind(_this);
		_this.handleCreateAccountButtonClicked = _this.handleCreateAccountButtonClicked.bind(_this);
		return _this;
	}

	_createClass(SignUpPage, [{
		key: 'handleChange',
		value: function handleChange(e) {
			this.setState(_defineProperty({}, e.target.name, e.target.value));
		}
	}, {
		key: 'handleCreateAccountButtonClicked',
		value: function handleCreateAccountButtonClicked() {
			var _this2 = this;

			var emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
			if (!this.state.email) {
				this.setState({ errorMessage: 'Email field is empty.' });
			} else if (!this.state.email.match(emailRegex)) {
				this.setState({ errorMessage: 'Invalid email.' });
			} else if (this.state.username.length < 3) {
				this.setState({ errorMessage: 'Username must be at least three characters.' });
			} else if (this.state.password !== this.state.confirmedPassword) {
				this.setState({ errorMessage: 'Passwords do not match.' });
			} else if (this.state.password.length < 6) {
				this.setState({ errorMessage: 'Passwords must be at least six characters.' });
			} else {
				_axios2.default.post(_Constants.DOMAIN_URL + '/api/v1/user/create', {
					email: this.state.email,
					username: this.state.username,
					password: this.state.password
				}).then(function (response) {
					console.log(response);
					_this2.setState({ email: '', username: '', password: '' });
					_this2.props.history.push('/', { message: response.data.message });
				}).catch(function (error) {
					console.log(error);
					_this2.setState({ errorMessage: error.response.data.message });
				});
			}
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
					'h4',
					null,
					'Email:'
				),
				_react2.default.createElement('input', { onChange: this.handleChange, type: 'text', name: 'email' }),
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
					'h4',
					null,
					'Confirm Password:'
				),
				_react2.default.createElement('input', { onChange: this.handleChange, type: 'password', name: 'confirmedPassword' }),
				_react2.default.createElement(
					'button',
					{ type: 'button', onClick: this.handleCreateAccountButtonClicked },
					'Create account'
				)
			);
		}
	}]);

	return SignUpPage;
}(_react2.default.Component);

exports.default = SignUpPage;
//# sourceMappingURL=SignUpPage.js.map
