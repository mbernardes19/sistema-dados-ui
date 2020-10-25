import HttpService from "./http";

export default class ApiService {

    static async updateSystemData(file: File) {
        const httpService = new HttpService();
        const bodyFormData = new FormData();
        bodyFormData.append('file', file);

        return await httpService.post('/data', bodyFormData, {
            headers: {'Content-Type': 'multipart/form-data'}
        })
    }

}