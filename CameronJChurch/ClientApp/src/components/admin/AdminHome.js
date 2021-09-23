import React, { useState } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';
import Logs from './Logs';
import { BillAdmin } from './BillAdmin';
import { CryptoAdmin } from './CryptoAdmin';

const AdminHome = (props) => {

    const [activeTab, setActiveTab] = useState('1');

    const toggle = tab => {
        if (activeTab !== tab)
            setActiveTab(tab);
    }

    return (
        <div>
            <h1>Admin</h1>
            <Nav tabs>
                <NavItem>
                    <NavLink className={classnames({ active: activeTab === '1' })} onClick={() => { toggle('1'); }} style={{ color: "Grey" }}>
                        Logs
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink className={classnames({ active: activeTab === '2' })} onClick={() => { toggle('2'); }} style={{ color: "Grey" }}>
                        Bills
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink className={classnames({ active: activeTab === '3' })} onClick={() => { toggle('3'); }} style={{ color: "Grey" }}>
                        Crypto
                    </NavLink>
                </NavItem>
            </Nav>
            <TabContent activeTab={activeTab}>
                <TabPane tabId="1">
                    <Logs />
                </TabPane>
                <TabPane tabId="2">
                    <BillAdmin />
                </TabPane>
                <TabPane tabId="3">
                    <CryptoAdmin />
                </TabPane>
            </TabContent>
        </div>
    );

}

export default AdminHome;