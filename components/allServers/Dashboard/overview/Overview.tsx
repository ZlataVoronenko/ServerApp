import React from 'react';
import styles from './Overview.module.css';

const Overview = ({ serverData }) => {

    if (!serverData) {
        return null;
    }
    const uniqueServerAddresses = [...new Set(serverData.map(item => item.serverAddress))];

    const hasErrors = (address) => {
        const server = serverData.find(item => item.serverAddress === address);
        if (server) {
            const metricsWithErrors = server.metrics.filter(metric => {
                const errorsValue = metric.metricsValues.find(m => m.name === 'errors')?.value;
                return errorsValue !== undefined && errorsValue !== null && errorsValue > 0;
            });
            return metricsWithErrors.length > 0;
        }
        return false;
    };

    return (
        <div>
            <div className={styles.card}>
                <div className={styles.title}>Overview</div>
                <div className={styles.flex}>
                    <div className={styles.btn}>
                        <div className={styles.subtitle}>Server</div>
                        {uniqueServerAddresses.map(address => (
                            <div key={String(address)} className={styles.server}>
                                {serverData.find(item => item.serverAddress === address)?.label}
                            </div>
                        ))}
                    </div>
                    <div className={styles.row}>
                        <div className={styles.subtitle}>CPU</div>
                        {uniqueServerAddresses.map(address => (
                            <div key={String(address)} className={styles.circle}></div>
                        ))}
                    </div>
                    <div className={styles.row}>
                        <div className={styles.subtitle}>Network</div>
                        {uniqueServerAddresses.map(address => (
                            <div key={String(address)} className={styles.circle}></div>
                        ))}
                    </div>
                    <div className={styles.row}>
                        <div className={styles.subtitle}>Errors</div>
                        {uniqueServerAddresses.map(address => (
                            <div
                                key={String(address)}
                                className={`${styles.circle} ${hasErrors(address) ? styles.circleRed : ''}`}
                            ></div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Overview;