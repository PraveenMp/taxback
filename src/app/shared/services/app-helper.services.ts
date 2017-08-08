import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

@Injectable()
export class AppHelperService {

    private _httpHeaders: Headers;
    public get httpHeaders(): Headers {
        this._httpHeaders = new Headers({
            'Content-Type': 'application/json',
            'dataType': 'json',
            'crossDomain': 'true',
        });
        return this._httpHeaders;
    }

    private _apiAddress: string;
    public get apiAddress(): string {
        this._apiAddress = 'https://jointhecrew.in/api/txns/';
        return this._apiAddress;
    }

}
