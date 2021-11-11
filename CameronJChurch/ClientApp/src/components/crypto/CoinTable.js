import React, { Fragment } from 'react';
import { Input, InputGroup, InputGroupAddon, Spinner } from 'reactstrap';
import AppTableWithFooter from '../common/AppTableWithFooter';
import NumberFormat from 'react-number-format';

const CoinTable = (props) => {
    const { fetchingData, coins, totalCost, totalValue, handleCostChange, handleAmountChange, handleBlur } = props;

    const renderNameCell = (cellprops) => {
        const data = cellprops.cell.row.original;
        return (
            <span>{data.coinTemplate.name} ({data.coinTemplate.symbol})</span>
        );
    }

    const renderCostCell = (cellprops) => {
        const data = cellprops.cell.row.original;
        return (
            <InputGroup size="sm">
                <InputGroupAddon addonType="prepend">$</InputGroupAddon>
                <Input type="text" key={['cost', data.coinId].join('_')} onChange={(e) => handleCostChange(e, data.coinId)} value={data.cost} onBlur={(e) => handleBlur(e, data.coinId)} />
            </InputGroup>
        );
    }

    const renderCostFooter = (cellprops) => {
        return (
            <span>Total Cost: <NumberFormat value={totalCost} displayType="text" thousandSeparator={true} prefix="$" /></span>
        );
    }

    const renderAmountCell = (cellprops) => {
        const data = cellprops.cell.row.original;
        return (
            <Input type="text" key={['amount', data.coinId].join('_')} onChange={(e) => handleAmountChange(e, data.coinId)} value={data.amount} onBlur={(e) => handleBlur(e, data.coinId)} bsSize="sm" />
        );
    }

    const renderPriceCell = (cellprops) => {
        const data = cellprops.cell.row.original;
        return (
            <NumberFormat value={data.price} displayType="text" thousandSeparator={true} prefix="$" />
        );
    }

    const renderValueCell = (cellprops) => {
        const data = cellprops.cell.row.original;
        return (
            <NumberFormat value={data.value} displayType="text" thousandSeparator={true} prefix="$" />
        );
    }

    const renderValueFooter = (cellprops) => {
        return (
            <span>Total Value: <NumberFormat value={totalValue} displayType="text" thousandSeparator={true} prefix="$" /></span>
        );
    }

    const columns =
        [
            { Header: 'Name', accessor: 'name', Cell: renderNameCell },
            { Header: 'Cost', accessor: 'cost', Cell: renderCostCell, Footer: renderCostFooter },
            { Header: 'Amount', accessor: 'amount', Cell: renderAmountCell },
            { Header: 'Price', accessor: 'price', Cell: renderPriceCell },
            { Header: 'Value', accessor: 'value', Cell: renderValueCell, Footer: renderValueFooter }
        ];

    return (
        <Fragment>{fetchingData ? <div className="center"><Spinner /></div> : <AppTableWithFooter columns={columns} data={coins} />}</Fragment>
        );
}

export default CoinTable;