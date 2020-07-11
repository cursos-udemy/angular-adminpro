import {Component, OnInit} from '@angular/core';
import {UserModel} from "../../../models/user.model";
import {UserService} from "../../../services/user.service";
import {DataPaginator} from "../../../models/paginator";
import Swal from "sweetalert2";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: []
})
export class UsersComponent implements OnInit {

  public itemsPerPage: number = 3;
  public currentPage: number = 1;
  public totalItems: number = 0;
  public users: UserModel[] = [];
  public loading: boolean = false;

  public searchText: string;

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.getUsers(this.currentPage, this.itemsPerPage);
  }

  public onPageChange(event: number) {
    this.currentPage = event;
    if (this.searchText && this.searchText.trim().length > 0) {
      this.searchUsers(this.searchText, this.currentPage, this.itemsPerPage);
    } else {
      this.getUsers(this.currentPage, this.itemsPerPage);
    }
  }

  public onKeyUpSearchText() {
    if (this.searchText && this.searchText.trim().length > 0) {
      this.searchUsers(this.searchText.trim(), 1, this.itemsPerPage);
    } else {
      this.getUsers(this.currentPage, this.itemsPerPage);
    }
  }

  private getUsers(page: number, limit: number) {
    this.loading = true;
    this.userService.find(page, limit).subscribe(
      paginator => {
        this.handlePaginator(paginator);
        this.loading = false
      },
      err => this.loading = false,
    );
  }

  private searchUsers(text: string, page: number, limit: number) {
    this.loading = true;
    this.userService.search(text, page, limit).subscribe(
      paginator => {
        this.handlePaginator(paginator);
        this.loading = false
      },
      err => this.loading = false,
    );
  }

  private handlePaginator(paginator: DataPaginator): void {
    this.currentPage = paginator.page;
    this.totalItems = paginator.totalDocs;
    this.users = (paginator.docs as UserModel[]);
  }
}
