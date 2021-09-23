import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { NavMenu } from './NavMenu';

export class Layout extends Component {

    render() {
        const { isAuthenticated, userName } = this.props;

        return (
            <div>
                <NavMenu isAuthenticated={isAuthenticated} userName={userName} />
                <Container>
                    {this.props.children}
                </Container>
            </div>
        );
    }
}
