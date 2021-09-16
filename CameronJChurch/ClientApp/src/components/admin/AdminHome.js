import React, { useState } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';
import Logs from './Logs';

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
            </Nav>
            <TabContent activeTab={activeTab}>
                <TabPane tabId="1">
                    <Logs />
                </TabPane>
            </TabContent>
        </div>
    );

}

export default AdminHome;