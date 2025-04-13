import { Link } from 'react-router-dom';
import posts from './posts.json';

const BlogHome = () => {
  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: 'auto' }}>
      <h1 style={{ color: '#8e2de2' }}>📝 Blog Articles</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.slug} style={{ marginBottom: '1rem' }}>
            <Link to={`/blog/${post.slug}`} style={{ color: '#4a00e0', fontWeight: '600' }}>
              {post.title}
            </Link>
            <p style={{ fontSize: '0.9rem', opacity: 0.7 }}>{post.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlogHome;