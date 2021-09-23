import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, Card, CardTitle } from 'reactstrap';
import AppTable from '../common/AppTable';
import axios from 'axios';

export class CryptoAdmin extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            coins: [],
            newCoinName: '',
            newCoinSymbol: ''
        }

        this.handleBlur = this.handleBlur.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleSymbolChange = this.handleSymbolChange.bind(this);
    }

    componentDidMount() { this.getCoinTemplates(); }

    getCoinTemplates = async (e) => {
        axios.get('api/CoinTemplate').then(response => {
            this.setState({ loading: false, coins: response.data });
        });
    }

    newCoinTemplate = async (e) => {
        e.preventDefault();
        const coinTemplate = {
            name: this.state.newCoinName,
            symbol: this.state.newCoinSymbol
        }

        axios.post('api/CoinTemplate', coinTemplate).then(response => {
            this.setState({
                newCoinName: '',
                newCoinSymbol: ''
            });
            this.getCoinTemplates();
        });
    }

    deleteTemplate = async (e) => {
        e.preventDefault();
        axios.delete('api/CoinTemplate/' + e.target.id).then(response => { this.getCoinTemplates(); });
    }

    handleNewCoinNameChange = ({ target: { value } }) => { this.setState({ newCoinName: value }); }
    handleNewCoinSymbolChange = ({ target: { value } }) => { this.setState({ newCoinSymbol: value }); }

    handleBlur(e, coinTemplateId) {
        if (!e.currentTarget.contains(e.relatedTarget)) {
            // focus is leaving the container so do something interesting here
            var coinTemplate = this.state.coins.find(c => c.coinTemplateId === coinTemplateId);
            if (coinTemplate.updated) {
                axios.patch('api/CoinTemplate', coinTemplate).then(response => { this.getCoinTemplates(); });
            }
        }
    }

    handleNameChange(e, coinTemplateId) {
        var coin = this.state.coins.find(c => c.coinTemplateId === coinTemplateId);
        coin.name = e.target.value;
        coin.updated = true;
        this.setState({ coins: this.state.coins });
    }

    handleSymbolChange(e, coinTemplateId) {
        var coin = this.state.coins.find(c => c.coinTemplateId === coinTemplateId);
        coin.symbol = e.target.value;
        coin.updated = true;
        this.setState({ coins: this.state.coins });
    }

    renderNameCell = (props) => {
        const data = props.cell.row.original;
        return (
            <Input type="text" onChange={(e) => this.handleNameChange(e, data.coinTemplateId)} value={data.name} onBlur={(e) => this.handleBlur(e, data.coinTemplateId)} bsSize="sm" />
        );
    }

    renderSymbolCell = (props) => {
        const data = props.cell.row.original;
        return (
            <Input type="text" onChange={(e) => this.handleSymbolChange(e, data.coinTemplateId)} value={data.symbol} onBlur={(e) => this.handleBlur(e, data.coinTemplateId)} bsSize="sm" />
        );
    }

    render() {
        const columns =
            [
                { Header: 'CoinTemplateId', accessor: 'coinTemplateId' },
                { Header: 'Name', accessor: 'name', Cell: this.renderNameCell },
                { Header: 'Symbol', accessor: 'symbol', Cell: this.renderSymbolCell },
                { Header: 'Delete', accessor: 'delete', Cell: ({ cell }) => (<Button onClick={this.deleteTemplate} id={cell.row.values.coinTemplateId} className="btn btn-danger btn-rounded btn-sm">Delete</Button>) }
            ];
        return (
            <div>
                <h3>Coin Templates</h3>
                <AppTable columns={columns} data={this.state.coins} />
                <hr />
                <Card outline color="secondary" style={{ margin: "17px", padding: "17px" }}>
                    <CardTitle tag="h5">New Coin</CardTitle>
                    <Form onSubmit={this.newCoinTemplate}>
                        <FormGroup>
                            <Label for="name">Name</Label>
                            <Input type="text" name="name" id="name" onChange={this.handleNewCoinNameChange} placeholder="Name" value={this.state.newCoinName} />
                            <Label for="symbol">Symbol</Label>
                            <Input type="text" name="symbol" id="symbol" onChange={this.handleNewCoinSymbolChange} placeholder="Symbol" value={this.state.newCoinSymbol} />
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