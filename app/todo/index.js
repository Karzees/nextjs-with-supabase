import React, { useState, useEffect } from 'react';
import { Container, Typography, TextField, Button, List, ListItem, ListItemText } from '@mui/material';
import { supabase } from '../utils/supabaseClient';

export default function Home() {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState('');

    // Andmete toomine Supabase'ist
    const fetchTodos = async () => {
        const { data, error } = await supabase
            .from('todos')
            .select('*')
            .eq('deleted', false);
        if (error) console.log("Error fetching data:", error);
        else setTodos(data);
    };

    // TODO lisamine
    const addTodo = async () => {
        if (newTodo) {
            const { data, error } = await supabase
                .from('todos')
                .insert([{ title: newTodo, priority: 1 }]);
            if (error) console.log("Error adding todo:", error);
            else setNewTodo('');
            fetchTodos();
        }
    };

    useEffect(() => {
        fetchTodos();
    }, []);

    return (
        <Container>
            <Typography variant="h1" gutterBottom>
                TODO App
            </Typography>
            <TextField
                label="New Todo"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                fullWidth
                variant="outlined"
            />
            <Button variant="contained" color="primary" onClick={addTodo} style={{ marginTop: 10 }}>
                Add Todo
            </Button>
            <List>
                {todos.map((todo) => (
                    <ListItem key={todo.id}>
                        <ListItemText primary={todo.title} />
                    </ListItem>
                ))}
            </List>
        </Container>
    );
}