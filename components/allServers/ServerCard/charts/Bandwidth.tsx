import { useState, useEffect } from "react";
import { Line } from 'react-chartjs-2';
import { Plugin, Chart, Title, Tooltip, Legend } from 'chart.js';
import { Filler } from "chart.js";

import {
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
} from 'chart.js';

Chart.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

const Bandwidth = ({ serverData }) => {

    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [
            {
                label: 'Bandwidth',
                data: [],
                backgroundColor: 'rgba(30, 192, 135, 0.5)',
                borderColor: 'rgba(30, 192, 135, 0.5)',
                fill: true,
            }
        ],
    });

    const [chartOptions, setChartOptions] = useState({

        plugins: {
            legend: {
                position: 'top' as 'top',
            },
            title: {
                display: true,
                text: 'Bandwidth',
            },
            zoom: {
                pan: {
                    enabled: true,
                    mode: 'xy' as Mode,
                },
                zoom: {
                    mode: 'xy',
                    scaleMode: 'xy',
                    wheel: {
                        enabled: true
                    }
                },
            },
        },
        scales: {
            y: {
                suggestedMin: 0,
                suggestedMax: 100
            }
        },
        responsive: true
    });

    useEffect(() => {
        if (serverData && serverData.length > 0) {
            const networkData = [];
            const timestamps = [];
            serverData.forEach((server) => {
                server.metrics.forEach((metric) => {
                    const timestamp = metric.timestamp * 1000;
                    metric.metricsValues.forEach((value) => {
                        if (value.name === 'audioTracks') {
                            networkData.push(value.value);
                            timestamps.push(timestamp);
                        }
                    });
                });
            });
            setChartData((prevState) => ({
                ...prevState,
                labels: timestamps.map((timestamp) => new Date(timestamp).toLocaleTimeString()),
                datasets: [
                    {
                        ...prevState.datasets[0],
                        data: networkData,
                    },
                ],
            }));
        }
    }, [serverData]);

    useEffect(() => {
        import('chartjs-plugin-zoom').then((zoomPlugin) => {
            Chart.register(zoomPlugin.default);
        });
        setChartOptions((prevState) => ({
            ...prevState,
            plugins: {
                ...prevState.plugins,
            },
        }));
    }, []);

    return (
            <Line width={500} height={300} data={chartData} options={chartOptions} />
        
    );
};

export default Bandwidth;