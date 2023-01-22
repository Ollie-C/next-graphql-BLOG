import styles from "../styles/Navbar.module.css";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.link}>
        <Link className={styles.header} href="/">
          An Irrelevant Blog
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
