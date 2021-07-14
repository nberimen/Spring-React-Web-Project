import React from 'react';
import Input from '../components/input';
import { withTranslation } from 'react-i18next'
import { login } from '../api/apiCalls';
import axios from 'axios';
import ButtonWithProgress from '../components/ButtonWithProgress'

class LoginPage extends React.Component {

    state = {
        username: null,
        password: null,
        error: null,
        pendingApiCall: null
    }

    componentDidMount(){
        axios.interceptors.request.use((request) => {
            this.setState({pendingApiCall: true});
            return request;
        })
        axios.interceptors.response.use(response => {
            this.setState({pendingApiCall: false});
            return response;
        },error => {
            this.setState({pendingApiCall: false});
            throw error;
        }
        )
    }
    onChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value,
            error: null
        })
    }

    onClickLogin = async event => {
        event.preventDefault();
        const { username, password } = this.state;
        const creds = {
            username,
            password
        }
        this.setState({
            error: null
        })
        try {
            await login(creds);
        } catch (apiError) {
            this.setState({
                error: apiError.response.data.message
            })
        }
    }

    render() {
        const { t } = this.props;
        const {username, password, error, pendingApiCall} = this.state;

        const buttonEnabled = username && password;
        return (
            <div className="container">
                <form>
                    <h1 className="text-center">{t('Login')}</h1>
                    <Input
                        name="username"
                        label={t('Username')}
                        onChange={this.onChange}
                    />
                    <Input
                        name="password"
                        label={t('Password')}
                        type="password"
                        onChange={this.onChange}
                    />
                   {error && <div className="alert alert-danger">
                        {error}
                    </div>}
                    <div className="text-center">
                        <ButtonWithProgress
                            onClick={this.onClickLogin}
                            disabled={!buttonEnabled || pendingApiCall}
                            pendingApiCall= {pendingApiCall}
                            text= {t('Login')}
                        />
                    </div>
                </form>
            </div>

        )
    }

}
export default withTranslation()(LoginPage);