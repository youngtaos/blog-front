import CountDown from '../Countdown';
import styles from './style.module.scss';



const Banner = (props) => {
    const { schema, index } = props;
    const { attributes = {} } = schema;
    const { myName, description, smallPic, showCountdown, showSmallPic, graduationYear, backPic } = attributes;
    const styleObj = backPic ? { backgroundImage: `url(${backPic})` } : {};
    return (
        <div className={`wrapper ${styles.BannerWrapper}`} >
            {showCountdown ? <CountDown graduationYear={graduationYear || 2024} /> : null}
            <div className={styles.Banner} style={styleObj}>


                <div className={styles.Content}>
                    {showSmallPic && smallPic ? <img className={styles.PersonImg} src={smallPic} alt='图片'></img> : null}
                    <div className={styles.word}>
                        <div className={styles.title}>{myName}</div>
                        <div className={styles.dsc}>
                            {description}
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Banner;