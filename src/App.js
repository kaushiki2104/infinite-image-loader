import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import axios from 'axios';
function App() {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchImages();
  }, [page]);

  const fetchImages = async () => {
    try {
      const response = await axios.get(`https://picsum.photos/v2/list?page=${page}&limit=10`);
      console.log("responce is ", response)
      setImages(prevImages => [...prevImages, ...response.data]);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <Container>
      <Row>
        
        {images.map(image => (
          <Col key={image.id} xs={12} sm={6} md={4} lg={3}>
        <div style={{padding:"10px 0 10px 0"}}>
            <img src={image.download_url} alt="Image" className="img-fluid" loading="lazy"  style={{
              width: "200px", 
              height: "200px",
              borderRadius: "10px"}} />
         </div> 
         </Col>
        ))}
      </Row>
      <Row style={{marginBottom:'10px'}}>
        <Col className="text-center">
          <Button onClick={handleLoadMore}>Load More...</Button>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
