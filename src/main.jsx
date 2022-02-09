import React, { useCallback, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import ReactAudioPlayer from 'react-audio-player';
import Button from 'react-bootstrap/Button';
import Toast from 'react-bootstrap/Toast';


function App() {
  const [currentSong, setCurrentSong] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  //let [allSongs, setAllSongs] = useState(null);
  const [allPerformances, setAllPerformances] = useState([])

  useEffect(() => {
    const fetchPerformances = () => {
      setIsLoading(true);
      fetch('http://localhost:8000/ia/search_collections/?query=moe').then(response => {
        setAllPerformances(response.json().result);
        setIsLoading(false);  // set loading to false here, after data is loaded asnchronously.
      });
    };
    fetchPerformances();
  }, [setAllPerformances])

  const renderSongs = function(performance) {
    
  }

  return (
    // React.Fragment so that we don't need adjacent elements inside a wrapping div.
    <React.Fragment>
      <Toast show={isLoading} onClose={() => setIsLoading(false)}>
        <Toast.Header>
          <strong className="mr-auto">{`Loading...`}</strong>
        </Toast.Header>
        <Toast.Body>{`Loading the data`}</Toast.Body>
      </Toast>

      <ul>
      {allPerformances.map(performance => {
        return (
          <li>
            <Button
              onClick={() => renderSongs(performance)}
            >{performance.metadata.title}</Button>
          </li>
        )
        })
      }
      </ul>
      <ReactAudioPlayer
        src={currentSong}
        controls  
      />

    </React.Fragment>
  );
}

export default App;
