import styles from "../../styles/Slug.module.css";
import { GraphQLClient, gql } from "graphql-request";

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
    <main className={styles.blog}>
      <img src={post.coverPhoto.url} alt="" className={styles.cover} />
      <div className={styles.title}>
        <img src={post.author.avatar.url} alt="" />
        <div className={styles.authtext}>
          <p>By {post.author.username}</p>
          <p className={styles.date}>{post.datePublished}</p>
        </div>
        <h1>{post.title}</h1>
      </div>
      <div
        className={styles.content}
        dangerouslySetInnerHTML={{ __html: post.content.html }}
      ></div>
    </main>
  );
};

export default BlogPost;
