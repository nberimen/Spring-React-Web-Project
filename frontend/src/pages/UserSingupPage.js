import React from 'react';
import { signup } from '../api/apiCalls';
import Input from '../components/input';
import { withTranslation } from 'react-i18next'
import ButtonWithProgress from '../components/ButtonWithProgress'
import { withApiProgress } from '../shared/ApiProgress'
import { connect } from 'react-redux';
import { signupHandler } from '../redux/authActions';
class UserSignupPage extends React.Component {

    state = {
        username: null,
        displayName: null,
        password: null,
        passwordRepeat: null,
        errors: {}
    }

    onChange = event => {
        const { t } = this.props;
        const { name, value } = event.target;
        const errors = { ...this.state.errors };
        errors[name] = undefined;

        if (name === 'password' || name === 'passwordRepeat') {
            if (name === 'password' && value !== this.state.passwordRepeat) {
                errors.passwordRepeat = t('Password mismatch');
            } else if (name === 'passwordRepeat' && value !== this.state.password) {
                errors.passwordRepeat = t('Password mismatch');
            } else {
                errors.passwordRepeat = undefined;
            }
        }
        this.setState({
            [name]: value,
            errors
        })
    }

    onClickSingup = async event => {
        event.preventDefault();

        const { history, dispatch } = this.props;
        const { push } = history;

        const { username, displayName, password } = this.state;
        const body = {
            username,
            displayName,
            password
        }


        try {
            await dispatch(signupHandler(body));
            push('/');
        } catch (error) {
            if (error.response.data.validationErrors) {
                this.setState({ errors: error.response.data.validationErrors });
            }

        }

    }



    render() {
        const { errors } = this.state;
        const { username, displayName, password, passwordRepeat } = errors;
        const { t, pendingApiCall } = this.props;

        return (
            <div className="container">
                <form>
                    <h1 className="text-center">{t('Sign Up')}</h1>
                    <Input
                        name="username"
                        label={t("Username")}
                        error={username}
                        onChange={this.onChange}
                    />
                    <Input
                        name="displayName"
                        label={t("Display Name")}
                        error={displayName}
                        onChange={this.onChange}
                    />
                    <Input
                        name="password"
                        label={t("Password")}
                        error={password}
                        type="password"
                        onChange={this.onChange}
                    />
                    <Input
                        name="passwordRepeat"
                        label={t("Password Repeat")}
                        error={passwordRepeat}
                        type="password"
                        onChange={this.onChange}
                    />
                    <div className="text-center">
                        <ButtonWithProgress
                            onClick={this.onClickSingup}
                            disabled={pendingApiCall || passwordRepeat !== undefined}
                            pendingApiCall={pendingApiCall}
                            text={t('Sign Up')}
                        />
                    </div>

                </form>
            </div>
        )
    }
}

const UserSingupPageWithApiProgressForSignupRequest = withApiProgress(UserSignupPage, '/api/1.0/users');
const UserSingupPageWithApiProgressForAuthRequest = withApiProgress(UserSingupPageWithApiProgressForSignupRequest, '/api/1.0/auth');

const UserSignupPageWithTranslation = withTranslation()(UserSingupPageWithApiProgressForAuthRequest);

export default connect()(UserSignupPageWithTranslation);