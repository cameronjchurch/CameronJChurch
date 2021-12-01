import React, { Component } from 'react';
import { Button, Input, InputGroup, InputGroupAddon } from 'reactstrap';
import AppTableWithFooter from '../common/AppTableWithFooter';
import NumberFormat from 'react-number-format';
import moment from 'moment';
import axios from 'axios';

export class Bills extends Component {
    constructor(props) {
        super(props);

        this.state = {
            today: moment(),
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
        axios.get('api/Bill?userName=' + this.props.userName).then(response => {
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

    renderAmountCell = (props) => {
        const data = props.cell.row.original;
        return (
            <InputGroup size="sm">
                <InputGroupAddon addonType="prepend">$</InputGroupAddon>
                <Input type="text" onChange={(e) => this.handelAmountChange(e, data.billId)} value={data.amount} className={"w-75"} />
            </InputGroup>
        );
    }

    renderPaidCell = (props) => {
        const data = props.cell.row.original;
        return (
            <Input type="checkbox" checked={data.paid} onChange={() => this.handlePaidChange(data.billId)} disabled={data.billId === 0} />
        );
    }

    renderAmountFooter = () => {
        var total = 0;
        this.state.bills.forEach(b => { total += b.amount; });
        return (
            <span>Total Amount: <NumberFormat value={total} displayType="text" thousandSeparator={true} prefix="$" /></span>
            );
    }

    renderDateCell = (props) => {
        const data = props.cell.row.original;
        return (
            <span>{moment(data.date).format("YYYY-MM-DD")}</span>
        );
    }

    render() {

        const columns = [            
            { Header: 'Name', accessor: 'name' },
            { Header: 'Date', Cell: this.renderDateCell },
            { Header: 'Paid', Cell: this.renderPaidCell },
            { Header: 'Amount', Cell: this.renderAmountCell, Footer: this.renderAmountFooter }            
        ];

        return (
            <div>
                <h3>Bills</h3>
                <h5>{this.state.today.format("LLLL")}</h5>
                <hr />
                <h5>TODO</h5>
                <ul>
                    <li>Current Month</li>
                    <li>Fix formatting</li>
                    <ul>
                        <li>Add bill</li>
                        <li>Admin</li>                        
                    </ul>
                    <li>History</li>
                </ul>
                <hr />
                <AppTableWithFooter columns={columns} data={this.state.bills} />
                <Button onClick={this.saveChanges}>Save</Button>
            </div>
        );
    }
}