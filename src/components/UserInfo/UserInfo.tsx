import styles from './UserInfo.module.scss'

export default function UserInfo() {
    return (
        <div className={styles.user_info}>
            <div className={styles.logo}>AL</div>
            <div className={styles.details}>
                <h4 className={styles.name}>Abhishek Lohia</h4>
                <p className={styles.type}>User</p>
            </div>
        </div>
    )
}
