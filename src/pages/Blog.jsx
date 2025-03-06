import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, Pagination } from 'react-bootstrap';
import Image from '../components/common/Image'; // Usando el componente de imágenes que creamos antes

// Datos de ejemplo para los posts del blog
const BLOG_POSTS = [
  {
    id: 1,
    title: 'Estrategias de inversión para 2025',
    excerpt: 'Descubre las mejores estrategias de inversión para maximizar tus retornos en un mercado volátil.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisi vel consectetur interdum, nisl nisi consectetur nisl, eget consectetur nisl nisi vel nisl.',
    image: 'blog/estrategias-inversion.jpg',
    author: 'Carlos Rodríguez',
    date: '4 de marzo, 2025',
    tags: ['Inversiones', 'Estrategia', 'Mercados']
  },
  {
    id: 2,
    title: 'Análisis del mercado inmobiliario actual',
    excerpt: 'Un análisis profundo de las tendencias del mercado inmobiliario y oportunidades de inversión.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisi vel consectetur interdum, nisl nisi consectetur nisl, eget consectetur nisl nisi vel nisl.',
    image: 'blog/mercado-inmobiliario.jpg',
    author: 'Ana Martínez',
    date: '28 de febrero, 2025',
    tags: ['Inmobiliario', 'Análisis', 'Tendencias']
  },
  {
    id: 3,
    title: 'Cómo diversificar tu portafolio de inversión',
    excerpt: 'La diversificación es clave para reducir riesgos. Aprende cómo crear un portafolio balanceado.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisi vel consectetur interdum, nisl nisi consectetur nisl, eget consectetur nisl nisi vel nisl.',
    image: 'blog/diversificacion-portafolio.jpg',
    author: 'Daniel Morales',
    date: '15 de febrero, 2025',
    tags: ['Portafolio', 'Diversificación', 'Riesgo']
  }
];

const Blog = () => {
  const [posts, setPosts] = useState(BLOG_POSTS);
  const [selectedPost, setSelectedPost] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(6);
  
  // Lógica de filtrado de posts
  useEffect(() => {
    if (searchTerm) {
      const filteredPosts = BLOG_POSTS.filter(post => 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
      setPosts(filteredPosts);
    } else {
      setPosts(BLOG_POSTS);
    }
    setCurrentPage(1);
  }, [searchTerm]);
  
  // Lógica de paginación
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(posts.length / postsPerPage);
  
  // Manejadores de eventos
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  
  const handlePostClick = (post) => {
    setSelectedPost(post);
    window.scrollTo(0, 0);
  };
  
  const handleBackToBlog = () => {
    setSelectedPost(null);
  };
  
  // Renderizado de la vista detallada de un post
  const renderPostDetail = () => {
    return (
      <div className="blog-post-detail">
        <Button 
          variant="link" 
          onClick={handleBackToBlog} 
          className="mb-4"
        >
          &larr; Volver al blog
        </Button>
        
        <h1 className="mb-4">{selectedPost.title}</h1>
        
        <div className="post-meta mb-4">
          <span className="author">Por {selectedPost.author}</span>
          <span className="date mx-3">•</span>
          <span className="date">{selectedPost.date}</span>
        </div>
        
        <div className="post-image mb-4">
          <Image
            name={selectedPost.image}
            alt={selectedPost.title}
            className="img-fluid rounded"
          />
        </div>
        
        <div className="post-tags mb-4">
          {selectedPost.tags.map((tag, index) => (
            <span key={index} className="badge bg-secondary me-2">
              {tag}
            </span>
          ))}
        </div>
        
        <div className="post-content">
          <p>{selectedPost.content}</p>
          <p>
            Etiam vitae augue sit amet sapien convallis bibendum. Mauris sit amet magna a nibh tristique luctus in nec tortor. 
            Proin vel lectus leo. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. 
            In eu fermentum purus. Morbi pretium, neque quis lacinia pellentesque, justo ipsum varius elit, nec auctor 
            justo enim eu metus.
          </p>
          <h2>Puntos clave a considerar</h2>
          <ul>
            <li>Mauris sit amet magna a nibh tristique luctus in nec tortor</li>
            <li>Proin vel lectus leo. Pellentesque habitant morbi tristique</li>
            <li>In eu fermentum purus. Morbi pretium, neque quis lacinia</li>
          </ul>
          <p>
            Curabitur iaculis, ex in sodales tempus, massa libero tincidunt velit, et tempor est velit non leo. 
            Vivamus ac auctor nulla. Suspendisse potenti. Nullam fringilla vel lacus eu aliquam. Etiam aliquet vel 
            nunc at sollicitudin. Maecenas sed ipsum rutrum, venenatis neque sit amet, auctor urna.
          </p>
        </div>
      </div>
    );
  };
  
  // Renderizado de la lista de posts
  const renderPostsList = () => {
    return (
      <>
        <div className="blog-header mb-5">
          <h1 className="text-center mb-4">Nuestro Blog</h1>
          <p className="text-center lead mb-5">
            Las últimas noticias, análisis y perspectivas sobre inversiones y mercados financieros
          </p>
          
          <Form className="d-flex justify-content-center mb-5">
            <Form.Group className="w-50">
              <Form.Control
                type="text"
                placeholder="Buscar artículos por título o etiqueta..."
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </Form.Group>
          </Form>
        </div>
        
        {posts.length === 0 ? (
          <div className="text-center my-5">
            <h3>No se encontraron artículos que coincidan con tu búsqueda.</h3>
            <Button 
              variant="link" 
              onClick={() => setSearchTerm('')}
              className="mt-3"
            >
              Ver todos los artículos
            </Button>
          </div>
        ) : (
          <>
            <Row>
              {currentPosts.map(post => (
                <Col md={4} className="mb-4" key={post.id}>
                  <Card className="h-100 blog-card">
                    <div className="card-img-wrapper">
                      <Image
                        name={post.image}
                        alt={post.title}
                        className="card-img-top"
                      />
                    </div>
                    <Card.Body>
                      <div className="post-meta mb-2">
                        <small className="text-muted">{post.date}</small>
                      </div>
                      <Card.Title>{post.title}</Card.Title>
                      <Card.Text>{post.excerpt}</Card.Text>
                      <div className="post-tags mb-3">
                        {post.tags.map((tag, index) => (
                          <span key={index} className="badge bg-light text-dark me-2">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </Card.Body>
                    <Card.Footer className="bg-white border-0">
                      <Button 
                        variant="outline-primary" 
                        onClick={() => handlePostClick(post)}
                      >
                        Leer más
                      </Button>
                    </Card.Footer>
                  </Card>
                </Col>
              ))}
            </Row>
            
            {/* Paginación */}
            {totalPages > 1 && (
              <div className="d-flex justify-content-center mt-5">
                <Pagination>
                  <Pagination.Prev 
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                  />
                  
                  {[...Array(totalPages)].map((_, i) => (
                    <Pagination.Item
                      key={i + 1}
                      active={i + 1 === currentPage}
                      onClick={() => setCurrentPage(i + 1)}
                    >
                      {i + 1}
                    </Pagination.Item>
                  ))}
                  
                  <Pagination.Next
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                  />
                </Pagination>
              </div>
            )}
          </>
        )}
      </>
    );
  };
  
  return (
    <Container className="py-5">
      {selectedPost ? renderPostDetail() : renderPostsList()}
    </Container>
  );
};

export default Blog;