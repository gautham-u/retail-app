import {IProduct} from "../models/IProduct";

class ProductService {

    private basePath: string;

    constructor(basePath: string) {
        this.basePath = basePath;
    }

    async getAllProducts(): Promise<IProduct[]> {

        const url = this.basePath + '/products/';

        const response = await fetch(url);

        if (response.ok) {
            return Promise.resolve(response.json());
        }
        return Promise.reject('Could not fetch products');
    }

    async getProductById(id: string): Promise<IProduct> {

        const url = this.basePath + '/products/' + id;

        const response = await fetch(url);

        if (response.ok) {
            return Promise.resolve(response.json());
        }
        return Promise.reject('Could not fetch the product');
    }

    async addNewProduct(product: IProduct): Promise<IProduct> {

        const url = this.basePath + '/products/add';

        const headers = new Headers();
        headers.append('content-type','application/json');

        const response = await fetch(url, {
            method: 'POST',
            headers,
            body: JSON.stringify(product)
        });

        if (response.ok) {
            return Promise.resolve(response.json());
        }
        return Promise.reject('Could not add the product');
    }

    async updateProduct(product: IProduct): Promise<IProduct> {

        const url = this.basePath + '/products/edit/' + product.id;

        const headers = new Headers();
        headers.append('content-type','application/json');

        const response = await fetch(url, {
            method: 'PUT',
            headers,
            body: JSON.stringify(product)
        });

        if (response.ok) {
            return Promise.resolve(response.json());
        }
        return Promise.reject('Could not update the product');
    }

}

export default new ProductService('http://localhost:8080/api');
