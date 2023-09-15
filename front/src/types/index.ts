export interface UserProps {
    id: number;
    alias: string;
    mail: string;
    phone: string;
}

export interface Error {
    error: string;
    props: string;
}