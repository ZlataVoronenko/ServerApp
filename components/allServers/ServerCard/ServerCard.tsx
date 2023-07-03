import { useContext } from 'react';
import { DataContext } from '@/state/store/DataContext';
import CPU from './charts/CPU';
import Bandwidth from './charts/Bandwidth';
import Ram from './charts/Ram';
import Network from './charts/Network';
import ServerItem from './ServerItem/ServerItem';
import styles from './ServerCard.module.css';

const ServerCard = ({ serverData }) => {
    const contextData = useContext(DataContext);

    const calculateMaxNet = () => {
        let maxNet = 0;
        if (contextData) {
            contextData.forEach((server) => {
                if (server.serverAddress === serverData.serverAddress) {
                    maxNet = server.maxNet;
                }
            });
        }
        return maxNet;
    };

    const maxNet = calculateMaxNet();

    const calculateMaxCPU = () => {
        let maxCPU = 0;
        if (contextData) {
            contextData.forEach((server) => {
                if (server.serverAddress === serverData.serverAddress) {
                    maxCPU = server.maxCPU;
                }
            });
        }
        return maxCPU;
    };

    const maxCPU = calculateMaxCPU();

    const calculateRoomsValue = () => {
        if (contextData) {
            const server = contextData.find((data) => data.serverAddress === serverData.serverAddress);
            if (server) {
                return server.metrics.reduce((accumulator, metric) => {
                    const roomMetric = metric.metricsValues.find((m) => m.name === 'rooms');
                    return accumulator + (roomMetric ? roomMetric.value : 0);
                }, 0);
            }
        }
        return 0;
    };

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

    const calculateUsersValue = () => {
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

    const calculateServerName = () => {
        if (contextData) {
            const server = contextData.find((data) => data.serverAddress === serverData.serverAddress);
            if (server) {
                return server.label;
            }
        }
        return '';
    };

    const roomsValue = calculateRoomsValue();
    const errorsValue = calculateErrorsValue();
    const serverName = calculateServerName();
    const usersValue = calculateUsersValue();


    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <div className={styles.flexContainer}>
                    <div className={styles.flexItem}>
                        {contextData && <ServerItem roomsValue={roomsValue}
                            errorsValue={errorsValue}
                            serverLocation={serverName} usersValue={usersValue} />}
                        <div>
                            <div className={styles.chartFlex}>
                                <div>
                                    {contextData && <Network serverData={contextData} maxNet={maxNet} />}
                                </div>
                                <div>
                                    {contextData && <Ram serverData={contextData} />}
                                </div>
                            </div>
                            <div className={styles.chartFlex}>
                                <div>
                                    {contextData && <Bandwidth serverData={contextData} />}
                                </div>
                                <div>
                                    {contextData && <CPU serverData={contextData} maxCPU={maxCPU} />}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServerCard;