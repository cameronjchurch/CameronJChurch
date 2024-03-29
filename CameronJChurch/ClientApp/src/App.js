import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import AuthorizeRoute from './components/api-authorization/AuthorizeRoute';
import ApiAuthorizationRoutes from './components/api-authorization/ApiAuthorizationRoutes';
import { ApplicationPaths } from './components/api-authorization/ApiAuthorizationConstants';
import AdminHome from './components/admin/AdminHome';
import { Bills } from './components/bills/Bills';
import { Crypto } from './components/crypto/Crypto';
import GolfHome from './components/golf/GolfHome';
import { ExerciseHome } from './components/exercise/ExerciseHome';
import authService from './components/api-authorization/AuthorizeService'

import './custom.css'

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ready: false,
            isAuthenticated: false,
            userName: null
        };
    }

    componentDidMount() {
        this._subscription = authService.subscribe(() => this.authenticationChanged());
        this.populateState();
    }

    componentWillUnmount() {
        authService.unsubscribe(this._subscription);
    }

    async populateState() {
        const [authenticated, user] = await Promise.all([authService.isAuthenticated(), authService.getUser()])
        this.setState({
            ready: true,
            authenticated,
            userName: user && user.name
        });
    }

    async authenticationChanged() {
        this.setState({ ready: false, authenticated: false });
        await this.populateAuthenticationState();
    }

    render() {
        const { ready, authenticated, userName } = this.state;

        return (
            <Layout authenticated={authenticated} userName={userName} >
                <Route exact path='/' component={Home} />
                <AuthorizeRoute path='/bills' component={Bills} ready={ready} authenticated={authenticated} userName={userName} />
                <AuthorizeRoute path='/crypto' component={Crypto} ready={ready} authenticated={authenticated} userName={userName} />
                <AuthorizeRoute path='/exercise' component={ExerciseHome} ready={ready} authenticated={authenticated} userName={userName} />
                <AuthorizeRoute path='/golf' component={GolfHome} ready={ready} authenticated={authenticated} userName={userName} />                
                <Route path={ApplicationPaths.ApiAuthorizationPrefix} component={ApiAuthorizationRoutes} />
                <AuthorizeRoute path='/Admin' component={AdminHome} ready={ready} authenticated={authenticated} userName={userName} />
            </Layout>
        );
    }
}
