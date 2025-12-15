import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Activities from './components/Activities';
import Transparency from './components/Transparency';
import Donate from './components/Donate';
import VisitForm from './components/VisitForm';
import News from './components/News';
import Footer from './components/Footer';
import ChatAssistant from './components/ChatAssistant';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Activities />
        <Transparency />
        <Donate />
        <News />
        <VisitForm />
      </main>
      <Footer />
      <ChatAssistant />
    </div>
  );
};

export default App;