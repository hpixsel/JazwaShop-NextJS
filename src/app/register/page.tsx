import styles from "/styles/login.module.css"
import Link from "next/link";
import { register } from "@lib/auth"
import { redirect } from "next/navigation";

export default function Login() {
  return (
    <div className={`wrapper ${styles.container}`}>
      <form action={async (formData: FormData) => {
        'use server'
        const res = await register(formData)
        if (res) redirect('/')
      }}
      >
        <label htmlFor="login">Login *</label>
        <input type="text" id="login" name="username" required />
        <label htmlFor="password">Hasło *</label>
        <input type="password" id="password" name="password" required />
        <label htmlFor="confirm">Potwierdź Hasło *</label>
        <input type="password" id="confirm" name="passwordConfirm" required />
        <label htmlFor="email" className={styles.split}>Email *</label>
        <input type="email" id="email" name="mail" required />
        <label htmlFor="facebook">Facebook (www.facebook.com/jankowalski)</label>
        <input type="text" id="facebook" name="facebook" />
        <label htmlFor="number">Numer Telefonu</label>
        <input type="number" id="number" name="number" max={999999999} />

        <p className={styles.information}>Masz już konto? <Link href="/login">Zaloguj się</Link></p>
        <p className={styles.message}>{/* message */}</p>
        <div className={styles.bottom}>
          <input type="submit" value="Zarejestruj" />
        </div>
      </form>
    </div>
  )
}