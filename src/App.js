import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import TopNavBar from './components/TopNavBar';
import Footer from './components/Footer';
import Auth from  './auth/Auth';

function App() {
  return (
    <div className="App">
      <TopNavBar />
        <h3>Welcome to Immrama</h3>
        <Auth />

      <Footer />
    </div>
  );
}

export default App;
