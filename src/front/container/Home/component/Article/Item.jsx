import styles from './style.module.scss';


const Item = (props) => {
    const { index, link, picUrl, title, content } = props;
    return (
        <li key={index}>
            <a href={link}>
                <img alt='img' src={picUrl} alt='请放入图片的正确链接'></img>
                <h2 className={styles.title}>{title || '暂无内容'}</h2>
                <p className={styles.desc}>
                    {content || '暂无内容'}
                </p>
            </a>
        </li>
    )
};

export default Item;