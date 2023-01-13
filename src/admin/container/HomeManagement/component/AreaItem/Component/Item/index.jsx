import { Input } from 'antd';
import styles from './style.module.scss';
import { cloneDeep } from 'lodash';
import { SortableElement } from 'react-sortable-hoc';


const { TextArea } = Input;


const Item = (props) => {
    const { value: index, title, content, picUrl, link, children, changeTempPageChildChildren } = props;
    const DeleteItemFromChildren = (index) => {
        const newChildren = [...children];
        newChildren.splice(index, 1);
        changeTempPageChildChildren(newChildren);
    }

    const changeChildrenItem = (index, key, value) => {

        const originItem = children[index];
        const item = cloneDeep(originItem);
        (!item.attribute) && (item.attribute = {});
        item.attribute[key] = value;
        const newChildren = cloneDeep(children);
        newChildren.splice(index, 1, item);
        changeTempPageChildChildren(newChildren);
    }

    return (
        <div className={styles.area} key={index}>
            <div className={styles.delete} onClick={() => DeleteItemFromChildren(index)}>X</div>
            <div className={styles.row}>
                <span className={styles.label}>区块名字</span>
                <Input
                    value={title}
                    className={styles.content}
                    placeholder="请输入区块名字"
                    onChange={(e) => { changeChildrenItem(index, 'title', e.target.value) }}
                />
            </div>
            <div className={styles.row}>
                <span className={styles.label}>区块说明</span>
                <TextArea
                    value={content}
                    className={styles.content}
                    rows={2}
                    placeholder="请输入区块说明"
                    onChange={(e) => { changeChildrenItem(index, 'content', e.target.value) }}
                />
            </div>
            <div className={styles.row}>
                <span className={styles.label}>区块图片</span>
                <Input
                    value={picUrl}
                    className={styles.content}
                    placeholder="请输入区块图片链接"
                    onChange={(e) => { changeChildrenItem(index, 'picUrl', e.target.value) }}
                />
            </div>
            <div className={styles.row}>
                <span className={styles.label}>区块链接</span>
                <Input
                    value={link}
                    className={styles.content}
                    placeholder="请输入区块链接"
                    onChange={(e) => { changeChildrenItem(index, 'link', e.target.value) }}
                />
            </div>
        </div>
    )
}

export default SortableElement(Item);