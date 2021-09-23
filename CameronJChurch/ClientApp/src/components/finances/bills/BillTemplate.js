import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, Card, CardTitle } from 'reactstrap';
import AppTable from '../../common/AppTable';
import authService from '../../api-authorization/AuthorizeService'
const axios = require('axios').default;

export class BillTemplate extends Component {
    constructor(props) {
        super(props);

        this.state = {
            billTemplates: [],
            name: '',
            day: '',
            amount: ''
        }
    }

    componentDidMount() { this.getBillTemplates(); }

    getBillTemplates = async (e) => {
        axios.get('api/BillTemplate?userName=' + this.props.userName).then(response => {
            this.setState({ billTemplates: response.data });
        });
    }

    newTemplate = async (e) => {
        e.preventDefault();
        axios.post('api/BillTemplate',
            {
                name: this.state.name,
                day: this.state.day,
                amount: this.state.amount,
                userName: this.props.userName
            })
            .then(response => {
            this.getBillTemplates();
        });
    }

    deleteTemplate = async (e) => {
        e.preventDefault();
        axios.delete('api/BillTemplate/' + e.target.id).then(response => { this.getBillTemplates(); });
    }

    handleNameChange = ({ target: { value } }) => { this.setState({ name: value }); }

    handelDayChange = ({ target: { value } }) => { this.setState({ day: value }); }

    handleAmountChange = ({ target: { value } }) => { this.setState({ amount: value }); }

    render() {
        const columns =
            [
                { Header: 'Id', accessor: 'billTemplateId' },
                { Header: 'Name', accessor: 'name' },
                { Header: 'Day', accessor: 'day' },
                { Header: 'Amount', accessor: 'amount' },
                { Header: 'Creator', accessor: 'userName' },
                { Header: 'Delete', accessor: 'delete', Cell: ({ cell }) => (<Button onClick={this.deleteTemplate} id={cell.row.values.billTemplateId} className="btn btn-danger btn-rounded btn-sm">Delete</Button>) }
            ];

        return (
            <div>
                <h3>Bill Templates</h3>
                <AppTable columns={columns} data={this.state.billTemplates} />
                <Card outline color="secondary" style={{ margin: "17px", padding: "17px" }}>
                    <CardTitle tag="h5">New Template</CardTitle>
                    <Form onSubmit={this.newTemplate}>
                        <FormGroup>
                            <Label for="name">Name</Label>
                            <Input type="text" name="name" id="name" onChange={this.handleNameChange} placeholder="Name" />
                            <Label for="day">Bill Day</Label>
                            <Input type="text" name="day" id="day" onChange={this.handelDayChange} placeholder="Day" />
                            <Label for="amount">Amount</Label>
                            <Input type="text" name="amount" id="amount" onChange={this.handleAmountChange} placeholder="Amount" />
                        </FormGroup>
                        <FormGroup>
                            <Button>Save</Button>
                        </FormGroup>
                    </Form>
                </Card>
            </div>
        );
    }
}