import styles from './ServerButton.module.css';

const ServerItems = () => {
    return (
        <div className={styles.flexWrapper}>
            <div className={styles.flexBtn}>
                <div className={styles.btn}>Name</div>
                <div className={styles.flexBtnSmall}>
                    <div className={styles.btn}>Look status</div>
                    <div className={styles.btn}>Check work</div>
                </div>
            </div>
        </div>
    )
};

export default ServerItems;