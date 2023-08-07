import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import fetchData from '../../utils/FetchAPI';
import { API_TO_FETCH_DATA_FOR_DOUGNNUT_CHART, API_TO_FETCH_COLLEGE_INFO } from '../../utils/APIRequestUrl';
import { getLoggedInUser } from '../../utils/Auth';

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChartComponent = () => {
    const [chartData, setChartData] = useState(null);
    const [collegeList, setCollegeList] = useState([]);
    const [selectedCollege, setSelectedCollege] = useState(null);
    const loggedInUser = getLoggedInUser();

    useEffect(() => {
        fetchCollegeList();
        fetchDataForDoughnutChart();
    }, [selectedCollege]);

    const fetchCollegeList = async () => {
        try {
            const data = await fetchData(API_TO_FETCH_COLLEGE_INFO, "GET");
            setCollegeList(data.body);
        }
        catch (error) {
            console.log("Error:", error);
        }
    }

    const handleCollegeSelect = async (e) => {
        const selectedCollegeId = e.target.value;
        setSelectedCollege(selectedCollegeId);
    }

    const fetchDataForDoughnutChart = async () => {
        try {
            const req = {
                collegeInfoId: selectedCollege
            }
            const response =
                await fetchData(API_TO_FETCH_DATA_FOR_DOUGNNUT_CHART, "POST", req);

            if (response.message === 200 && response.body) {
                const { totalRegularUsers, totalCollegePosts, totalUserPosts, totalPosts } = response.body;
                const data = {
                    labels: ['Regular Users', 'College Posts', 'User Posts', 'Total Posts'],
                    datasets: [
                        {
                            data: [totalRegularUsers, totalCollegePosts, totalUserPosts, totalPosts],
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(255, 206, 86, 0.2)',
                                'rgba(75, 192, 192, 0.2)',
                            ],
                            borderColor: [
                                'rgba(255, 99, 132, 1)',
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 206, 86, 1)',
                                'rgba(75, 192, 192, 1)',
                            ],
                            borderWidth: 1,
                        },
                    ],
                };
                setChartData(data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: true,
                text: 'Data Summary',
                position: 'top',
                font: {
                    size: 20,
                    weight: 'bold',
                },
            },
            legend: {
                display: true,
                position: 'bottom',
                labels: {
                    font: {
                        size: 14,
                    },
                },
            },
        },
    };

    return (
        <div className='doughnut_main_container'>
            {/* Left Block */}
            <div className='doughnut_left'>
                <h2>CollegeConnect Statistics</h2>
                <p>
                    The Doughnut chart represents an overview of CollegeConnect statistics. It shows the following data:
                </p>

                {loggedInUser?.userTypeId?.code === 'MASTER_ADMIN' ?
                    <div>
                        <label htmlFor="collegeSelect">Select College:</label>
                        <select
                            id="collegeSelect"
                            value={selectedCollege ? selectedCollege._id : ""}
                            onChange={handleCollegeSelect}
                        >
                            <option value="">Select a college</option>
                            {collegeList.map(college => (
                                <option key={college._id} value={college._id}>{college.name}</option>
                            ))}
                        </select>
                    </div> : ''}

                <ul>
                    <li>Total Regular Users</li>
                    <li>Total College Posts</li>
                    <li>Total User Posts</li>
                    <li>Total Posts (combined)</li>
                </ul>
            </div>

            {/* Right Block */}
            <div className='doughnut_right'>
                <div className='doughnut_right_container'>
                    {chartData ? <Doughnut data={chartData} options={chartOptions} /> : <div>Loading...</div>}
                </div>
            </div>
        </div>
    )
}

export default DoughnutChartComponent;