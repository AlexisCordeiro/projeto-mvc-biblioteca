import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BookList from './pages/BookList';
import AddBook from './pages/AddBook';
import LoanList from './pages/LoanList';
import Layout from './components/Layout';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<BookList />} />
          <Route path="/add-book" element={<AddBook />} />
          <Route path="/loans" element={<LoanList />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
