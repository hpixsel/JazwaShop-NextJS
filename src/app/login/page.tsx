import styles from "/styles/login.module.css"
import Link from "next/link"
import { login } from '@lib/auth'
import { redirect } from "next/navigation"

export default function Login() {
    return (
        <div className={`wrapper ${styles.container}`}>
            <form action={async (formData) => {
                'use server'
                const res = await login(formData)
                if (res) redirect('/')
            }}
            >
                <label htmlFor="login">Login</label>
                <input
                    type="text"
                    id="login"
                    name="login"
                />
                <label htmlFor="password">Hasło</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                />
                <p className={styles.information}>Nie masz jeszcze konta? <Link href="/register">Zarejestruj się</Link></p>
                <p className={styles.message}>{/* message */}</p>

                <div className={styles.bottom}>
                    <input type="submit" value="Zaloguj" />
                </div>
            </form>
        </div>
    )
}
