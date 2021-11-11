import React from 'react';
import { Line, defaults } from 'react-chartjs-2';
import moment from 'moment';

defaults.color = 'whitesmoke';
defaults.borderColor = 'whitesmoke';

const CoinTotalChart = (props) => {
    const { chartData } = props;

    const cost = chartData ? chartData.map(c => ({ x: moment(c.createdDate).format("YYYY-MM-DD"), y: c.totalCost })) : [];
    const value = chartData ? chartData.map(c => ({ x: moment(c.createdDate).format("YYYY-MM-DD"), y: c.totalValue })) : [];

    const data = (canvas) => {
        const ctx = canvas.getContext('2d');
        const gradient = ctx.createLinearGradient(0, 0, 0, 200);
        gradient.addColorStop(0, 'rgba(0, 200, 0, 0.5)');
        gradient.addColorStop(1, 'rgba(0, 200, 0, 0)');

        return {
            datasets: [{
                label: 'Cost',
                data: cost,
                backgroundColor: 'rgba(200, 200, 0, 0.5)',
                borderColor: 'rgba(200, 200, 0, 0.5)',
                fill: true
            }, {
                label: 'Value',
                data: value,
                backgroundColor: gradient,
                borderColor: 'rgba(0, 200, 0, 0.5)',
                fill: true
            }]
        }
    }

    return (
        <div style={{ backgroundColor: '#343a40' }}>
            <Line
                data={data}
                height={200}
                width={600}
                options={{
                    responsive: true,
                    maintainAspectRation: true,
                    layout: {
                        padding: {
                            top: 5,
                            left: 15,
                            right: 15,
                            bottom: 15
                        }
                    },
                    //scales: {
                    //    y: {
                    //        suggestedMin: 500,
                    //        suggestedMax: 5000
                    //    }
                    //}
                }}
            />
        </div>
    );
}

export default CoinTotalChart;