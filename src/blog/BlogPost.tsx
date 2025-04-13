import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
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

    fetch(`/posts/${slug?.toString().toLowerCase()}.md`)
      .then((res) => res.text())
      .then((text) => {
        const frontmatterMatch = text.match(/^---\n([\s\S]*?)\n---\n/);
        let markdownContent = text;
        let metadata: Record<string, string> = {};

        if (frontmatterMatch) {
          const rawMetadata = frontmatterMatch[1];
          markdownContent = text.slice(frontmatterMatch[0].length);

          rawMetadata.split('\n').forEach((line) => {
            const [key, ...rest] = line.split(':');
            metadata[key.trim()] = rest.join(':').trim().replace(/^"|"$/g, '');
          });

          setTitle(metadata.title || '');
          setDate(metadata.date || '');
        }

        setContent(markdownContent);
      })
      .catch((err) => {
        console.error('Markdown fetch error:', err);
        setTitle('Post Not Found');
        setContent('Sorry, this blog post could not be loaded.');
      });
  }, [slug]);

  useCanonical();

  useEffect(() => {
    if (!slug) return;
  
    const canonicalLink = document.createElement('link');
    canonicalLink.setAttribute('rel', 'canonical');
    canonicalLink.setAttribute('href', `https://www.aigeneratememe.com/blog/${slug}`);
    document.head.appendChild(canonicalLink);
  
    return () => {
      document.head.removeChild(canonicalLink);
    };
  }, [slug]);  

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
          "name": "Atakan Karacali"
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