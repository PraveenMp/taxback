import { Transaction } from './../models/Transaction';
import { ITransaction } from './../interfaces/ITransaction';
import { Injectable } from '@angular/core'
import { Http, Response, URLSearchParams } from '@angular/http'
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
        return this.http.get(this.appHelpersSvc.apiAddress + email + '/' + id)
            .map((response: Response) => <ITransaction>response.json()).catch(this.handleError);
    }

    saveTransaction(transaction: Transaction, email: string) {

          const params = new FormData()
          params.append('amount', transaction.amount);
          params.append('currency', transaction.currency);
          params.append('txn_date', transaction.txn_date);

          return this.http.post(this.appHelpersSvc.apiAddress + email, params)
            .map((response: Response) => <ITransaction>response.json()).catch(this.handleError);
    }

    updateTransaction(transaction: Transaction, email: string) {

          const params = new FormData()
          params.append('amount', transaction.amount);
          params.append('currency', transaction.currency);
          params.append('txn_date', transaction.txn_date);

          return this.http.post(this.appHelpersSvc.apiAddress + email + '/' + transaction.id, params)
            .map((response: Response) => <ITransaction>response.json()).catch(this.handleError);
    }

    deleteTransaction(id: string, email: string) {
        return this.http.delete(this.appHelpersSvc.apiAddress + email + '/' + id)
            .map((response: Response) => <ITransaction>response.json()).catch(this.handleError);
    }

    public handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }


}
