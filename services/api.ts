import HttpService from "./http";
import Enterprise from "../model/enterprise";
import Order from "../model/order";
import { AxiosResponse } from "axios";
import { PaginationResponse } from "./interfaces/pagination-response";

type LoginCredentials = {
    email: string,
    password: string
}

type RegistrationCredentials = {
    email: string,
    name: string,
    password: string,
    enterpriseName: string,
    isAdmin: boolean
}

export default class ApiService {
    private static httpService: HttpService = new HttpService();

    static async updateSystemData(file: File) {
        const bodyFormData = new FormData();
        bodyFormData.append('file', file);

        return await this.httpService.post(`/data/start`, bodyFormData, {
            headers: {'Content-Type': 'multipart/form-data'}
        })
    }

    static async checkIfSpreadsheetIsValid(file: File) {
        const bodyFormData = new FormData();
        bodyFormData.append('file', file);

        const response = await this.httpService.post(`/data/check`, bodyFormData, {
            headers: {'Content-Type': 'multipart/form-data'}
        })
        return response.data;
    }

    static async checkIfUpdateIsDone(): Promise<string> {
        const response = await this.httpService.get('/data/status')
        return response.data;
    }

    static async login(loginCredentials: LoginCredentials) {
        return await this.httpService.post('/auth/login', loginCredentials, {
            'Content-Type': 'application/json'
        })
    }

    static async register(registrationCredentials: RegistrationCredentials) {
        const response = await this.httpService.post('/register', registrationCredentials, {
            'Content-Type': 'application/json'
        })
        return response.data;
    }

    static async getUser(accessToken: string) {
        return await this.httpService.get('/user', { 'Authorization': `Bearer ${accessToken}`})
    }

    static async getMenu(accessToken: string) {
        return await this.httpService.get('/menu', { 'Authorization': `Bearer ${accessToken}`})
    }

    static async getAllEnterprises(accessToken: string): Promise<Enterprise[]> {
        const response = await this.httpService.get('/enterprise', { 'Authorization': `Bearer ${accessToken}`})
        return response.data as Enterprise[]
    }

    static async getUserOrders(accessToken: string, page?: number): Promise<PaginationResponse<Order>> {
        page = page ? page : 1;
        const response = await this.httpService.get(`/user/orders?page=${page}&limit=100`, { 'Authorization': `Bearer ${accessToken}`})
        return response.data;
    }

    static async getEnterpriseOrders(accessToken: string, enterpriseName?: string, page?: number): Promise<PaginationResponse<Order>> {
        page = page ? page : 1;
        const response = await this.httpService.get(`/enterprise/orders?page=${page}&limit=50`, { 'Authorization': `Bearer ${accessToken}`}, { enterpriseName })
        return response.data;
    }

    static async getOrder(accessToken: string, orderNumber: string): Promise<Order> {
        const response = await this.httpService.get(`/order/${orderNumber}`, { 'Authorization': `Bearer ${accessToken}`})
        return response.data as Order;
    }
}