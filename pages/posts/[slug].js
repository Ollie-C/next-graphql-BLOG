import styles from "../../styles/Slug.module.css";
import Navbar from "@/components/Navbar";
import { GraphQLClient, gql } from "graphql-request";
import Link from "next/link";

const hygraph = new GraphQLClient(
  "https://api-eu-west-2.hygraph.com/v2/cld64i9hl1ki701um7dx93ih0/master"
);

const QUERY = gql`
  query Post($slug: String!) {
    post(where: { slug: $slug }) {
      id
      title
      slug
      datePublished
      author {
        id
        username
        avatar {
          url
        }
      }
      content {
        html
      }
      coverPhoto {
        id
        url
      }
    }
  }
`;

const SLUGLIST = gql`
  {
    posts {
      slug
    }
  }
`;

export async function getStaticPaths() {
  const { posts } = await hygraph.request(SLUGLIST);
  return {
    paths: posts.map((post) => ({ params: { slug: post.slug } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const slug = params.slug;
  const data = await hygraph.request(QUERY, { slug });
  const post = data.post;
  return {
    props: {
      post,
    },
  };
}

const BlogPost = ({ post }) => {
  return (
    <>
      <Navbar />
      <main className={styles.blog}>
        <img src={post.coverPhoto.url} alt="" className={styles.cover} />
        <div className={styles.title}>
          <div className={styles.authtext}>
            <img src={post.author.avatar.url} alt="" />
            <p>By {post.author.username}</p>
            <p className={styles.date}>{post.datePublished}</p>
          </div>
          <h1>{post.title}</h1>
        </div>
        <div
          className={styles.content}
          dangerouslySetInnerHTML={{ __html: post.content.html }}
        ></div>
        <Link classname={styles.link} href="/">
          back
        </Link>
      </main>
    </>
  );
};

export default BlogPost;
