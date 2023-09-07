import {HttpException, Injectable, Logger} from '@nestjs/common';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { map, catchError } from 'rxjs/operators';
import {ConfigService} from "@nestjs/config";

@Injectable()
export class HttpRequestsService {
    constructor(
        private readonly httpService: HttpService,
        private readonly configService: ConfigService,
        ) {}

    makeGetRequest(
        url: string,
        headers?: Record<string, string>,
    ): Observable<AxiosResponse> {
        return this.makeHttpRequest('GET', url, headers);
    }

    makePostRequest(
        url: string,
        data?: any,
        headers?: Record<string, string>,
    ): Observable<AxiosResponse> {
        return this.makeHttpRequest('POST', url, headers, data);
    }

    makePutRequest(
        url: string,
        data?: any,
        headers?: Record<string, string>,
    ): Observable<AxiosResponse> {
        return this.makeHttpRequest('PUT', url, headers, data);
    }

    makePatchRequest(
        url: string,
        data?: any,
        headers?: Record<string, string>,
    ): Observable<AxiosResponse> {
        return this.makeHttpRequest('PATCH', url, headers, data);
    }

    makeDeleteRequest(
        url: string,
        headers?: Record<string, string>,
    ): Observable<AxiosResponse> {
        return this.makeHttpRequest('DELETE', url, headers);
    }

    private makeHttpRequest(
        method: string,
        url: string,
        headers?: Record<string, string>,
        data?: any,
    ): Observable<AxiosResponse> {
        // Set default "application/json" header if not provided
        if (!headers) {
            headers = {
                'Content-Type': 'application/json',
            };
        } else if (!headers['Content-Type']) {
            headers['Content-Type'] = 'application/json';
        }

        // Configure the Axios request
        const requestConfig: AxiosRequestConfig = {
            method,
            url,
            headers,
            data,
            baseURL: this.configService.get('config.axiosBaseURL'),
            timeout: parseInt(this.configService.get('config.axiosTimeout')),
            maxRedirects: parseInt(this.configService.get('config.axiosMaxRedirects')),
        };

        Logger.debug(requestConfig, HttpRequestsService.name);

        // Make the HTTP request and return an Observable
        return this.httpService.request(requestConfig).pipe(
            map((response) => response.data),
            catchError((error) => {
                Logger.error('Error al realizar petición HTTP', HttpRequestsService.name);
                Logger.error(JSON.stringify(error));

                throw new HttpException(error.message, error.response.status);
            }),
        );
    }
}
