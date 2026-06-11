'use client';

import { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { blogPosts } from '../../lib/posts';

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', name: 'All Posts' },
    { id: 'ai', name: 'AI & Automation' },
    { id: 'ai-search', name: 'AI Search & Citations' },
    { id: 'google-ads', name: 'Google Ads' },
    { id: 'strategy', name: 'Strategy' },
    { id: 'ppc', name: 'PPC Optimization' },
    { id: 'b2b', name: 'B2B Marketing' }
  ];

  const filteredPosts = blogPosts
    .filter(post => {
      const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
      const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // Sort by date descending (newest first) — matches visual page order
  // and signals freshness priority to Google.
  const sortedBlogPosts = [...blogPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const blogIndexJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": "https://www.kampaio.com/blog#collection",
    name: "Kampaio Blog",
    description:
      "AI-powered Google Ads insights, PPC strategy, autonomous campaign management. Practical guides for SMB advertisers and agencies.",
    url: "https://www.kampaio.com/blog",
    // Publisher references main Kampaio Organization entity via @id,
    // inheriting knowsAbout (15 PPC expertise topics) signal.
    publisher: {
      "@id": "https://www.kampaio.com/#organization",
    },
    isPartOf: {
      "@id": "https://www.kampaio.com/#website",
    },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: sortedBlogPosts.length,
      itemListElement: sortedBlogPosts.map((post, idx) => ({
        "@type": "ListItem",
        position: idx + 1,
        url: `https://www.kampaio.com/blog/${post.slug}`,
        name: post.title,
      })),
    },
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)'
    }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogIndexJsonLd) }}
      />
      <Header />
      
      {/* Hero Section */}
      <div style={{
        background: 'white',
        padding: '80px 0 60px',
        textAlign: 'center'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 24px'
        }}>
          <h1 style={{
            fontSize: 'clamp(36px, 5vw, 56px)',
            fontWeight: '800',
            color: '#1e293b',
            marginBottom: '20px',
            lineHeight: '1.2'
          }}>
            Expert Insights from PPC Professionals
          </h1>
          <p style={{
            fontSize: '20px',
            color: '#64748b',
            marginBottom: '40px',
            maxWidth: '600px',
            margin: '0 auto 40px',
            lineHeight: '1.6'
          }}>
            Stay ahead with proven strategies, AI-powered insights, and industry best practices
          </p>
          
          {/* Search Bar */}
          <div style={{
            maxWidth: '500px',
            margin: '0 auto 40px',
            position: 'relative'
          }}>
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '16px 20px',
                borderRadius: '12px',
                border: '1px solid #e2e8f0',
                fontSize: '16px',
                outline: 'none',
                transition: 'all 0.3s ease'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#667eea';
                e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#e2e8f0';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>

          {/* Category Filters */}
          <div style={{
            display: 'flex',
            gap: '12px',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                style={{
                  padding: '10px 20px',
                  borderRadius: '20px',
                  border: 'none',
                  background: selectedCategory === category.id 
                    ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                    : 'white',
                  color: selectedCategory === category.id ? 'white' : '#64748b',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: selectedCategory === category.id 
                    ? '0 4px 12px rgba(102, 126, 234, 0.3)'
                    : '0 2px 8px rgba(0,0,0,0.1)'
                }}
                onMouseEnter={(e) => {
                  if (selectedCategory !== category.id) {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedCategory !== category.id) {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
                  }
                }}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Blog Posts Grid */}
      <div
        className="blog-grid"
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 24px 80px'
        }}
      >
        <h2 style={{
          fontSize: '24px',
          fontWeight: '700',
          color: '#1e293b',
          marginBottom: '32px',
          textAlign: 'center'
        }}>
          Latest Articles
        </h2>
        {filteredPosts.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '60px 0',
            color: '#64748b'
          }}>
            <p style={{ fontSize: '18px', marginBottom: '16px' }}>No articles found</p>
            <p>Try adjusting your search or filter criteria</p>
          </div>
        ) : (
          <div
            className="blog-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '32px',
              justifyItems: 'center'
            }}
          >
            {filteredPosts.map((post) => (
              <article
                key={post.id}
                style={{
                  width: '100%',
                  maxWidth: '370px',
                  background: 'white',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
                }}
                onClick={() => {
                  if (post.slug) {
                    window.location.href = `/blog/${post.slug}`;
                  }
                }}
              >
                <img
                  src={`/blog/${post.slug}/opengraph-image`}
                  width={1200}
                  height={630}
                  alt=""
                  loading="lazy"
                  style={{
                    display: 'block',
                    width: '100%',
                    height: 'auto',
                    aspectRatio: '1200 / 630',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  }}
                />
                <div style={{ padding: '24px' }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    marginBottom: '12px'
                  }}>
                    <span style={{
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      color: 'white',
                      padding: '4px 8px',
                      borderRadius: '8px',
                      fontSize: '11px',
                      fontWeight: '600',
                      textTransform: 'uppercase'
                    }}>
                      {categories.find(c => c.id === post.category)?.name}
                    </span>
                    <span style={{
                      color: '#64748b',
                      fontSize: '12px'
                    }}>
                      {post.readTime}
                    </span>
                  </div>
                  <h3 style={{
                    fontSize: '20px',
                    fontWeight: '700',
                    color: '#1e293b',
                    marginBottom: '12px',
                    lineHeight: '1.4'
                  }}>
                    {post.title}
                  </h3>
                  <p style={{
                    fontSize: '14px',
                    color: '#64748b',
                    lineHeight: '1.6',
                    marginBottom: '16px'
                  }}>
                    {post.excerpt}
                  </p>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontSize: '12px',
                    color: '#64748b'
                  }}>
                    <span>{post.author}</span>
                    <span>
                      {new Date(post.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      <Footer compact={true} />
    </div>
  );
} 