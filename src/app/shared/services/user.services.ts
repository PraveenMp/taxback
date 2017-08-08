import { ITransaction } from './../interfaces/ITransaction';
import { Injectable } from '@angular/core'
import { Http, Response } from '@angular/http'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'

import { AppHelperService } from './../services/app-helper.services';

@Injectable()
export class UserService {
public httpHeaders;

    constructor(private http: Http, private appHelpersSvc: AppHelperService) {
      this.httpHeaders = this.appHelpersSvc.httpHeaders;
    }

    getAlltransactions(email: string) {
        return this.http.get(this.appHelpersSvc.apiAddress + email)
            .map((response: Response) => <ITransaction[]>response.json()).catch(this.handleError);
    }

    getTrasaction(email: string, id: string) {
        return this.http.get(this.appHelpersSvc.apiAddress + email + '/' + id,
            { headers: this.httpHeaders })
            .map((response: Response) => <ITransaction>response.json()).catch(this.handleError);
    }

    saveUser(user) {
        return this.http.post(this.appHelpersSvc.apiAddress + 'agent', JSON.stringify(user),
            { headers: this.httpHeaders })
            .map((response: Response) => <ITransaction>response.json()).catch(this.handleError);
    }

    updateUser(user) {
        return this.http.post(this.appHelpersSvc.apiAddress + 'agent', JSON.stringify(user),
            { headers: this.httpHeaders })
            .map((response: Response) => <ITransaction>response.json()).catch(this.handleError);
    }

    deleteAgent(email: string, id: string) {
        return this.http.delete(this.appHelpersSvc.apiAddress + 'email/' + id,
            { headers: this.httpHeaders })
            .map((response: Response) => <ITransaction>response.json()).catch(this.handleError);
    }

    public handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }


}
