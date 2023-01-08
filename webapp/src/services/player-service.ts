import axios from "axios";

export const getAllPlayers = () => {
    return axios.get("http://localhost:8080/api/player").then(response => response.data)
}
