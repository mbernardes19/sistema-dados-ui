import axios from 'axios';

export default class HttpService {
    private baseUrl: string;

    constructor() {
        this.baseUrl = process.env.NODE_ENV === 'production' ? 'https://plasser.iguacuservicos.com.br' : 'http://localhost:5000';
    }

    async get(path: string, headers?: any, params?: any) {
        return await axios.get(this.baseUrl + path, {
            headers: headers,
            params: params
        });
    }

    async post(path: string, data: any, headers?: any) {
        return await axios.post(this.baseUrl + path, data, {
            headers: headers
        })
    }
}