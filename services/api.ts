import HttpService from "./http";

type LoginCredentials = {
    email: string,
    password: string
}

type RegistrationCredentials = {
    email: string,
    name: string,
    enterpriseName: string,
    isAdmin: boolean
}

export default class ApiService {
    private static httpService: HttpService = new HttpService();

    static async updateSystemData(file: File) {
        const bodyFormData = new FormData();
        bodyFormData.append('file', file);

        return await this.httpService.post('/data', bodyFormData, {
            headers: {'Content-Type': 'multipart/form-data'}
        })
    }

    static async login(loginCredentials: LoginCredentials) {
        return await this.httpService.post('/auth/login', loginCredentials, {
            'Content-Type': 'application/json'
        })
    }

    static async register(registrationCredentials: RegistrationCredentials) {
        return await this.httpService.post('/register', registrationCredentials, {
            'Content-Type': 'application/json'
        })
    }

    static async getUser(accessToken: string) {
        return await this.httpService.get('/user', { 'Authorization': `Bearer ${accessToken}`})
    }

    static async getMenu(accessToken: string) {
        return await this.httpService.get('/menu', { 'Authorization': `Bearer ${accessToken}`})
    }

}