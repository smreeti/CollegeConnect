import React, { useEffect, useState } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import fetchData from '../../utils/FetchAPI';
import { API_TO_FETCH_DATA_FOR_BAR_CHART } from '../../utils/APIRequestUrl';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Posts Summary',
        },
    },
};

export function BarComponent() {
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        fetchDataForBarChart();
    }, []);

    const fetchDataForBarChart = async () => {
        try {
            const response = await fetchData(API_TO_FETCH_DATA_FOR_BAR_CHART, "GET");

            if (response.body) {
                const data = response.body;
                const months = data.map(item => item.month);
                const count = data.map(item => item.count);

                const barChartData = {
                    labels: months,
                    datasets: [
                        {
                            label: 'Bar Chart Data',
                            data: count,
                            backgroundColor: 'rgba(54, 162, 235, 0.2)',
                            borderColor: 'rgba(54, 162, 235, 1)',
                            borderWidth: 1,
                        },
                    ],
                };
                setChartData(barChartData);
            }
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <div className='barchart_main_container'>
            {chartData ? <Bar options={options} data={chartData} /> : <div>Loading...</div>}
        </div>
    )
}
