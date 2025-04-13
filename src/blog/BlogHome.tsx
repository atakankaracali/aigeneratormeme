import { Link } from 'react-router-dom';
import posts from './posts.json';
import '../styles/blog.css';

const BlogHome = () => {
  return (
    <div className="blog-home-container">
      <h1 className="blog-home-title">📝 Blog Articles</h1>
      <div className="blog-grid">
        {posts.map((post) => (
          <div className="blog-card" key={post.slug}>
            <h2 className="blog-card-title">
              <Link to={`/blog/${post.slug}`}>{post.title}</Link>
            </h2>
            <p className="blog-card-desc">{post.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogHome;