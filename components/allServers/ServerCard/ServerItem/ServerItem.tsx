import styles from './ServerItem.module.css';

const ServerItem = ({ roomsValue, errorsValue, serverLocation, usersValue}) => {

    return (
        <div className={styles.card}>
            <div className={styles.title}>{serverLocation}</div>
            <div className={styles.flex}>
                <div className={styles.subtitle}>{roomsValue}</div>
                <div className={styles.subtitle}>{usersValue}</div>
                <div className={styles.subtitle}>{errorsValue}</div>
            </div>
            <div className={styles.flex}>
                <div className={styles.btn}>rooms</div>
                <div className={styles.btn}>users</div>
                <div className={styles.btn}>errors</div>
            </div>
        </div>
    )
};

export default ServerItem;