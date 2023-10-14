import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Client from '../utils/createClient';
import Gallery from '../components/gallery';
import '../styles/project.css';

function Project() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [description, setDescription] = useState(null);


  useEffect(() => {
    // Fetch the post data from Contentful
    Client.getEntries({
      'content_type': 'post',
      'fields.slug': id,
      limit: 1
    })
      .then((response) => 
      setProject(response.items[0].fields),
      )
      .catch(console.error);
    }, [id]);



  useEffect(() => {
    setDescription(project?.description.content[0].content[0].value);
  }
  , [project]);
  // Render the post data
  return (
    <div className="project-container">
      <h1 className='project-title'>{project?.title}</h1>
      <p className='project-description'>{description}</p>
      {
        project?.images.map((image, index) => (
          <div className='image-container'>
            <img
              className='project-image'
              key={index}
              src={image.fields.file.url} 
              alt={image.title}
              loading='lazy' 
              style={{
                maxWidth:`${image.fields.file.width}px`,
                maxHeight:`${image.fields.file.height}px`
              }} 
            />
            <p className='image-description'>{image.fields.description}</p>
          </div>
        ))
      }
      <Gallery />
    </div>
  );
}

export default Project;


const query = `#graphql
query PostBySlug($slug: String!) {
  postCollection(where: { slug: $slug }) {
    items {
      title
      slug
      description
      images {
        items {
          file
        }
      }
    }
  }
}
`;