import React from 'react';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import { Link } from 'react-router-dom';

function Layout({ children }) {
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Biblioteca
          </Typography>
          <Button color="inherit" component={Link} to="/">
            Livros
          </Button>
          <Button color="inherit" component={Link} to="/add-book">
            Adicionar Livro
          </Button>
          <Button color="inherit" component={Link} to="/loans">
            Empréstimos
          </Button>
        </Toolbar>
      </AppBar>
      <Container sx={{ marginTop: 4 }}>{children}</Container>
    </div>
  );
}

export default Layout;
