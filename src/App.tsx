import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard/Dashboard';
import AddEditBook from './pages/AddEditBook/AddEditBook';
import Header from './components/Header/Header';
import { BookProvider } from './context/BookContext';
import Footer from './components/Footer/Footer';

const App: React.FC = () => {
 
  return (
    <BookProvider>
      <Router>
        <div className="min-h-screen w-full flex flex-col">
          <main className="flex-grow w-full">
            <Header />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/add" element={<AddEditBook />} />
              <Route path="/edit/:id" element={<AddEditBook />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </BookProvider>
  );
};

export default App;