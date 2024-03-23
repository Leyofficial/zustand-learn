import {useTodos} from "../store.js";
import {Button} from "@chakra-ui/react";

export const FetchTodos = () => {
    const { loading , error , fetchTodos} = useTodos(state => ({
        loading : state.loading,
        error : state.error,
        fetchTodos : state.fetchTodos
    }))
    return <Button isLoading={loading} onClick={fetchTodos}>
        {!error ? 'Get todos' : error}
    </Button>
}