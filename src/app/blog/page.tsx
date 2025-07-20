'use client';

import { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', name: 'All Posts' },
    { id: 'ppc', name: 'PPC Optimization' },
    { id: 'ai', name: 'AI & Automation' },
    { id: 'google-ads', name: 'Google Ads' },
    { id: 'strategy', name: 'Strategy' },
    { id: 'case-studies', name: 'Case Studies' }
  ];

  const blogPosts = [
    {
      id: 1,
      title: 'What CEOs Want to See in Google Ads Reports',
      excerpt: 'Learn which Google Ads metrics CEOs care about (hint: it\'s not clicks) and get the exact reporting template that secures bigger budgets.',
      category: 'strategy',
      author: 'Kampaio Team',
      date: '2024-12-15',
      readTime: '12 min read',
      featured: true,
      slug: 'what-ceos-want-google-ads-reports'
    },
    {
      id: 2,
      title: '10 AI-Powered PPC Optimization Strategies That Actually Work',
      excerpt: 'Discover how artificial intelligence is revolutionizing PPC campaigns and learn proven strategies to boost your ROI.',
      category: 'ai',
      author: 'Kampaio Team',
      date: '2024-12-14',
      readTime: '8 min read'
    },
    {
      id: 3,
      title: 'The Complete Guide to Google Ads Quality Score in 2024',
      excerpt: 'Master the fundamentals of Quality Score and learn advanced techniques to improve your ad performance.',
      category: 'google-ads',
      author: 'Sarah Johnson',
      date: '2024-12-12',
      readTime: '12 min read'
    },
    {
      id: 4,
      title: 'How We Increased Client ROI by 340% Using AI Automation',
      excerpt: 'Real case study showing how our AI-powered platform transformed a struggling PPC campaign.',
      category: 'case-studies',
      author: 'Mike Chen',
      date: '2024-12-10',
      readTime: '10 min read'
    }
  ];

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)'
    }}>
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
            color: '#1a1a1a',
            marginBottom: '20px',
            lineHeight: '1.2'
          }}>
            Expert Insights from PPC Professionals
          </h1>
          <p style={{
            fontSize: '20px',
            color: '#666',
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
                e.target.style.borderColor = '#7F9CF5';
                e.target.style.boxShadow = '0 0 0 3px rgba(127, 156, 245, 0.1)';
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
                    ? 'linear-gradient(135deg, #7F9CF5 0%, #4A5BB8 100%)'
                    : 'white',
                  color: selectedCategory === category.id ? 'white' : '#666',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: selectedCategory === category.id 
                    ? '0 4px 12px rgba(127, 156, 245, 0.3)'
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
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 24px 80px'
      }}>
        <h2 style={{
          fontSize: '24px',
          fontWeight: '700',
          color: '#1a1a1a',
          marginBottom: '32px',
          textAlign: 'center'
        }}>
          Latest Articles
        </h2>
        
        {filteredPosts.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '60px 0',
            color: '#666'
          }}>
            <p style={{ fontSize: '18px', marginBottom: '16px' }}>No articles found</p>
            <p>Try adjusting your search or filter criteria</p>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '32px'
          }}>
            {filteredPosts.map((post) => (
              <article
                key={post.id}
                style={{
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
                <div style={{
                  height: '200px',
                  background: 'linear-gradient(135deg, #7F9CF5 0%, #4A5BB8 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <svg width="60" height="60" viewBox="0 0 24 24" fill="none" style={{ color: 'white', opacity: 0.8 }}>
                    <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div style={{ padding: '24px' }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    marginBottom: '12px'
                  }}>
                    <span style={{
                      background: 'linear-gradient(135deg, #7F9CF5 0%, #4A5BB8 100%)',
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
                      color: '#666',
                      fontSize: '12px'
                    }}>
                      {post.readTime}
                    </span>
                  </div>
                  <h3 style={{
                    fontSize: '20px',
                    fontWeight: '700',
                    color: '#1a1a1a',
                    marginBottom: '12px',
                    lineHeight: '1.4'
                  }}>
                    {post.title}
                  </h3>
                  <p style={{
                    fontSize: '14px',
                    color: '#666',
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
                    color: '#666'
                  }}>
                    <span>By {post.author}</span>
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