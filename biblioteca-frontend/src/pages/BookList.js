import React, { useState, useEffect } from 'react';
import api from '../services/api';
import {
    TextField,
    List,
    ListItem,
    ListItemText,
    IconButton,
    Typography,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    DialogContentText,
    Button,
} from '@mui/material';
import { Search, AddShoppingCart, Delete } from '@mui/icons-material';

function BookList() {
    // Estados existentes
    const [books, setBooks] = useState([]);
    const [query, setQuery] = useState('');
  
    // Novos estados para o diálogo de confirmação
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedBookId, setSelectedBookId] = useState(null);
  
    useEffect(() => {
      fetchBooks();
    }, [query]);
  
    const fetchBooks = () => {
      api.get(`/books?q=${query}`).then((response) => {
        setBooks(response.data);
      });
    };
  
    const handleDeleteClick = (bookId) => {
      setSelectedBookId(bookId);
      setOpenDialog(true);
    };
  
    const handleDeleteConfirm = () => {
      api.delete(`/books/${selectedBookId}`)
        .then(() => {
          setOpenDialog(false);
          setSelectedBookId(null);
          fetchBooks(); // Atualiza a lista de livros
        })
        .catch((error) => {
          alert(`Erro: ${error.response.data.error}`);
        });
    };
  
    const handleDeleteCancel = () => {
      setOpenDialog(false);
      setSelectedBookId(null);
    };
  
    // Função existente para emprestar livro
    const handleLoan = (bookId) => {
      api.post('/loans/loan', { book_id: bookId })
        .then(() => {
          alert('Empréstimo realizado com sucesso');
        })
        .catch((error) => {
          alert(`Erro: ${error.response.data.error}`);
        });
    };
  
    return (
      <div>
        <Typography variant="h4" gutterBottom>
          Lista de Livros
        </Typography>
        <TextField
          label="Buscar por título ou autor"
          variant="outlined"
          fullWidth
          margin="normal"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          InputProps={{
            endAdornment: <Search />,
          }}
        />
        <List>
          {books.map((book) => (
            <ListItem
              key={book.id}
              secondaryAction={
                <>
                  <IconButton
                    edge="end"
                    color="primary"
                    onClick={() => handleLoan(book.id)}
                  >
                    <AddShoppingCart />
                  </IconButton>
                  <IconButton
                    edge="end"
                    color="secondary"
                    onClick={() => handleDeleteClick(book.id)}
                  >
                    <Delete />
                  </IconButton>
                </>
              }
            >
              <ListItemText
                primary={book.title}
                secondary={`Autor: ${book.author}`}
              />
            </ListItem>
          ))}
        </List>
  
        {/* Diálogo de confirmação de deleção */}
        <Dialog
          open={openDialog}
          onClose={handleDeleteCancel}
        >
          <DialogTitle>Confirmar Deleção</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Tem certeza de que deseja deletar este livro? Esta ação não pode ser desfeita.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDeleteCancel} color="primary">
              Cancelar
            </Button>
            <Button onClick={handleDeleteConfirm} color="secondary">
              Deletar
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
  
  export default BookList;
