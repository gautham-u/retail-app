export interface IProduct {
    id: number;
    name: string;
    description: string;
    price: number;
    pictureUrl: string;
    available: boolean;
    [key: string]: string | boolean | number;
}
