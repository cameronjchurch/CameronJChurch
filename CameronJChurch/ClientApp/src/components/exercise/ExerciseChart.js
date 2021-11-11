import React from 'react';
import { Line, defaults } from 'react-chartjs-2';
import moment from 'moment';

defaults.color = 'whitesmoke';
defaults.borderColor = 'whitesmoke';

const ExerciseChart = (props) => {
    const { chartData } = props;
    const colors = ['rgba(0, 200, 0, 0.5)', 'rgba(200, 200, 0, 0.5)', 'rgba(0, 0, 200, 0.5)', 'rgba(200, 0, 200, 0.5)', 'rgba(200, 0, 0, 0.5)'];

    var datasetValues = [];

    chartData.forEach((c, i) => {
        var colorIndex = i % colors.length;        
        var existingData = datasetValues.find(g => g.label === c.exerciseActivity.exerciseActivityName);
        if (existingData) {
            existingData.data.push({ x: moment(c.date).format("YYYY-MM-DD"), y: (c.count * c.exerciseActivity.count) });
        } else {
            datasetValues.push({
                label: c.exerciseActivity.exerciseActivityName,
                data: [{ x: moment(c.date).format("YYYY-MM-DD"), y: (c.count * c.exerciseActivity.count) }],
                backgroundColor: colors[colorIndex],
                borderColor: colors[colorIndex]
            });
        }
    })

    const data = (canvas) => {
        return {
            datasets: datasetValues
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

export default ExerciseChart;