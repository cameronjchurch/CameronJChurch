import React from 'react';
import { BillTemplate } from './BillTemplate';

const Bills = (props) => {

    return (
        <div>
            <h1>Bills</h1>
            <ul>
                <li>Bill Template</li>
                <li>Current Month</li>
                <ul>
                    <li>Enter Amount</li>
                    <li>Add temp bill</li>
                </ul>
                <li>History</li>
            </ul>
            <BillTemplate />
        </div>
    );
}

export default Bills;