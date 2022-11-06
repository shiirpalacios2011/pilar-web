import axios from 'axios'

const BASE_URL = "https://pokeapi.co/api/v2";
export const IMG_URL = "https://assets.pokemon.com/assets/cms2/img/pokedex/full/"
export const POKE_IMG = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSY6Dk7lTE9AXpyIBu4lypUwiOxIrCfvlLzBw&usqp=CAU"

const headers = () => {
    const headers = {
        headers: {
            'content-Types': 'aplication/json'
        }
    }
    return headers
}

const POST = async (url, payload) => {
    let res = null;
    try {
        res = await axios.post(url, payload, headers());
        return (res && res.data) || null
    } catch (error) {
        throw (error && error.response.data.error) || errorMessage
    }
};

const GET = async (url) => {
    let res = null;
    try {
        res = await axios.get(url, headers());
        return (res && res.data) || null
    } catch (error) {
        throw (error && error.response.data.error) || errorMessage
    }
};

const PATCH = async (url, payload) => {
    let res = null;
    try {
        res = await axios.patch(url, payload, headers());
        return (res && res.data) || null
    } catch (error) {
        throw (error && error.response.data.error) || errorMessage
    }
};

const DELETE = async (url) => {
    let res = null;
    try {
        res = await axios.delete(url, headers());
        return (res && res.data) || null
    } catch (error) {
        throw (error && error.response.data.error) || errorMessage
    }
};



const errorMessage = {
    message: "Error en el servidor",
    name: "serverError",
    statusCode: 500
}

export default {
    POST,
    GET,
    PATCH,
    DELETE,
    pokemons: `${BASE_URL}/pokemon`
}