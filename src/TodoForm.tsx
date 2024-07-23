import React, { useState } from 'react';
import { TextField, Button, MenuItem, Select, Grid } from '@mui/material';
import { Todo } from './types';

interface TodoFormProps {
  onAdd: (newTodo: Omit<Todo, 'id' | 'creationDate' | 'updateDate'>) => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [detail, setDetail] = useState('');
  const [deadline, setDeadline] = useState('');
  const [status, setStatus] = useState<'未着手' | '進行中' | '完了'>('未着手');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (title.trim() === '' || detail.trim() === '' || deadline.trim() === '') {
      alert('すべてのフィールドを入力してください。');
      return;
    }

    const newTodo: Omit<Todo, 'id' | 'creationDate' | 'updateDate'> = {
      title,
      detail,
      deadline,
      status,
    };

    onAdd(newTodo);

    // フォームをリセット
    setTitle('');
    setDetail('');
    setDeadline('');
    setStatus('未着手');
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="タイトル"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="詳細"
            multiline
            rows={4}
            value={detail}
            onChange={e => setDetail(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="期限"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={deadline}
            onChange={e => setDeadline(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Select
            fullWidth
            value={status}
            onChange={e => setStatus(e.target.value as '未着手' | '進行中' | '完了')}
          >
            <MenuItem value="未着手">未着手</MenuItem>
            <MenuItem value="進行中">進行中</MenuItem>
            <MenuItem value="完了">完了</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">
            TODOを追加
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default TodoForm;
