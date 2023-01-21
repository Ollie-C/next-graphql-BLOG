import Link from "next/link";
import styles from "../styles/BlogCard.module.css";

const BlogPost = ({ title, author, coverPhoto, datePublished, slug }) => {
  return (
    <article className={styles.card}>
      <Link href={"/posts/" + slug}>
        <div className={styles.imgContainer}>
          <img src={coverPhoto.url} alt="" />
        </div>
      </Link>
      <div className={styles.header}>
        <h1>{title}</h1>
        <div className={styles.details}>
          <div className={styles.author}>
            <img src={author.avatar.url} alt="" />
            <h3>{author.username}</h3>
          </div>
          <div className={styles.date}>
            <h3>{datePublished}</h3>
          </div>
        </div>
      </div>
    </article>
  );
};

export default BlogPost;
