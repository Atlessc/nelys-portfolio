import { useState } from 'react';
import { Link } from 'react-router-dom';
import Client from '../utils/createClient';
import '../styles/home.css';

export default function Gallery() {

  const [posts, setPosts] = useState(null);
    
  Client.getEntries()
  .then((response) => setPosts(response.items))
  .catch(console.error)

  function ScrollToTop() {
    window.scrollTo({top: 0, behavior: 'smooth'});
    return null;
  }

  return (
    <div className="home-gallery">
    {posts ? (
      posts.map((post) => (
        <Link 
          to={`/${post.fields.slug}`} 
          key={post.sys.id} 
          className="home-thumbnail"
          onClick={ScrollToTop}
        >
          <div >
            <img 
              loading='lazy'
              src={post.fields.coverImage.fields.file.url} 
              alt={post.fields.title}
              />
            <h2>{post.fields.title}</h2>
          </div>
        </Link>
      ))
      ) : (
        <p>Loading...</p>
    )}
  </div>
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