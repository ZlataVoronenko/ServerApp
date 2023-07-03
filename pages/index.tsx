import styles from '../styles/index.module.css';
import Header from '../components/header/Header';
import ServerButton from '../components/allServers/ServerButton/ServerButton';

const Index = () => {
    return (
        <div className={styles.page}>
            <Header/>
            <div className={styles.wrapper}>
                <ServerButton />
            </div>
        </div>
    )
};

export default Index;