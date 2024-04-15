import * as React from 'react';


import { request, setAuthToken } from '../helpers/axios_helper';

import Buttons from './Buttons';
import AuthContent from './AuthContent';
import LoginForm from './LoginForm';
import WelcomeContent from './WelcomeContent'
import Board from "./board/Board";

export default class AppContent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            componentToShow: "welcome"
        }
    };

    login = () => {
        this.setState({componentToShow: "login"})
    };

    logout = () => {
        localStorage.removeItem('auth_token');
        this.setState({componentToShow: "welcome"})
    };

    onLogin = (e, username, password) => {
        e.preventDefault();
        request(
            "POST",
            "/login",
            {
                login: username,
                password: password
            }).then(
            (response) => {
                alert('로그인 성공');
                this.setState({componentToShow: "messages"});
                setAuthToken(response.data.token);
            }).catch(
            (error) => {
                alert('로그인 실패: ' + error.response.data.message); // 에러 메시지를 alert로 표시
                this.setState({componentToShow: "welcome"})
            }
        );
    };

    onRegister = (event, firstName, lastName, username, password) => {
        event.preventDefault();
        request(
            "POST",
            "/register",
            {
                firstName: firstName,
                lastName: lastName,
                login: username,
                password: password
            }).then(
            (response) => {
                this.setState({componentToShow: "messages"});
            }).catch(
            (error) => {
                this.setState({componentToShow: "welcome"})
            }
        );
    };

    render() {
        return (
            <>
                <Buttons
                    login={this.login}
                    logout={this.logout}
                />

                {this.state.componentToShow === "welcome" && <WelcomeContent /> }
                {this.state.componentToShow === "login" && <LoginForm onLogin={this.onLogin} onRegister={this.onRegister} />}
                {this.state.componentToShow === "messages" && <AuthContent />}


            </>
        );
    };
}