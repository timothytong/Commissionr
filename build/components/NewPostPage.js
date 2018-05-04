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

var _reactDatepicker = require('react-datepicker');

var _reactDatepicker2 = _interopRequireDefault(_reactDatepicker);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

require('react-datepicker/dist/react-datepicker.css');

var _reactGeosuggest = require('react-geosuggest');

var _reactGeosuggest2 = _interopRequireDefault(_reactGeosuggest);

var _Constants = require('../utils/Constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NewPostPage = function (_React$Component) {
	_inherits(NewPostPage, _React$Component);

	function NewPostPage(props) {
		_classCallCheck(this, NewPostPage);

		var _this = _possibleConstructorReturn(this, (NewPostPage.__proto__ || Object.getPrototypeOf(NewPostPage)).call(this, props));

		_this.state = {
			errorMessage: '',
			additionalAttrs: [],
			post: {},
			isEditing: false,
			isEditingLocation: false
		};
		_this.handleChange = _this.handleChange.bind(_this);
		_this.handleCreatePostButtonClicked = _this.handleCreatePostButtonClicked.bind(_this);
		_this.handleDatePickerChange = _this.handleDatePickerChange.bind(_this);
		_this.handleCreateNewAttributeClicked = _this.handleCreateNewAttributeClicked.bind(_this);
		_this.handleDeleteAttribute = _this.handleDeleteAttribute.bind(_this);
		_this.handleAttributeChange = _this.handleAttributeChange.bind(_this);
		_this.handleChangeLocationClicked = _this.handleChangeLocationClicked.bind(_this);
		_this.onSuggestSelect = _this.onSuggestSelect.bind(_this);
		_this.handleChangeLocationConfirmClicked = _this.handleChangeLocationConfirmClicked.bind(_this);
		return _this;
	}

	_createClass(NewPostPage, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			if (!!this.props.location.state && !!this.props.location.state.post) {
				var post = this.props.location.state.post;
				var additionalAttrs = [].concat(_toConsumableArray(post.additional_attributes));
				var postId = post.id;
				delete post.id;
				delete post.additional_attributes;
				post.formattedAddress = post.formatted_address;
				delete post.formatted_address;
				delete post.submitter_user_id;
				post.lastSeen = post.last_seen;
				delete post.last_seen;
				var datePicker = (0, _moment2.default)(post.lastSeen);
				this.setState({
					post: post,
					postId: postId,
					additionalAttrs: additionalAttrs,
					datePicker: datePicker,
					isEditing: true,
					previousLat: post.latitude,
					previousLng: post.longitude,
					previousAddress: post.formattedAddress
				});
			}
		}
	}, {
		key: 'handleChange',
		value: function handleChange(e) {
			var updatedPost = _extends({}, this.state.post);
			if (e.target.type === 'checkbox') {
				updatedPost[e.target.name] = e.target.checked;
			} else {
				updatedPost[e.target.name] = e.target.value;
			}
			this.setState({ post: updatedPost });
		}
	}, {
		key: 'handleDatePickerChange',
		value: function handleDatePickerChange(date) {
			var updatedPost = _extends({}, this.state.post);
			updatedPost.lastSeen = date.format('MM/DD/YYYY');
			this.setState({ post: updatedPost, datePicker: date });
		}
	}, {
		key: 'handleCreatePostButtonClicked',
		value: function handleCreatePostButtonClicked() {
			var _this2 = this;

			var data = _extends({}, this.state.post);
			var url = this.state.isEditing ? _Constants.DOMAIN_URL + '/api/v1/post/edit/' + this.state.postId : _Constants.DOMAIN_URL + '/api/v1/post/create/';
			var successMessage = this.state.isEditing ? "Post successfully updated!" : "Post successfully created!";

			data.additionalAttributes = this.state.additionalAttrs;
			_axios2.default.post(url, data).then(function (response) {
				if (response.status === 200 || response.status === 201) {
					console.log(successMessage);
					_this2.props.history.push('/home', { message: successMessage });
				}
			}).catch(function (error) {
				console.log(error);
				_this2.setState({ errorMessage: error.response.data.message });
			});
		}
	}, {
		key: 'onSuggestSelect',
		value: function onSuggestSelect(suggest) {
			if (suggest.location.lat !== 0 || suggest.location.lng !== 0) {
				var updatedPost = _extends({}, this.state.post);
				updatedPost.latitude = suggest.location.lat;
				updatedPost.longitude = suggest.location.lng;
				this.setState({ post: updatedPost, pendingFormattedAddress: suggest.description });
			}
		}
	}, {
		key: 'handleCreateNewAttributeClicked',
		value: function handleCreateNewAttributeClicked() {
			var newAdditionalAttrs = [].concat(_toConsumableArray(this.state.additionalAttrs));
			newAdditionalAttrs.push({ key: '', value: '' });
			this.setState({ additionalAttrs: newAdditionalAttrs });
		}
	}, {
		key: 'handleDeleteAttribute',
		value: function handleDeleteAttribute(index) {
			var attributes = this.state.additionalAttrs.slice(0, index).concat(this.state.additionalAttrs.slice(index + 1));
			this.setState({ additionalAttrs: attributes });
		}
	}, {
		key: 'handleAttributeChange',
		value: function handleAttributeChange(e) {
			var newAdditionalAttrs = [].concat(_toConsumableArray(this.state.additionalAttrs));
			var name = e.target.name;
			var parts = name.split('|');
			newAdditionalAttrs[parseInt(parts[0])][parts[1]] = e.target.value;
			this.setState({ additionalAttrs: newAdditionalAttrs });
		}
	}, {
		key: 'handleChangeLocationClicked',
		value: function handleChangeLocationClicked(e) {
			if (this.state.isEditingLocation) {
				var post = _extends({}, this.state.post);
				post.latitude = this.state.previousLat;
				post.longitude = this.state.previousLng;
				post.formattedAddress = this.state.previousAddress;
				this.setState({ post: post });
			}
			this.setState({ isEditingLocation: !this.state.isEditingLocation });
		}
	}, {
		key: 'handleChangeLocationConfirmClicked',
		value: function handleChangeLocationConfirmClicked(e) {
			var post = _extends({}, this.state.post);
			post.formattedAddress = this.state.pendingFormattedAddress;
			this.setState({
				previousLat: post.latitude,
				previousLng: post.longitude,
				previousAddress: post.formattedAddress,
				isEditingLocation: false,
				post: post
			});
		}
	}, {
		key: 'render',
		value: function render() {
			var _this3 = this;

			var locationField = '';
			if (!this.state.isEditing || this.state.isEditingLocation) {
				locationField = _react2.default.createElement(_reactGeosuggest2.default, {
					ref: function ref(el) {
						return _this3._geoSuggest = el;
					},
					placeholder: 'Location',
					onSuggestSelect: this.onSuggestSelect,
					location: new google.maps.LatLng(0, 0),
					radius: '20'
				});
			} else {
				locationField = _react2.default.createElement(
					'h6',
					null,
					this.state.post.formattedAddress
				);
			}
			var editLocationButton = '';
			if (!this.state.isEditingLocation && this.state.isEditing) {
				editLocationButton = _react2.default.createElement(
					'button',
					{ type: 'button', onClick: this.handleChangeLocationClicked },
					'Edit Location'
				);
			} else if (this.state.isEditingLocation && this.state.isEditing) {
				editLocationButton = _react2.default.createElement(
					'button',
					{ type: 'button', onClick: this.handleChangeLocationClicked },
					'Cancel'
				);
			}
			var confirmButton = '';
			if (this.state.isEditingLocation && this.state.isEditing) {
				confirmButton = _react2.default.createElement(
					'button',
					{ type: 'button', onClick: this.handleChangeLocationConfirmClicked },
					'Confirm'
				);
			}
			return _react2.default.createElement(
				'div',
				null,
				_react2.default.createElement(
					'h1',
					null,
					this.state.isEditing ? 'Edit Post' : 'New Post Page'
				),
				_react2.default.createElement(
					'div',
					null,
					this.state.errorMessage.length > 0 ? _react2.default.createElement(
						'p',
						null,
						this.state.errorMessage
					) : "",
					_react2.default.createElement(
						'h6',
						null,
						'Name: '
					),
					_react2.default.createElement('input', { onChange: this.handleChange, type: 'text', name: 'name', value: this.state.post.name }),
					_react2.default.createElement(
						'h6',
						null,
						'Last Seen: '
					),
					_react2.default.createElement(_reactDatepicker2.default, { selected: this.state.datePicker, onChange: this.handleDatePickerChange }),
					_react2.default.createElement(
						'h6',
						null,
						'Reward: '
					),
					_react2.default.createElement('input', { onChange: this.handleChange, type: 'text', name: 'reward', value: this.state.post.reward }),
					_react2.default.createElement(
						'div',
						null,
						_react2.default.createElement(
							'h6',
							null,
							'Location: '
						),
						locationField,
						editLocationButton,
						confirmButton
					),
					_react2.default.createElement(
						'h6',
						null,
						'Contact: '
					),
					_react2.default.createElement('input', { onChange: this.handleChange, type: 'text', name: 'contact', value: this.state.post.contact }),
					_react2.default.createElement(
						'h6',
						null,
						'Description: '
					),
					_react2.default.createElement('input', { onChange: this.handleChange, type: 'text', name: 'description', value: this.state.post.description }),
					_react2.default.createElement(
						'ul',
						null,
						this.state.additionalAttrs.map(function (attr, index) {
							return _react2.default.createElement(
								'li',
								{ key: index },
								_react2.default.createElement('input', { value: attr.key, name: index + '|key', onChange: _this3.handleAttributeChange, type: 'text' }),
								_react2.default.createElement('input', { value: attr.value, name: index + '|value', onChange: _this3.handleAttributeChange, type: 'text' }),
								_react2.default.createElement(
									'button',
									{ type: 'button', onClick: function onClick() {
											return _this3.handleDeleteAttribute(index);
										} },
									'X'
								)
							);
						})
					),
					_react2.default.createElement(
						'button',
						{ type: 'button', onClick: this.handleCreateNewAttributeClicked },
						'Add attribute'
					)
				),
				_react2.default.createElement(
					'button',
					{ type: 'button', onClick: this.handleCreatePostButtonClicked },
					this.state.isEditing ? 'Update' : 'Post'
				)
			);
		}
	}]);

	return NewPostPage;
}(_react2.default.Component);

exports.default = NewPostPage;
//# sourceMappingURL=NewPostPage.js.map
