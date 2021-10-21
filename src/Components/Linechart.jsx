import React from 'react'
import { Line } from 'react-chartjs-2';
import { Box } from '@mui/material';

const Linechart = ({coinHistory, currentPrice, coinName}) => {
    const coinPrice = [];
    const coinTimestamp = [];

    for(let i=0; i < coinHistory?.data?.history?.length; i += 1){
        coinPrice.push(coinHistory.data.history[i].price)
        coinTimestamp.push(new Date(coinHistory.data.history[i].timestamp).toLocaleDateString());
    }

    const data = {
        labels: coinTimestamp,
        datasets: [
            {
                label: 'Price in USD',
                data: coinPrice,
                fill: false,
                backgoundColor: '#0071bd',
                borderColor: '#0071bd',
            }
        ]
    }

    const options = {
        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true
                    }
                }
            ]
        },
        plugins: {
            legend: {
                display: false,
            }
        },
        elements:{
            point: {
                radius: 0
            }
        }
    }

    return (
        <Line data={data} options={options}/>
    )
}

export default Linechart
