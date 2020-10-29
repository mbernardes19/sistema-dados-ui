import Enterprise from "./enterprise";

export default interface User {
    id: number,
    name: string,
    email: string,
    isAdmin: boolean,
    enterprise: Enterprise
}