'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _DeleteButton = require('./DeleteButton');

var _DeleteButton2 = _interopRequireDefault(_DeleteButton);

var _reactRouterDom = require('react-router-dom');

var _Constants = require('../utils/Constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PostsList = function (_React$Component) {
    _inherits(PostsList, _React$Component);

    function PostsList(props) {
        _classCallCheck(this, PostsList);

        var _this = _possibleConstructorReturn(this, (PostsList.__proto__ || Object.getPrototypeOf(PostsList)).call(this, props));

        _this.state = {
            loading: true
        };
        _this.deletePost = _this.deletePost.bind(_this);
        return _this;
    }

    _createClass(PostsList, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            var url = _Constants.DOMAIN_URL + '/api/v1/post/logged-in-userposts/';
            if (!!this.props.username) {
                url = _Constants.DOMAIN_URL + '/api/v1/post/userposts/' + this.props.username;
            }
            _axios2.default.get(url).then(function (response) {
                var posts = response.data.data;
                _this2.setState({ loading: false, posts: posts });
                console.log(response);
            }).catch(function (error) {
                _this2.setState({ loading: false, errorMessage: error.response.data.message });
                console.log(error);
            });
        }
    }, {
        key: 'deletePost',
        value: function deletePost(index) {
            var newPosts = this.state.posts.slice(0, index).concat(this.state.posts.slice(index + 1));
            this.setState({ posts: newPosts });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            if (this.state.loading) {
                return _react2.default.createElement(
                    'div',
                    null,
                    _react2.default.createElement(
                        'h1',
                        null,
                        'Loading'
                    )
                );
            } else if (!!this.state.posts) {
                return _react2.default.createElement(
                    'ul',
                    null,
                    this.state.posts.map(function (post, index) {
                        var deleteButton = null;
                        var editButton = null;
                        var foundButton = null;
                        if (_this3.props.postsEditable === true) {
                            deleteButton = _react2.default.createElement(_DeleteButton2.default, { deletePost: _this3.deletePost, postId: post.id, postIndex: index });
                            editButton = _react2.default.createElement(
                                _reactRouterDom.Link,
                                { to: {
                                        pathname: '/post/edit',
                                        state: { post: post }
                                    } },
                                'Edit'
                            );
                            foundButton = _react2.default.createElement(
                                _reactRouterDom.Link,
                                { to: {
                                        pathname: '/post/found',
                                        state: { post: post }
                                    } },
                                'Found'
                            );
                        }
                        return _react2.default.createElement(
                            'li',
                            { key: index },
                            post.id,
                            ': looking for ',
                            post.name,
                            ' around ',
                            post.formatted_address,
                            editButton,
                            deleteButton,
                            foundButton,
                            _react2.default.createElement(
                                'ul',
                                null,
                                post.additional_attributes.map(function (attr, index) {
                                    return _react2.default.createElement(
                                        'li',
                                        { key: index },
                                        attr.key,
                                        ' => ',
                                        attr.value
                                    );
                                })
                            )
                        );
                    })
                );
            } else {
                return _react2.default.createElement(
                    'div',
                    null,
                    _react2.default.createElement(
                        'h1',
                        null,
                        this.state.errorMessage || "Error loading content"
                    )
                );
            }
        }
    }]);

    return PostsList;
}(_react2.default.Component);

exports.default = PostsList;
//# sourceMappingURL=PostsList.js.map
