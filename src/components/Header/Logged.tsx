import * as React from 'react';
import {Avatar} from "material-ui";
import {authService, USER_ENTRY_NO_VALUE, UserEntry} from "../../service/generic/AuthService";
import {Component} from "react";

export default class Logged extends Component<any,
    {
        user: UserEntry
    }> {
    state = {
        user: USER_ENTRY_NO_VALUE
    };
    private removeListener: () => void;

    componentDidMount() {
        this.removeListener = authService.onAuthStateChanged((user) => {
            this.setState({user: user});
        })
    }

    componentWillUnmount() {
        this.removeListener();
    }

    render() {
        return <div>
            {(this.state.user.avatarUrl !== "") &&
            <Avatar onClick={this.props.onAccountClick} src={this.state.user.avatarUrl}/>
            }
        </div>
    }
}