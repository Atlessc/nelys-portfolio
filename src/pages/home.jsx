import { useEffect, useState } from 'react';
import { createClient } from 'contentful';

const client = createClient({
  space: import.meta.env.VITE_CONTENTFUL_SPACE_ID,
  environment: import.meta.env.VITE_CONTENTFUL_ENVIRONMENT,
  accessToken: import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN,
});

export default function Home() {


    const [posts, setPosts] = useState(null);

    const client = contentful.createClient({
      space: '<space_id>',
      environment: '<environment_id>', // defaults to 'master' if not set
      accessToken: '<content_delivery_api_key>'
    })
    
    client.getEntries()
    .then((response) => console.log(response.items))
    .catch(console.error)

    // useEffect(() => {
    //   window
    //     .fetch(`https://graphql.contentful.com/content/v1/spaces/${client.space}/`, {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //         // Authenticate the request
    //         Authorization: `Bearer ${client.accessToken}`,
    //       },
    //       // send the GraphQL query
    //       body: JSON.stringify({ query }),
    //     })
    //     .then((response) => response.json())
    //     .then(({ data, errors }) => {
    //       if (errors) {
    //         console.error(errors);
    //       }
  
    //       // rerender the entire component with new data
    //       console.log(data.pageCollection.items[0]);
    //     });
    // }, []);
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
            <Link to={`/projects/${post.fields.postUuid}`}>
              <img src={post.fields.thumbnail.fields.file.url} alt={post.fields.title} />
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
  pageCollection {
    items {
      title
      logo {
        url
      }
    }
  }
}
`