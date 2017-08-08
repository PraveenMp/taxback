import { ITransaction } from './../shared/interfaces/ITransaction';
import { UserService } from './../shared/services/user.services';
import { PagerService } from './../shared/services/pager.services';
import * as _ from 'underscore';

import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'user',
    templateUrl: './user.component.html',
})

export class UserComponent implements OnInit {
  public transactions: ITransaction[] = [];
  public errorMessage: boolean;
  public user = 'priya@gmail.com';
  pager: any = {};
  pagedItems: any[];
  public showForm: boolean;

  constructor(private userServices: UserService, private pagerService: PagerService) {

    }

     ngOnInit() {
       this.showForm = false;
       this.getAlltransactions();
     }

     // Get All the transactions
     getAlltransactions() {
        this.userServices.getAlltransactions(this.user).subscribe(response => {
            if (response.length !== 0) {
                this.transactions = response;
                 this.setPage(1);
            } else {
                this.errorMessage = true;
            }
        })
     }



      setPage(page: number) {
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }

        // get pager object from service
        this.pager = this.pagerService.getPager(this.transactions.length, page, 3);

        // get current page of items
        this.pagedItems = this.transactions.slice(this.pager.startIndex, this.pager.endIndex + 1);
    }
}
