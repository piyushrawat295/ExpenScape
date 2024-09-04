import { SignUp } from '@clerk/nextjs';
import styles from './SignUp.module.css'; // Import your CSS module

export default function SignUpPage() {
  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <SignUp />
      </div>
    </div>
  );
}
