import React from 'react';
import './App.css';
import {Container} from "react-bootstrap";
import CryptoViewer from "./component/crypto-viewer";

function App() {
  return (
    <Container>
        <CryptoViewer/>
    </Container>
  );
}

export default App;
