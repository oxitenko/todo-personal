import axios, {AxiosResponse} from "axios";
import {IToDo} from "../store/todoStore";

export async function fetchData(): Promise<IToDo[]> {
    try {
        const response: AxiosResponse<IToDo[]> = await axios.get('https://jsonplaceholder.typicode.com/users/1/todos');
        return response.data.slice(0, 5);
    } catch (error) {
        console.error('Error fetching todos:', error);
        throw error;
    }
}