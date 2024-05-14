import  axios from "axios"
import dotenv from "dotenv"
dotenv.config()



async function fetchMockData(): Promise<any[]> {
    const API_KEY = process.env.MOCKAROO_API_KEY
    const SCHEMA_ID = "850bd390";
    const NUM_ROWS = 10;
    const baseURL = 'https://api.mockaroo.com/api';
    const endpoint = `/generate.json?key=${API_KEY}&schema=${SCHEMA_ID}&count=${NUM_ROWS}`;

    try {
        const response = await axios.get(baseURL + endpoint);
        return response.data;
        
    } catch (error) {
        console.error('Error fetching mock data:', error);
        // return [];
    }
}

console.log(fetchMockData());
