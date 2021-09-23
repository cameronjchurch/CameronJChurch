import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import AuthorizeRoute from './components/api-authorization/AuthorizeRoute';
import ApiAuthorizationRoutes from './components/api-authorization/ApiAuthorizationRoutes';
import { ApplicationPaths } from './components/api-authorization/ApiAuthorizationConstants';
import AdminHome from './components/admin/AdminHome';
import FinancesHome from './components/finances/FinancesHome';
import authService from './components/api-authorization/AuthorizeService'

import './custom.css'

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isAuthenticated: false,
            userName: null
        };
    }

    componentDidMount() {
        this._subscription = authService.subscribe(() => this.populateState());
        this.populateState();
    }

    componentWillUnmount() {
        authService.unsubscribe(this._subscription);
    }

    async populateState() {
        const [isAuthenticated, user] = await Promise.all([authService.isAuthenticated(), authService.getUser()])
        this.setState({
            isAuthenticated,
            userName: user && user.name
        });
    }

    render() {
        const { isAuthenticated, userName } = this.state;

        return (
            <Layout isAuthenticated={isAuthenticated} userName={userName} >
                <Route exact path='/' component={Home} />
                <AuthorizeRoute path='/finances' component={FinancesHome} isAuthenticated={isAuthenticated} userName={userName} />
                <Route path={ApplicationPaths.ApiAuthorizationPrefix} component={ApiAuthorizationRoutes} />
                <AuthorizeRoute path='/Admin' component={AdminHome} isAuthenticated={isAuthenticated} userName={userName} />
            </Layout>
        );
    }
}
