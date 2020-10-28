import axios from 'axios';

export default class HttpService {
    private baseUrl: string;

    constructor() {
        this.baseUrl = process.env.NODE_ENV === 'production' ? 'http://31.220.63.12' : 'http://localhost:4000';
    }

    async get(path: string, headers?: any) {
        return await axios.get(this.baseUrl + path, {
            headers: headers
        });
    }

    async post(path: string, data: any, headers?: any) {
        return await axios.post(this.baseUrl + path, data, {
            headers: headers
        })
    }
}