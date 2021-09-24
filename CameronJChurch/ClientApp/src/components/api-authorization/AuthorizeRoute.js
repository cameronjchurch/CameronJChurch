import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { ApplicationPaths, QueryParameterNames } from './ApiAuthorizationConstants'

const AuthorizeRoute = (props) => {
    const { ready, authenticated, userName } = props;
    var link = document.createElement("a");
    link.href = props.path;
    const returnUrl = `${link.protocol}//${link.host}${link.pathname}${link.search}${link.hash}`;
    const redirectUrl = `${ApplicationPaths.Login}?${QueryParameterNames.ReturnUrl}=${encodeURIComponent(returnUrl)}`
    if (!ready) {
        return <div></div>;
    } else {
        const { component: Component, ...rest } = props;
        return <Route {...rest}
            render={(props) => {
                if (authenticated) {
                    return <Component userName={userName} {...props} />
                } else {
                    return <Redirect to={redirectUrl} />
                }
            }} />
    }

}

export default AuthorizeRoute;
