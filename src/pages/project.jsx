import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { createClient } from 'contentful';

// Create a client to access Contentful
const client = createClient({
  space: import.meta.env.VITE_CONTENTFUL_SPACE_ID,
  accessToken: import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN,
});

function Project() {
  const { id } = useParams();
  const [project, setProject] = useState(null);

  useEffect(() => {
    // Fetch the post data from Contentful
    client.getEntry(id)
      .then((entry) => setPost(entry.fields))
      .catch(console.error);
  }, [id]);

  // Render the post data
  return (
    <div className="post-container">
      {project ? (
        <>
          <h1 className="post-title">{project.title}</h1>
          <p className="post-description">{project.description}</p>
          {/* Render each image in the post */}
          {project.image.map((img, index) => (
            <div key={index} className="post-img-container">
              <img src={img.fields.file.url} alt={img.fields.description || ''} className="post-img" />
              <h2 className="post-img-title">{img.fields.title}</h2>
              <p className="post-img-description">{img.fields.description}</p>
            </div>
          ))}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Project;
