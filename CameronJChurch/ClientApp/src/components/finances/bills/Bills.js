import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, Card, CardTitle } from 'reactstrap';
import CJCTable from '../../common/CJCTable';
import authService from '../../api-authorization/AuthorizeService'
const axios = require('axios').default;

export class Bills extends Component {
    constructor(props) {
        super(props);

        this.state = {
            bills: []
        }

        this.handlePaidChange = this.handlePaidChange.bind(this);
        this.handelAmountChange = this.handelAmountChange.bind(this);
    }

    componentDidMount() { this.getBills(); }

    saveChanges = async (e) => {
        e.preventDefault();
        axios.post('api/Bill', this.state.bills).then(response => { alert('Bills saved!'); });
    }

    getBills = async (e) => {
        var user = await authService.getUser();
        axios.get('api/Bill?userName=' + user.name).then(response => {
            this.setState({ bills: response.data });
        });
    }

    handlePaidChange(billId) {
        var bill = this.state.bills.find(b => b.billId === billId);
        bill.paid = !bill.paid;
        this.setState({ bills: this.state.bills });
    }

    handelAmountChange(e, billId) {
        var bill = this.state.bills.find(b => b.billId === billId);
        bill.amount = e.target.value;
        this.setState({ bills: this.state.bills });
    }

    renderAmountCell = (cell) => {
        return (
            <Input type="text" onChange={(e) => this.handelAmountChange(e, cell.row.values.billId)} value={cell.row.values.amount} />
        );
    }

    renderPaidCell = (cell) => {
        return (
            <Input type="checkbox" checked={cell.row.values.paid} onChange={() => this.handlePaidChange(cell.row.values.billId)} disabled={cell.row.values.billId === 0} />
        );
    }

    render() {

        const columns = [
            { Header: 'Id', accessor: 'billId' },
            { Header: 'Name', accessor: 'name' },
            {
                Header: 'Amount', accessor: 'amount', Cell: this.renderAmountCell
            },
            { Header: 'Date', accessor: 'date' },
            {
                Header: 'Paid', accessor: 'paid', Cell: this.renderPaidCell
            },
            { Header: 'Creator', accessor: 'userName' }
        ];

        return (
            <div>
                <h3>Bills</h3>
                <CJCTable columns={columns} data={this.state.bills} />
                <Button onClick={this.saveChanges}>Save</Button>
                <hr />
                <h5>TODO</h5>
                <ul>
                    <li>Current Month</li>
                    <ul>                        
                        <li>Add bill</li>
                        <li>Admin</li>
                    </ul>
                    <li>History</li>
                </ul>
                <hr />

            </div>
        );
    }
}