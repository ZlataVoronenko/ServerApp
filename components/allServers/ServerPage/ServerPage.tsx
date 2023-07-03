import React, { useEffect, useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Provider } from 'react-redux';
import store from '@/state/store/index';
import { receiveServerData } from '@/state/actions/serverDataActions';
import { DataContext, DataProvider } from '@/state/store/DataContext';
import Header from '@/components/header/Header';
import ServerCard from '@/components/allServers/ServerCard/ServerCard';
import Overview from '@/components/allServers/Dashboard/overview/Overview';
import MainStates from '@/components/allServers/Dashboard/mainStates/MainStates';
import styles from './ServerPage.module.css';

const API_URL = 'http://95.163.210.201:9100/metrics';


const ServerPage = ({ serversData }) => {
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const serverData = useSelector((state: { serverData: any }) => state.serverData);

    const fetchData = async () => {
        try {
            const response = await fetch(API_URL);
            const data = await response.json();

            dispatch(receiveServerData(data));
            setLoading(false);
        } catch (error) {
            console.log('Ошибка при получении данных:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        const fetchDataAndSetInterval = async () => {
            await fetchData();

            const intervalId = setInterval(fetchData, 10000);
            return () => clearInterval(intervalId);
        };

        fetchDataAndSetInterval();
    }, []);

    const contextData = useContext(DataContext);

    const calculateRoomsValue = () => {
        if (contextData) {
            const server = contextData.find((data) => data.serverAddress === serverData.serverAddress);
            if (server) {
                return server.metrics.reduce((accumulator, metric) => {
                    const errorsMetric = metric.metricsValues.find((m) => m.name === 'rooms');
                    return accumulator + (errorsMetric ? errorsMetric.value : 0);
                }, 0);
            }
        }
        return 0;
    };
    const totalRooms = calculateRoomsValue();

    const calculateErrorsValue = () => {
        if (contextData) {
            const server = contextData.find((data) => data.serverAddress === serverData.serverAddress);
            if (server) {
                return server.metrics.reduce((accumulator, metric) => {
                    const errorsMetric = metric.metricsValues.find((m) => m.name === 'errors');
                    return accumulator + (errorsMetric ? errorsMetric.value : 0);
                }, 0);
            }
        }
        return 0;
    };
    const totalErrors = calculateErrorsValue();

    const calculateUsersValue = () => {
        if (contextData) {
            const server = contextData.find((data) => data.serverAddress === serverData.serverAddress);
            if (server) {
                return server.metrics.reduce((accumulator, metric) => {
                    const errorsMetric = metric.metricsValues.find((m) => m.name === 'errors');
                    return accumulator + (errorsMetric ? errorsMetric.value : 0);
                }, 0);
            }
        }
        return 0;
    };
    const totalUsers = calculateUsersValue();

    return (
        <Provider store={store}>
            <DataProvider serverData={serverData}>
                <div>
                    <Header />
                    {loading ? (
                        <div className={styles.loader}>
                            <div className={styles.title}>
                                Loading, please wait...
                            </div>
                            <div className={styles.load}></div>
                        </div>
                    ) : (
                        <div className={styles.wrapper}>
                            <div className={styles.container}>
                                <div className={styles.flex}>
                                    <Overview serverData={serverData} />
                                    <MainStates totalRooms={totalRooms} totalErrors={totalErrors} totalUsers={totalUsers} />
                                </div>
                            </div>
                            {serverData &&
                                serverData.map((data) => (
                                    <ServerCard
                                        key={data.serverAddress}
                                        serverData={data}
                                    />
                                ))}
                        </div>
                    )}
                </div>
            </DataProvider>
        </Provider>
    );
};

export default ServerPage;