import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, Card, CardTitle, InputGroup, InputGroupAddon } from 'reactstrap';
import AppTableWithFooter from '../../common/AppTableWithFooter';
import NumberFormat from 'react-number-format';
const axios = require('axios').default;

export class Crypto extends Component {
    constructor(props) {
        super(props);

        this.state = {
            fetchingData: true,
            coinViewModel: {
                coins: [],
                totalCost: 0,
                totalValue: 0
            },
            newCoinName: '',
            newCoinCost: '',
            newCoinAmount: ''
        }

        this.handleCostChange = this.handleCostChange.bind(this);
        this.handleAmountChange = this.handleAmountChange.bind(this);
    }

    componentDidMount() { this.getCoins(); }

    saveChanges = async (e) => {
        e.preventDefault();
        axios.post('api/Coin', this.state.coinViewModel).then(response => { alert('Coins saved!'); this.getCoins(); });
    }

    newCoin = async (e) => {
        e.preventDefault();        
        this.state.coinViewModel.coins.push({
            name: this.state.newCoinName,
            cost: this.state.newCoinCost,
            amount: this.state.newCoinAmount,
            userName: this.props.userName
        });
        axios.post('api/Coin', this.state.coinViewModel).then(response => { this.getCoins(); });
    }

    getCoins = async (e) => {        
        axios.get('api/Coin?userName=' + this.props.userName).then(response => {
            this.setState({ fetchingData: false, coinViewModel: response.data });
        });
    }

    handleNewCoinNameChange = ({ target: { value } }) => { this.setState({ newCoinName: value }); }
    handleNewCoinCostChange = ({ target: { value } }) => { this.setState({ newCoinCost: value }); }
    handleNewCoinAmountChange = ({ target: { value } }) => { this.setState({ newCoinAmount: value }); }

    handleCostChange(e, coinId) {
        var coin = this.state.coinViewModel.coins.find(c => c.coinId === coinId);
        coin.cost = e.target.value;
        coin.updated = true;
        this.setState({ coinViewModel: this.state.coinViewModel });
    }

    handleAmountChange(e, coinId) {
        var coin = this.state.coinViewModel.coins.find(c => c.coinId === coinId);
        coin.amount = e.target.value;
        coin.updated = true;
        this.setState({ coinViewModel: this.state.coinViewModel });
    }

    renderCostCell = (props) => {
        return (
            <InputGroup className={"w-50"} size="sm">
                <InputGroupAddon addonType="prepend">$</InputGroupAddon>
                <Input type="text" key={props.cell.row.original.coinId} onChange={(e) => this.handleCostChange(e, props.cell.row.original.coinId)} value={props.cell.row.original.cost} />
            </InputGroup>
        );
    }

    renderAmountCell = (props) => {
        return (
            <Input type="text" key={props.cell.row.original.coinId} onChange={(e) => this.handleAmountChange(e, props.cell.row.original.coinId)} value={props.cell.row.original.amount} className={"w-75"} size="sm" />
        );
    }

    renderNameCell = (props) => {
        return (
            <span>{props.cell.row.original.name} ({props.cell.row.original.symbol})</span>
        );
    }

    renderPriceCell = (props) => {
        return (
            <NumberFormat value={props.cell.row.original.price} displayType="text" thousandSeparator={true} prefix="$" />
        );
    }

    renderValueCell = (props) => {
        return (
            <NumberFormat value={props.cell.row.original.value} displayType="text" thousandSeparator={true} prefix="$" />
        );
    }

    renderCostFooter = (props) => {
        return (
            <span>Total Cost: <NumberFormat value={this.state.coinViewModel.totalCost} displayType="text" thousandSeparator={true} prefix="$" /></span>
        );
    }

    renderValueFooter = (props) => {
        return (
            <span>Total Value: <NumberFormat value={this.state.coinViewModel.totalValue} displayType="text" thousandSeparator={true} prefix="$" /></span>
            );
    }

    render() {

        const columns =
            [
                { Header: 'Name', accessor: 'name', Cell: this.renderNameCell },
                { Header: 'Cost', accessor: 'cost', Cell: this.renderCostCell, Footer: this.renderCostFooter },
                { Header: 'Amount', accessor: 'amount', Cell: this.renderAmountCell },
                { Header: 'Price', accessor: 'price', Cell: this.renderPriceCell },
                { Header: 'Value', accessor: 'value', Cell: this.renderValueCell, Footer: this.renderValueFooter }
            ];

        return (
            <div>
                <h3>Crypto</h3>
                <hr />
                <h5>TODO</h5>
                <ul>
                    <li>Spinner</li>
                    <li>Simplify Crypto.js (decompose and cleanup)</li>
                    <li>Graphs react-charts</li>
                </ul>
                <hr />
                <h5>Current Prices (USD)</h5>
                <ul>
                    {this.state.fetchingData ? '' : this.state.coinViewModel.coins.map(coin => {
                        return (
                            <li>{coin.name} ({coin.symbol}) - <NumberFormat value={coin.price} displayType="text" thousandSeparator={true} prefix="$" /></li>
                        )
                    })}
                </ul>
                <hr />
                <AppTableWithFooter columns={columns} data={this.state.coinViewModel.coins} />
                <Button onClick={this.saveChanges}>Save</Button>
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