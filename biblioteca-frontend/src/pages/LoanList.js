import React, { useState, useEffect } from 'react';
import api from '../services/api';
import {
  List,
  ListItem,
  ListItemText,
  IconButton,
  Typography,
} from '@mui/material';
import { Undo } from '@mui/icons-material';

function LoanList() {
  const [loans, setLoans] = useState([]);

  useEffect(() => {
    api.get('/loans/active').then((response) => {
      setLoans(response.data);
    }).catch((error) => {
      console.error('Erro ao buscar empréstimos: ', error);
    });
  }, []);

  const handleReturn = (loanId) => {
    api.post('/loans/return', { loan_id: loanId })
      .then(() => {
        setLoans(loans.filter((loan) => loan.id !== loanId));
      })
      .catch((error) => {
        alert(`Erro: ${error.response.data.error}`);
      });
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Empréstimos Ativos
      </Typography>
      <List>
        {loans.map((loan) => (
          <ListItem
            key={loan.id}
            secondaryAction={
              <IconButton
                edge="end"
                color="secondary"
                onClick={() => handleReturn(loan.id)}
              >
                <Undo />
              </IconButton>
            }
          >
            <ListItemText
              primary={`Livro: ${loan.book_title}`}
              secondary={`Usuário: ${loan.user_name} | Data: ${new Date(loan.loan_date).toLocaleString()}`}
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default LoanList;
