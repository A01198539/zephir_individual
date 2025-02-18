import Link from "next/link"
import styles from "./home.module.css"

export default function HomePage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Welcome to your Home Page!</h1>
      <p className={styles.subtitle}>You have successfully logged in.</p>
      <Link href="/" className={styles.button}>
        Log out
      </Link>
    </div>
  )
}