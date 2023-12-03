import styles from './NotFound.module.css'
export default function NotFound() {
    return (
        <div className={styles.body}>
            <div className={styles.container}>
                <h1 className={styles.errorcode}>404</h1>
                <p className={styles.errormessage}>Oops! The page you&apos;re looking for could not be found.</p>
                <a href="/" className={styles.backtohome}>Back to Home</a>
            </div>
        </div>
    )
}