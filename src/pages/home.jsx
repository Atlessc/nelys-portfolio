import { useEffect, useState } from 'react';
import { createClient } from 'contentful';
import { Link } from 'react-router-dom';
import '../styles/home.css';

const client = createClient({
  space: import.meta.env.VITE_CONTENTFUL_SPACE_ID,
  environment: import.meta.env.VITE_CONTENTFUL_ENVIRONMENT,
  accessToken: import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN,
});

export default function Home() {


    const [posts, setPosts] = useState(null);
    
    client.getEntries()
    .then((response) => setPosts(response.items))
    .catch(console.error)

  
  return (
    <>
      <div className="home">
        <div className="home-content">
          <h1 className="home-title">[NAME]</h1>
          <h2 className="home-subtitle">[SUBTITLE]</h2>
          <div className="home-gallery">
          {posts ? (
        posts.map((post) => (
          <div key={post.sys.id} className="post-thumbnail">
            <Link to={`/projects/${post.fields.slug}`}>
              <img src={post.fields.coverImage.fields.file.url} alt={post.fields.title} />
              <h2>{post.fields.title}</h2>
            </Link>
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}
            </div>
        </div>
      </div>
    </>
  )
}

const query = `#graphql
{
  postCollection {
    items {
      title
      slug
      date
      coverImage {
        title
        description
        contentType
        fileName
        size
        url
        width
        height
      }
    }
  }
}
`;