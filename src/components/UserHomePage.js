import React from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import PostsList from './PostsList';

export default class UserHomePage extends React.Component {
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
        	this.setState({loading: false});
            if (response.status === 200 || response.status === 304) {
                this.setState({authenticated: true});
            }
        })
        .catch((error) => {
            console.log(error);
            this.props.history.push('/');
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
        if (this.state.authenticated && !this.state.loading) {
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
            return (
                <div>
                	<Navbar login={login} logout={logout} authenticated={this.state.authenticated}/>
                    <PostsList />
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
