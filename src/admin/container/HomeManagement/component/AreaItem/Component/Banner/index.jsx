import { Input, Switch } from 'antd';
import styles from './style.module.scss';
const { TextArea } = Input;

const defaultAttributes = {
    myName: '鸡杂不下面的小站',
    description: '热爱生活，热爱Coding。',
    smallPic: '',
    showCountdown: true,
    showSmallPic: true,
    graduationYear: 2023
}

const Banner = (props) => {
    const { attributes = defaultAttributes, changeTempPageChildAttributes } = props;
    const { myName, description, showSmallPic, smallPic, backPic, showCountdown, graduationYear } = attributes;

    const handleShowSmallPicChange = (checked) => {
        if (!checked) {
            changeTempPageChildAttributes({
                showSmallPic: checked,
                smallPic: ''
            })
        } else {
            changeTempPageChildAttributes({
                showSmallPic: checked,
                smallPic: smallPic
            })
        }
    }
    return (
        <div>
            <div className={styles.row}>
                <span className={styles.label}>小站名字</span>
                <Input
                    value={myName}
                    className={styles.content}
                    placeholder="请输入小站名字"
                    onChange={(e) => { changeTempPageChildAttributes({ myName: e.target.value }) }}
                />
            </div>
            <div className={styles.row}>
                <span className={styles.label}>小站简介</span>
                <TextArea
                    value={description}
                    className={styles.content}
                    rows={2}
                    placeholder="请输入小站简介"
                    onChange={(e) => { changeTempPageChildAttributes({ description: e.target.value }) }}
                />
            </div>
            <div className={styles.row}>
                <span className={styles.label}>背景图片</span>
                <Input
                    value={backPic}
                    className={styles.content}
                    placeholder="请输入背景图片链接"
                    onChange={(e) => { changeTempPageChildAttributes({ backPic: e.target.value }) }}
                />
            </div>
            <div className={styles.row}>
                <span className={styles.label}>大学毕业时间</span>
                <Input
                    value={graduationYear}
                    className={styles.content}
                    placeholder="请输入毕业年份如：2024"
                    onChange={(e) => { changeTempPageChildAttributes({ graduationYear: e.target.value }) }}
                />
            </div>
            <div className={styles.row}>
                <span className={styles.label}>展示倒计时</span>
                <Switch checked={showCountdown} onChange={(checked) => { changeTempPageChildAttributes({ showCountdown: checked }) }} />
            </div>
            <div className={styles.row}>
                <span className={styles.label}>展示头像</span>
                <Switch checked={showSmallPic} onChange={handleShowSmallPicChange} />
            </div>
            {showSmallPic ? (<div className={styles.row}>
                <span className={styles.label}>头像图片</span>
                <Input
                    value={smallPic}
                    className={styles.content}
                    placeholder="请输入头像图片链接"
                    onChange={(e) => { changeTempPageChildAttributes({ smallPic: e.target.value }) }}
                />
            </div>) : null}

        </div>
    )
}


export default Banner; 