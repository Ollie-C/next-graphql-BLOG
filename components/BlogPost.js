import Link from "next/link";
import styles from "../styles/BlogCard.module.css";

const BlogPost = ({ title, author, coverPhoto, datePublished, slug }) => {
  return (
    <div className={styles.card}>
      <Link href={"/posts/" + slug}>
        <h1>{title}</h1>
        <div className={styles.imgContainer}>
          <img src={coverPhoto.url} alt="" />
        </div>
      </Link>
    </div>
  );
};

export default BlogPost;
