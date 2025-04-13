import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import matter from 'gray-matter';
import ReactMarkdown from 'react-markdown';
import useCanonical from '../hooks/useCanonical';

const BlogPost = () => {
  const { slug } = useParams();
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    import(`./posts/${slug}.md`)
      .then((res) => fetch(res.default).then((r) => r.text()))
      .then((text) => {
        const { content, data } = matter(text);
        setContent(content);
        setTitle(data.title);
        setDate(data.date);
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
  }, [title, slug, date]);

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: 'auto' }}>
      <h1 style={{ color: '#8e2de2' }}>{title}</h1>
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
};

export default BlogPost;