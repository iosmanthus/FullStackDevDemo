import styles from './index.css';


export default function() {
  return (
    <div className={styles.normal}>
      <div className={styles.welcome} />
      <ul className={styles.list}>
        <li>
          To get started read the navigation bar.
        </li>
        <li>
          <a href="/edit">
            Getting Started
          </a>
        </li>
      </ul>
    </div>
  );
}
