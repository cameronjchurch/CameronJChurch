import React from 'react';
import { Button, Card, CardBody, UncontrolledCollapse } from 'reactstrap';
import AppTableWithFooter from './AppTableWithFooter';

const PerformanceMonitor = (props) => {
    const { performanceMetrics } = props;
    var total = 0;

    performanceMetrics.forEach(p => { total += p.value; });

    const columns =
        [
            { Header: 'Name', accessor: 'name', Cell: ({ cell }) => (<span>{cell.row.values.name}</span>) },
            {
                Header: 'Value', accessor: 'value', Cell: ({ cell }) => (<span>{cell.row.values.value}ms</span>), Footer: () => (<span>Total: {total}ms</span>)
            }
        ];

    return (
        <div style={{ marginBottom: "1rem" }}>
            <Button color="primary" id="toggler" className="btn-sm" style={{ marginBottom: "1rem" }}>Performance</Button>
            <UncontrolledCollapse toggler="#toggler">
                <Card>
                    <CardBody>
                        <AppTableWithFooter columns={columns} data={performanceMetrics} />
                    </CardBody>
                </Card>
            </UncontrolledCollapse>
        </div>
    );
}

export default PerformanceMonitor;