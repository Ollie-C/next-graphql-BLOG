import Head from "next/head";
import styles from "@/styles/Home.module.css";
import { GraphQLClient, gql } from "graphql-request";
import BlogPost from "@/components/BlogPost";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const hygraph = new GraphQLClient(
  "https://api-eu-west-2.hygraph.com/v2/cld64i9hl1ki701um7dx93ih0/master"
);

const QUERY = gql`
  {
    posts {
      id
      title
      datePublished
      slug
      content {
        html
      }
      author {
        username
        avatar {
          url
        }
      }
      coverPhoto {
        publishedAt
        publishedBy {
          createdAt
        }
        url
      }
    }
  }
`;

export async function getStaticProps() {
  const { posts } = await hygraph.request(QUERY);
  return {
    props: {
      posts,
    },
  };
}

const Home = ({ posts }) => {
  return (
    <>
      <Head>
        <title>An Irrelevant Blog</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main className={styles.main}>
        {posts.map((post) => (
          <BlogPost
            title={post.title}
            author={post.author}
            coverPhoto={post.coverPhoto}
            key={post.id}
            datePublished={post.datePublished}
            slug={post.slug}
          />
        ))}
        <Footer />
      </main>
    </>
  );
};

export default Home;
