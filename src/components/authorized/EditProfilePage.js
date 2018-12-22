import {DOMAIN_URL} from '../../utils/Constants';

import React from 'react';
import axios from 'axios';

import Navbar from '../Navbar';
import Checkbox from '../shared/uicomponents/Checkbox';

export default class EditProfilePage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            oldDisplayName: '',
            displayName: '',
            email: '',
            showNsfw: false,
        };
        this.handleInputChanged = this.handleInputChanged.bind(this);
        this.handleCheckboxChanged = this.handleCheckboxChanged.bind(this);
        this.handleUpdateButtonClicked = this.handleUpdateButtonClicked.bind(this);
    }

    createCheckbox(name, label, isChecked) {
        return (
            <Checkbox
                label={label}
                name={name}
                handleCheckboxChanged={this.handleCheckboxChanged}
                isChecked={this.state[name]}
                key={Math.random()}
            />
        );
    }

    componentDidMount() {
        axios.get(`${DOMAIN_URL}/api/v1/user/session`)
            .then((response) => {
                if (response.status === 200 || response.status === 304) {
                    const { user } = response.data;
                    this.setState({
                        oldDisplayName: user.display_name,
                        displayName: user.display_name,
                        email: user.email,
                        showNsfw: user.show_nsfw,
                    });
                }
            })
            .catch((error) => {
                console.log(error);
                this.setState({loading: false});
            });
    }

    handleUpdateButtonClicked() {
        const data = { ...this.state };
        if (this.state.oldDisplayName === this.state.displayName) {
            delete data.displayName;
        }
        axios.post(`${DOMAIN_URL}/api/v1/user/updateProfile`, data)
        .then((response) => {
            if (response.status === 200 || response.status === 201) {
                console.log('Successfully edited.');
                this.props.history.push('/', { message: response.data.message });
            }
        })
        .catch((error) => {
            console.log(error);
            this.setState({ errorMessage: error.response.data.message });
        });
    }

    handleCheckboxChanged(name, checked) {
        this.setState({[name]: checked});
    }

    handleInputChanged(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    render() {
        return (
            <div>
                <h1>Edit profile</h1>
                <h4>Display Name:</h4>
                <input onChange={this.handleInputChanged} type="text" name="displayName" value={this.state.displayName}/>
                <button type="button" onClick={this.handleUpdateButtonClicked}>Update</button>
                {this.createCheckbox("showNsfw", "Show NSFW content", this.state.showNsfw)}
            </div>
        )
    }
}

