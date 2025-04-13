import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import matter from 'gray-matter';
import ReactMarkdown from 'react-markdown';
import useCanonical from '../hooks/useCanonical';
import '../styles/blog.css';

const BlogPost = () => {
  const { slug } = useParams();
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    if (!slug) return;

    fetch(`/posts/${slug}.md`)
      .then((res) => res.text())
      .then((text) => {
        const { content, data } = matter(text);
        setContent(content);
        setTitle(data.title);
        setDate(data.date);
      })
      .catch((err) => {
        console.error('Markdown fetch error:', err);
      });
  }, [slug]);

  useCanonical();

  useEffect(() => {
    if (title && slug) {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.innerHTML = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": title,
        "author": {
          "@type": "Person",
          "name": "Atakan Karacalı"
        },
        "url": `https://www.aigeneratememe.com/blog/${slug}`,
        "datePublished": date || "2025-04-13"
      });
      document.head.appendChild(script);

      return () => {
        document.head.removeChild(script);
      };
    }
    return () => {};
  }, [title, slug, date]);

  return (
    <div className="blog-container">
      <h1 className="blog-title">{title}</h1>
      <div className="blog-content">
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </div>
  );
};

export default BlogPost;