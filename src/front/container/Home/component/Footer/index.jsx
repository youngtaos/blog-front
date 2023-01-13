import styles from './style.module.scss';

const Footer = () => {
    return (
        <div className={`wrapper ${styles.footer}`}>
            <a href="/admin.html" className={styles.link}>管理我的小站</a>
        </div>


    )
}

export default Footer;