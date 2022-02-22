import React, { useCallback, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import ReactAudioPlayer from 'react-audio-player';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import Toast from 'react-bootstrap/Toast';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';


function App() {
  const [currentSong, setCurrentSong] = useState(null);
  const [currentPerformance, setCurrentPerformance] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [allPerformances, setAllPerformances] = useState({});

  useEffect(() => {
    const fetchPerformances = () => {
      setIsLoading(true);
      fetch('http://localhost:8000/ia/search_collections/?query=moe').then(
        response => response.json()
      ).then(data => {
        const result = data.result;
        const performanceData = Object.assign(
          {},
          ...result.map(performance => ({[performance.metadata.identifier]: performance}))
        );
        setAllPerformances(performanceData);
        setIsLoading(false);  // set loading to false here, after data is loaded asnchronously.
      });
    };
    fetchPerformances();
  }, [setAllPerformances]);

  const performanceCard = (performance) => {
    return (
      <Col lg={`auto`}>
        <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" src="holder.js/100px180" />
          <Card.Body>
            <Card.Title>{performance.metadata.title}</Card.Title>
            <Button onClick={() => setCurrentPerformance(performance)}>
              Show songs
            </Button>
          </Card.Body>
        </Card>
      </Col>
    );
  };

  const performanceDetails = (performance) => {
    return (
      <Card>
        <Card.Body>
          <Card.Title>{performance.metadata.title}</Card.Title>
          <Card.Subtitle>{performance.metadata.date}</Card.Subtitle>

          <Row>
            <Col>
              {currentSong && 
               <ReactAudioPlayer
                 src={currentSong.url}
                 controls
                 autoPlay={true}
               />
              }
            </Col>
          </Row>

          <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
              <Accordion.Header>Songs</Accordion.Header>
              <Accordion.Body>
                {currentPerformance.songs.map(song => (
                  <Row key={song.url}>
                    <Button
                      onClick={() => setCurrentSong(song)}
                      className={(song.url == currentSong?.url) ? 'btn-primary': 'btn-secondary'}
                    >
                      <Row>
                        <Col>{song.title || song.track}</Col>
                        <Col>{song.length}</Col>
                      </Row>
                    </Button>
                  </Row>
                ))}
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="1">
              <Accordion.Header>Description</Accordion.Header>
              <Accordion.Body>
                <div dangerouslySetInnerHTML={{ __html: performance.metadata.description }}/>
              </Accordion.Body>
            </Accordion.Item>

          </Accordion>
        </Card.Body>
      </Card>
    );
  };

  return (
    // React.Fragment so that we don't need adjacent elements inside a wrapping div.
    <React.Fragment>
      <Container>
        <Row>
          <Col>
            <Toast show={isLoading} onClose={() => setIsLoading(false)}>
              <Toast.Header>
                <strong className="mr-auto">{`Loading performances...`}</strong>
              </Toast.Header>
              <Toast.Body>{`Loading performances...`}</Toast.Body>
            </Toast>
            {Object.keys(allPerformances).length && (
              <Container>
                <CardGroup>
                  {Object.values(allPerformances).map(performance => performanceCard(performance))}
                </CardGroup>
              </Container>
            )}
          </Col>

          <Col>
            {currentPerformance && performanceDetails(currentPerformance)}
          </Col>
        </Row>

      </Container>
    </React.Fragment>
  );
}

export default App;
