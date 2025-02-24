/*
 * :mod:`ApiConnector` -- Класс для работы с Api
 * ===================================
 * .. moduleauthor:: ilya Barinov <i-barinov@it-serv.ru>
 */


export default class ApiConnector {
    private baseUrl: string;

    constructor(routUrl: string) {
        this.baseUrl = `http://localhost:8000/${routUrl}/`;
    }

    private getToken(): string | null {
        // TODO: Пока localStorage в будущем думаю в куках хранить
        return localStorage.getItem('authToken');
    }

    private async request(method: string, endpoint: string, body: any = null): Promise<any> {
        const url = `${this.baseUrl}${endpoint}`;
        
        const headers: { [key: string]: string } = {
            'Content-Type': 'application/json',
        };

        const token = this.getToken();
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        const options: RequestInit = {
            method,
            body: body ? JSON.stringify(body) : null,
        };

        try {
            const response = await fetch(url, options);

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Error during API request:', error);
            throw error;
        }
    }
    public get(endpoint: string): Promise<any> {
        return this.request('GET', endpoint);
    }

    public post(endpoint: string, body: any): Promise<any> {
        return this.request('POST', endpoint, body);
    }

    public put(endpoint: string, body: any): Promise<any> {
        return this.request('PUT', endpoint, body);
    }

    public delete(endpoint: string): Promise<any> {
        return this.request('DELETE', endpoint);
    }
}

