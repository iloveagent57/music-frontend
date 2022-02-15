import React, { useCallback, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import ReactAudioPlayer from 'react-audio-player';
import Button from 'react-bootstrap/Button';
import Toast from 'react-bootstrap/Toast';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';


function App() {
  const [currentSong, setCurrentSong] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [playlist, setPlaylist] = useState([]);
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

  const renderSongs = function(performance) {
    
  };

  const performanceCard = (performance) => {
    return (
      <Col lg={`auto`}>
        <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" src="holder.js/100px180" />
          <Card.Body>
            <Card.Title>{performance.metadata.title}</Card.Title>
            <Button onClick={() => setPlaylist(performance.songs)}>
              Show songs
            </Button>
          </Card.Body>
        </Card>
      </Col>
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
            <p>Playlist</p>
            {playlist?.length && (
              playlist.map(song => (
                <Row key={song.url}>
                  <Button onClick={() => setCurrentSong(song.url)}>
                    {song.title}
                  </Button>
                </Row>
              ))
            )}
          </Col>
        </Row>

        <Row>
          <Col>
            <ReactAudioPlayer
              src={currentSong}
              controls
            />
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
}

export default App;
