import Gallery from '../components/gallery';
import '../styles/home.css';


export default function Home() {
  
  return (
      <div className="home-container">
        <div className="home-content">
          <h1 className="home-title">[NAME]</h1>
          <h2 className="home-subtitle">[SUBTITLE]</h2>
          <Gallery/>
        </div>
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