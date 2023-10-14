import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Client from '../utils/createClient';

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
    <div className="post-container">
      <h1>{project?.title}</h1>
      <p>{description}</p>
      {
        project?.images.map((image, index) => (
          <img 
          key={index}
          src={image.fields.file.url} 
          alt={project?.title}
          loading='lazy' 
          style={{
            width:`${image.fields.file.width}px`,
            height:`${image.fields.file.height}px`
          }
          } />
        ))
      }
      <img src={project?.images[0].fields.file.url} alt={project?.title} />
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