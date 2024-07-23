import React from 'react';
import { Todo } from './types';
import { ListItem, ListItemText, IconButton, Select, MenuItem, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { SelectChangeEvent } from '@mui/material';

interface TodoItemProps {
  todo: Todo;
  onDelete: (id: number) => void;
  onStatusChange: (id: number, status: '未着手' | '進行中' | '完了') => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onDelete, onStatusChange }) => {
  const handleStatusChange = (e: SelectChangeEvent<'未着手' | '進行中' | '完了'>) => {
    onStatusChange(todo.id, e.target.value as '未着手' | '進行中' | '完了');
  };

  return (
    <ListItem
      sx={{
        mb: 2,
        backgroundColor: todo.status === '完了' ? '#d4edda' : todo.status === '進行中' ? '#fff3cd' : '#f8d7da',
      }}
    >
      <ListItemText
        primary={
          <Typography variant="h6">ID: {todo.id} - {todo.title}</Typography>
        }
        secondary={
          <>
            <Typography variant="body2">詳細: {todo.detail}</Typography>
            <Typography variant="body2">期限: {todo.deadline}</Typography>
            <Typography variant="body2">作成日: {todo.creationDate.toLocaleString()}</Typography>
            <Typography variant="body2">更新日: {todo.updateDate.toLocaleString()}</Typography>
          </>
        }
      />
      <Select
        value={todo.status}
        onChange={handleStatusChange}
        sx={{ mr: 2 }}
      >
        <MenuItem value="未着手">未着手</MenuItem>
        <MenuItem value="進行中">進行中</MenuItem>
        <MenuItem value="完了">完了</MenuItem>
      </Select>
      <IconButton onClick={() => onDelete(todo.id)}>
        <DeleteIcon />
      </IconButton>
    </ListItem>
  );
};

export default TodoItem;
