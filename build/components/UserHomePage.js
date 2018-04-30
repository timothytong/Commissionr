'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _Navbar = require('./Navbar');

var _Navbar2 = _interopRequireDefault(_Navbar);

var _PostsList = require('./PostsList');

var _PostsList2 = _interopRequireDefault(_PostsList);

var _NewPostButton = require('./NewPostButton');

var _NewPostButton2 = _interopRequireDefault(_NewPostButton);

var _Constants = require('../utils/Constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UserHomePage = function (_React$Component) {
    _inherits(UserHomePage, _React$Component);

    function UserHomePage(props) {
        _classCallCheck(this, UserHomePage);

        var _this = _possibleConstructorReturn(this, (UserHomePage.__proto__ || Object.getPrototypeOf(UserHomePage)).call(this, props));

        _this.state = {
            loading: true
        };
        return _this;
    }

    _createClass(UserHomePage, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            _axios2.default.get(_Constants.DOMAIN_URL + '/api/v1/user/session').then(function (response) {
                _this2.setState({ loading: false });
                if (response.status === 200 || response.status === 304) {
                    _this2.setState({ authenticated: true, loggedInUsername: response.data.user_name });
                }
            }).catch(function (error) {
                console.log(error);
                _this2.setState({ loading: false });
            });
        }
    }, {
        key: 'render',
        value: function render() {
            if (!this.state.loading) {
                return _react2.default.createElement(
                    'div',
                    null,
                    _react2.default.createElement(_Navbar2.default, { history: this.props.history, authenticated: this.state.authenticated }),
                    _react2.default.createElement(_PostsList2.default, {
                        username: this.props.match.params.username,
                        postsEditable: this.props.match.params.username === this.state.loggedInUsername
                    }),
                    _react2.default.createElement(_NewPostButton2.default, { history: this.props.history })
                );
            } else {
                return _react2.default.createElement(
                    'div',
                    null,
                    _react2.default.createElement(
                        'h1',
                        null,
                        'Loading'
                    )
                );
            }
        }
    }]);

    return UserHomePage;
}(_react2.default.Component);

// LESSONS LEARNED
// 1. Fetch on mount
// 2. Loading state while fetching
// 3. Display with ul and use map to transform individual array element into UI elements
// 4. Use browser console to help figure out what data to extract from response
// 5. return different UI under different conditions
// 6. Use this.props.history.push to navigate users to desired page
// 7. If communicating with backend at all, use Axios
// 8. Teach NewPostButton history so that the NewPostButton component knows what history comes from


exports.default = UserHomePage;
//# sourceMappingURL=UserHomePage.js.map
