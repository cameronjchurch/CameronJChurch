import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, Card, CardTitle } from 'reactstrap';
import CJCTable from '../common/CJCTable';
import authService from '../api-authorization/AuthorizeService'
const axios = require('axios').default;

export class Crypto extends Component {
    constructor(props) {
        super(props);

        this.state = {
            fetchingData: true,
            coins: [],
            newCoinName: '',
            newCoinCost: '',
            newCoinAmount: ''
        }
    }

    componentDidMount() { this.getCoins(); }

    saveChanges = async (e) => {
        e.preventDefault();
        axios.post('api/Coin', this.state.coins).then(response => { alert('Coins saved!'); this.getCoins(); });
    }

    getCoins = async (e) => {
        var user = await authService.getUser();
        axios.get('api/Coin?userName=' + user.name).then(response => {
            this.setState({ fetchingData: false, coins: response.data });
        });
    }

    handleNewCoinNameChange = ({ target: { value } }) => { this.setState({ newCoinName: value }); }
    handleNewCoinCostChange = ({ target: { value } }) => { this.setState({ newCoinCost: value }); }
    handleNewCoinAmountChange = ({ target: { value } }) => { this.setState({ newCoinAmount: value }); }

    newCoin = async (e) => {
        e.preventDefault();
        var user = await authService.getUser();
        this.state.coins.push({
            name: this.state.newCoinName,
            cost: this.state.newCoinCost,
            amount: this.state.newCoinAmount,
            userName: user.name
        });
        axios.post('api/Coin', this.state.coins).then(response => { alert('Coins saved!'); this.getCoins(); });
    }

    render() {

        const columns =
            [
                { Header: 'Id', accessor: 'coinId' },
                { Header: 'Name', accessor: 'name' },
                { Header: 'Cost', accessor: 'cost' },
                { Header: 'Amount', accessor: 'amount' },
                { Header: 'Price', accessor: 'price' },
                { Header: 'Value', accessor: 'value' }                
            ];

        return (
            <div>
                <h3>Crypto</h3>                
                <hr />
                <h5>TODO</h5>
                <ul>
                    <li>Fix formatting</li>
                    <li>Input</li>
                    <li>History tracking?</li>
                </ul>
                <hr />
                <h5>Current Prices (USD)</h5>
                <ul>
                    {this.state.fetchingData ? '' : this.state.coins.map(coin => {
                        return (
                            <li>{coin.name} - ${coin.price}</li>
                        )
                    })}
                </ul>
                <hr />
                <CJCTable columns={columns} data={this.state.coins} />
                <hr />
                <Card outline color="secondary" style={{ margin: "17px", padding: "17px" }}>
                    <CardTitle tag="h5">New Asset</CardTitle>
                    <Form onSubmit={this.newCoin}>
                        <FormGroup>
                            <Label for="name">Name</Label>
                            <Input type="text" name="name" id="name" onChange={this.handleNewCoinNameChange} placeholder="Name" />
                            <Label for="day">Cost</Label>
                            <Input type="text" name="cost" id="cost" onChange={this.handleNewCoinCostChange} placeholder="Cost" />
                            <Label for="amount">Amount</Label>
                            <Input type="text" name="amount" id="amount" onChange={this.handleNewCoinAmountChange} placeholder="Amount" />
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