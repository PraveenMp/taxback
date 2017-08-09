import { Transaction } from './../shared/models/Transaction';
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
  public message: string;
  public delteMessage: string;
  public user = 'priya@gmail.com';
  pager: any = {};
  pagedItems: any[];
  public showForm: boolean;
  public transaction: Transaction;
  public currencyType: any;

  constructor(private userServices: UserService, private pagerService: PagerService) {

  }

  ngOnInit() {
    this.initialization();
    this.getAlltransactions();
  }

  initialization() {
    this.transaction = new Transaction();
    this.showForm = false;
    this.currencyType = ['INR', 'USD', 'GBP', 'EUR']
  }

  createNewTransaction() {
    this.transaction = new Transaction();
  }

  // Get All the transactions
  getAlltransactions() {
    this.userServices.getAlltransactions(this.user).subscribe(response => {
      if (response.length !== 0) {
        console.log(response)
        this.transactions = response;
        this.setPage(1);
      } else {
        this.errorMessage = true;
      }
    })
  }

  // on submit and update
  onSubmit() {
    if (this.transaction.id !== null || this.transaction.id !== undefined) {
         this.userServices.updateTransaction(this.transaction, this.user).subscribe(response => {
        if (response.length !== 0) {
          this.message = 'Your transaction updated successfully'
        this.showForm = false;
          this.createNewTransaction();
          this.getAlltransactions();
        } else {
          this.errorMessage = true;
        }
      })
    } else {
      this.userServices.saveTransaction(this.transaction, this.user).subscribe(response => {
        if (response.length !== 0) {
          this.message = 'Your transaction created successfully'
          this.showForm = false;
          this.createNewTransaction();
          this.getAlltransactions();

        } else {
          this.errorMessage = true;
        }
      })
    }
  }

  // update the trasactions
  updateTransaction(transaction) {
    this.transaction = transaction;
    this.showForm = true;
  }

  // Delete the Transactions
  deleteTransaction(transaction: Transaction) {
       this.userServices.deleteTransaction(transaction.id, this.user).subscribe(response => {
        if (response.length !== 0) {
          this.delteMessage = 'Your transaction is deleted succesfully '
          setTimeout(function () {
            this.delteMessage = null;
          }, 3000);

           this.getAlltransactions();
        } else {
          this.errorMessage = true;
        }
      })
  }
  cancel() {
    this.showForm = false;
    this.message = null;
    this.createNewTransaction();
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
