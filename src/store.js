import create from "zustand";
import {nanoid} from "nanoid";
import {persist} from "zustand/middleware";

export const useTodos = create((set, get) => ({
    todos: [{id: 1, title: 'Learn JS', completed: true}, {id: 2, title: 'Learn React', completed: false},],
    loading: false,
    error: null,

    addTodo: (title) => set(state => ({
        todos: [...state.todos, {
            id: nanoid(),
            title, completed: false
        }]
    })),
    toggleTodo: (id) => set(() => ({
        todos: get().todos.map(todo => todo.id === id ? {...todo, completed: !todo.completed} : todo)
    })),
    fetchTodos: async () => {
        set({loading: true})
        try {
            const res = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10');
            if (!res.ok) throw new Error('Failed fetch in the fetch todos!')
            set({
                todos: await res.json()
                , error: null
            })
        } catch (err) {
            set({error: err.message})
        } finally {
            set({loading: false})
        }
    }
}))

export const useFilter = create((set, get) => ({
    filter: 'all',
    setFilter: (value) => set({filter: value})
}))