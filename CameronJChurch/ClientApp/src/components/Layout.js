import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { NavMenu } from './NavMenu';

export class Layout extends Component {

    render() {
        const { authenticated, userName } = this.props;

        return (
            <div>
                <NavMenu authenticated={authenticated} userName={userName} />
                <Container>
                    {this.props.children}
                </Container>
            </div>
        );
    }
}
