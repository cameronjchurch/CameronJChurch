import React, { useState } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';
import { Bills } from './bills/Bills';
import { BillTemplate } from './bills/BillTemplate';
import { Crypto } from './crypto/Crypto';
import { User } from 'oidc-client';

const FinancesHome = (props) => {
    const { isAuthenticated, userName } = props;
    const [activeTab, setActiveTab] = useState('1');

    const toggle = tab => {
        if (activeTab !== tab)
            setActiveTab(tab);
    }

    return (
        <div>
            <h1>Finances</h1>
            <Nav tabs>
                <NavItem>
                    <NavLink className={classnames({ active: activeTab === '1' })} onClick={() => { toggle('1'); }} style={{ color: "Gray" }}>Crypto</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink className={classnames({ active: activeTab === '2' })} onClick={() => { toggle('2'); }} style={{ color: "Gray" }}>Bills</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink className={classnames({ active: activeTab === '3' })} onClick={() => { toggle('3'); }} style={{ color: "Gray" }}>Bill Templates</NavLink>
                </NavItem>
            </Nav>
            <TabContent activeTab={activeTab}>
                <TabPane tabId='1'>
                    <Crypto userName={userName} />
                </TabPane>
                <TabPane tabId='2'>
                    <Bills userName={userName} />
                </TabPane>
                <TabPane tabId='3'>
                    <BillTemplate userName={userName} />
                </TabPane>
            </TabContent>
        </div>
    );
}

export default FinancesHome;