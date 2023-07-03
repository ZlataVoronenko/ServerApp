import styles from './Header.module.css'
import Image from 'next/image';
import Link from "next/link";

const Header = () => {
    return (
        <div className={styles.navbar}>
            <div className={styles.flex}>
                <Link href="/" className={styles.logo}><div>Service Go</div></Link >
                <Link href="/services" className={styles.link}>All services</Link >
                <Link href="/" className={styles.link}>Broken services</Link >
            </div>
            <Link href="/"> <Image src="/person.png" width={40} height={40} alt="person"></Image> </Link >
        </div>
    )
};

export default Header;