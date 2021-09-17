import React from 'react';
import Bills from './bills/Bills';
import Crypto from './Crypto';

const FinancesHome = (props) => {

    return (
        <div>
            <h1>Finances</h1>
            <Bills />
            <Crypto />
        </div>
    );
}

export default FinancesHome;