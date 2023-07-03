import styles from '../mainStates/MainStates.module.css';

const MainStates = ({ totalRooms, totalErrors, totalUsers }) => {

    return (
        <div className={styles.cardCenter}>
            <div className={styles.card}>
                <div className={styles.title}>Main States</div>
                <div className={styles.flex}>
                    <div className={styles.itemRooms}>
                        <div>{totalRooms}</div>
                        <div>rooms</div>
                    </div>
                    <div className={styles.itemUsers}>
                        <div>{totalUsers}</div>
                        <div>users</div>
                    </div>
                    <div className={styles.itemErrors}>
                        <div>{totalErrors}</div>
                        <div>errors</div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default MainStates;