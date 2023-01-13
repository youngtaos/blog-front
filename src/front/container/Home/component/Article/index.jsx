import styles from './style.module.scss';
import Item from './Item';




const Article = (props) => {
    const { schema } = props;
    const { children } = schema;
    const { attributes } = schema;

    return (
        <div className={`wrapper ${styles.ArticleWrapper}`}>
            <div className={styles.AreaName}>{attributes?.title}</div>
            <ul className={styles.list}>
                {
                    children.map((item, index) => {
                        const { content, link, picUrl, title } = item?.attribute;
                        return (
                            <Item key={index} content={content} link={link} picUrl={picUrl} title={title} />
                        )
                    }
                    )
                }
            </ul>
        </div>

    )
}

export default Article;