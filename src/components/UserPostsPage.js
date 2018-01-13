import React from 'react';
import axios from 'axios';
import Navbar from './Navbar';

export default class UserPostsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
        };
        this.handleLogoutButtonClicked = this.handleLogoutButtonClicked.bind(this);
    }

    componentDidMount() {
        axios.get('http://localhost:3000/api/v1/user/session')
        .then((response) => {
            if (response.status === 200) {
                this.setState({authenticated: true});
                axios.get('http://localhost:3000/api/v1/post/userposts/2')
                .then((response) => {
                    this.setState({loading: false, posts: response.data.data});
                    console.log(response);
                })
                .catch((error) => {
                    this.setState({loading: false});
                    console.log(error);
                });
            } else {
                this.setState({authenticated: false});
            }
        })
        .catch((error) => {
            this.setState({authenticated: false});
            console.log(error);
        });
    }

    handleLogoutButtonClicked(e) {
        axios.get('http://localhost:3000/api/v1/user/logout')
        .then((response) => {
            console.log(response);
            this.props.history.push('/');
        })
        .catch((error) => {
            console.log(error);
        });
    }

    render() {
        if (this.state.authenticated && !this.state.loading && !!this.state.posts) {
            const logout = () => {
            	axios.get('http://localhost:3000/api/v1/user/logout')
		        .then((response) => {
		            console.log(response);
		            this.props.history.push('/');
		        })
		        .catch((error) => {
		            console.log(error);
		        });
            };
            const login = () => {
            	this.props.history.push('/');
            };
            const postLayout = (
                <ul>
                    {this.state.posts.map((post, index) => <li key={index}>{post.id} => {post.name}</li>)}
                </ul>
            );
            return (
                <div>
                	<Navbar login={login} logout={logout} authenticated={this.state.authenticated}/>
                    {postLayout}
                </div>
            );
        } else if (!this.state.authenticated) {
            return (
                <div>
                    <h1>User not authenticated.</h1>
                </div>
            );
        } else {
            return (
                <div>
                    <h1>Loading</h1>
                </div>
            );
        }

    }
}

// LESSONS LEARNED
// 1. Fetch on mount
// 2. Loading state while fetching
// 3. Display with ul and use map to transform individual array element into UI elements
// 4. Use browser console to help figure out what data to extract from response
// 5. return different UI under different conditions
// 6. Use this.props.history.push to navigate users to desired page
// 7. If communicating with backend at all, use Axios
