import { Button, Input } from 'antd';
import { SortableContainer } from 'react-sortable-hoc';
import styles from './style.module.scss';
import Item from '../Item';
const SortableList = SortableContainer(({ children, changeTempPageChildChildren }) => {
    return (
        <ul>
            {children.map((item, index) => {
                const { title, content, picUrl, link } = item.attribute;
                return (
                    <Item title={title} content={content}
                        picUrl={picUrl} link={link} children={children}
                        changeTempPageChildChildren={changeTempPageChildChildren}
                        key={index}
                        index={index}
                        value={index} />
                )
            })}
        </ul>
    );
});
const Article = (props) => {
    const { children = [], changeTempPageChildChildren, attributes, changeTempPageChildAttributes } = props;


    const onSortEnd = ({ oldIndex, newIndex }) => {
        const newChildren = [...children];
        const deleteItem = newChildren[oldIndex];
        newChildren.splice(oldIndex, 1);
        newChildren.splice(newIndex, 0, deleteItem);
        changeTempPageChildChildren(newChildren);
    }

    const addItemToChildren = () => {
        const newChildren = [...children];
        newChildren.push({
            name: 'Item',
            attribute: {
                link: '',
                picUrl: '',
                content: '',
                title: '',
            },
            children: []
        });
        changeTempPageChildChildren(newChildren);
    }

    return (
        <div className={styles.ArticleWrapper}>
            <div className={styles.row}>
                <span className={styles.label}>区域名</span>
                <Input
                    value={attributes?.title}
                    className={styles.content}
                    placeholder="请输入该区域名"
                    onChange={(e) => { changeTempPageChildAttributes({ title: e.target.value }) }}
                />
            </div>
            <Button type='primary' onClick={addItemToChildren} className={styles.Addbtn}>新增区块</Button>
            <SortableList changeTempPageChildChildren={changeTempPageChildChildren} lockAxis='y' distance={10} children={children} onSortEnd={onSortEnd} />
        </div>
    )
}


export default Article; 