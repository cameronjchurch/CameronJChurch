import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, Card, CardTitle, InputGroup, InputGroupAddon, Spinner } from 'reactstrap';
import AppTableWithFooter from '../../common/AppTableWithFooter';
import NumberFormat from 'react-number-format';
import Select from 'react-select';
import axios from 'axios';

export class Crypto extends Component {
    constructor(props) {
        super(props);

        this.state = {
            fetchingData: true,
            coinViewModel: {
                coins: [],
                coinNames: [],
                totalCost: 0,
                totalValue: 0
            },
            newCoinName: '',
            newCoinCost: '',
            newCoinAmount: '',
            selectedCoinName: ''
        }

        this.handleCostChange = this.handleCostChange.bind(this);
        this.handleAmountChange = this.handleAmountChange.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
    }

    componentDidMount() { this.getCoins(); }

    newCoin = async (e) => {
        e.preventDefault();
        const coin = {
            name: this.state.newCoinName,
            cost: this.state.newCoinCost,
            amount: this.state.newCoinAmount,
            userName: this.props.userName
        }

        axios.post('api/Coin', coin).then(response => {
            this.setState({
                newCoinName: '',
                newCoinCost: '',
                newCoinAmount: '',
                selectedCoinName: ''
            });
            this.getCoins();
        });
    }

    getCoins = async (e) => {
        axios.get('api/Coin?userName=' + this.props.userName).then(response => {
            this.setState({ fetchingData: false, coinViewModel: response.data });
        });
    }

    handleNewCoinNameChange = ({ target: { value } }) => { this.setState({ newCoinName: value }); }
    handleNewCoinCostChange = ({ target: { value } }) => { this.setState({ newCoinCost: value }); }
    handleNewCoinAmountChange = ({ target: { value } }) => { this.setState({ newCoinAmount: value }); }

    handleSelectedNameChange = (selectedName) => {
        this.setState({ selectedCoinName: selectedName, newCoinName: selectedName.value });
    }

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

    handleBlur(e, coinId) {
        if (!e.currentTarget.contains(e.relatedTarget)) {
            // focus is leaving the container so do something interesting here
            var coin = this.state.coinViewModel.coins.find(c => c.coinId === coinId);
            if (coin.updated) {
                axios.patch('api/Coin', coin).then(response => { this.getCoins(); });
            }
        }
    }

    renderCostCell = (props) => {
        const data = props.cell.row.original;
        return (
            <InputGroup className={"w-50"} size="sm">
                <InputGroupAddon addonType="prepend">$</InputGroupAddon>
                <Input type="text" key={data.coinId} onChange={(e) => this.handleCostChange(e, data.coinId)} value={data.cost} onBlur={(e) => this.handleBlur(e, data.coinId)} />
            </InputGroup>
        );
    }

    renderAmountCell = (props) => {
        const data = props.cell.row.original;
        return (
            <Input type="text" key={data.coinId} onChange={(e) => this.handleAmountChange(e, data.coinId)} value={data.amount} onBlur={(e) => this.handleBlur(e, data.coinId)} className={"w-75"} bsSize="sm" />
        );
    }

    renderNameCell = (props) => {
        const data = props.cell.row.original;
        return (
            <span>{data.name} ({data.symbol})</span>
        );
    }

    renderPriceCell = (props) => {
        const data = props.cell.row.original;
        return (
            <NumberFormat value={data.price} displayType="text" thousandSeparator={true} prefix="$" />
        );
    }

    renderValueCell = (props) => {
        const data = props.cell.row.original;
        return (
            <NumberFormat value={data.value} displayType="text" thousandSeparator={true} prefix="$" />
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
        const coinNames = this.state.coinViewModel.coinNames.map(name => ({ value: name, label: name }));
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
                    <li>Simplify Crypto.js (decompose and cleanup)</li>
                    <li>Graphs react-charts</li>
                    <li>Totals history</li>                    
                    <li>History update trigger</li>
                </ul>
                <hr />
                {this.state.fetchingData ? <div className="center"><Spinner /></div> : <AppTableWithFooter columns={columns} data={this.state.coinViewModel.coins} />}
                <hr />
                <Card outline color="secondary" style={{ margin: "17px", padding: "17px" }}>
                    <CardTitle tag="h5">New Asset</CardTitle>
                    {this.state.fetchingData ? <div className="center"><Spinner /></div> :
                        <Form onSubmit={this.newCoin}>
                            <FormGroup>
                                <Label for="name">Name</Label>
                                {/*<Input type="text" name="name" id="name" onChange={this.handleNewCoinNameChange} placeholder="Name" />*/}
                                <Select options={coinNames} onChange={this.handleSelectedNameChange} value={this.state.selectedCoinName} />
                                <Label for="day">Cost</Label>
                                <Input type="text" name="cost" id="cost" onChange={this.handleNewCoinCostChange} placeholder="Cost" value={this.state.newCoinCost} />
                                <Label for="amount">Amount</Label>
                                <Input type="text" name="amount" id="amount" onChange={this.handleNewCoinAmountChange} placeholder="Amount" value={this.state.newCoinAmount} />
                            </FormGroup>
                            <FormGroup>
                                <Button>Save</Button>
                            </FormGroup>
                        </Form>}
                </Card>
            </div>
        );
    }
}