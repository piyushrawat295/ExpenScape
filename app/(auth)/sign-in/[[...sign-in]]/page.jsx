import { SignIn } from '@clerk/nextjs';
import styles from './SignIn.module.css'; // Import your CSS module

export default function SignInPage() {
  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <SignIn />
      </div>
    </div>
  );
}
