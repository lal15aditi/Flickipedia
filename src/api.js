import axios from "axios";

const API_KEY = 'b0c894033deea6ba50f513464892b565';
const BASE_URL = 'https://api.themoviedb.org/3';



const getData = async (endPoint, params) => {
    const { data } = await axios.get(
        BASE_URL + endPoint, {
            params: {api_key: API_KEY, ...params}
        }
    )
    return data;
}

export default getData;