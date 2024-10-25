import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import {
    TextField,
    Button,
    Typography,
    Box,
  } from '@mui/material';
  

  function AddBook() {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [isbn, setIsbn] = useState('');
    const navigate = useNavigate();
  
    const handleSubmit = (e) => {
      e.preventDefault();
      api.post('/books', { title, author, isbn })
        .then(() => {
          navigate('/');
        })
        .catch((error) => {
          alert(`Erro: ${error.response.data.error}`);
        });
    };
  
    return (
      <div>
        <Typography variant="h4" gutterBottom>
          Adicionar Livro
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <TextField
            label="Título"
            fullWidth
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            margin="normal"
          />
          <TextField
            label="Autor"
            fullWidth
            required
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            margin="normal"
          />
          <TextField
            label="ISBN"
            fullWidth
            required
            value={isbn}
            onChange={(e) => setIsbn(e.target.value)}
            margin="normal"
          />
          <Button variant="contained" color="primary" type="submit" sx={{ mt: 2 }}>
            Adicionar
          </Button>
        </Box>
      </div>
    );
  }

export default AddBook;
