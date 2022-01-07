import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Book } from 'src/app/interfaces/book';
import { DeleteWarningComponent } from 'src/app/shared/modals/delete-warning/delete-warning.component';
import { ErrorComponent } from 'src/app/shared/modals/error/error.component';
import { BookCreateComponent } from '../book-create/book-create.component';
import { BookUpdateComponent } from '../book-update/book-update.component';
import { BookService } from '../book.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  public page = 1;
  public pageSize = 5;     
  books: Book[] = [];
  booksAUX: Book[] = [];
  reverse: boolean = false;

  constructor(
    private bookService: BookService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.bookService.bookChanged$
    .subscribe(()=>{
      this.getBooks();
    });
    this.getBooks();
  }

  getBooks(): void {
    this.bookService.getAll()
    .subscribe(
      response => {
        this.books = response.data.books;
        this.booksAUX = [...this.books];
      },
      error => {
        console.log(error);
        this.openErrorModal(error);
      }
    )
  }

  searchByName(event: Event){ 
    const inputValue = (<HTMLInputElement>event.target).value;
    if(inputValue != ""){
      this.books = this.booksAUX.filter(books => {
        return books.name?.toLocaleLowerCase().match(inputValue?.toLocaleLowerCase());
      });
    }else if(inputValue == ""){
      this.books = this.booksAUX;
    } 
  }

  onOpenNewBookModal(): void {
    const modalRef = this.modalService.open(BookCreateComponent);
    modalRef.result.then((result) => {
      console.log(result);
    }).catch((error) => {
      console.log(error);
    });
  }

  onEdit(idBook: number): void {
    this.bookService.read(idBook)
    .subscribe(
      response => {
        const modalRef = this.modalService.open(BookUpdateComponent);
        modalRef.componentInstance.book = response.data.book;
        modalRef.result.then((result) => {
          console.log(result);
        }).catch((error) => {
          console.log(error);
        });
      },
      error => {
        console.log( error.message);
      }
    );    
  }

  onDelete(idBook: number): void {
    const modalRef = this.modalService.open(DeleteWarningComponent);
    modalRef.componentInstance.id=idBook;
    modalRef.componentInstance.type="book";
    modalRef.result.then((result) => {
      console.log(result);
    }).catch((error) => {
      console.log(error);
    });
  }

  onSortDataByNumber(property: string): void {
    if(!this.reverse) {
      this.books.sort((a: Book, b: Book)=> b[property] - a[property]);
      this.reverse = !this.reverse;
    }
    else if(this.reverse){
      this.books.sort((a: Book, b: Book)=> a[property] - b[property]);
      this.reverse = !this.reverse
    }
  }

  onSortDataByString(property: string): void{
    this.reverse = !this.reverse;
    let direction = this.reverse ? 1 : -1;
    this.books.sort(function (a, b){
      if(a[property] < b[property]){
        return -1 * direction;
      }
      else if(a[property] > b[property]){
        return 1 * direction;
      }else{
        return 0;
      }
    })
  }

  openErrorModal(error: Error): void {
    const modalRef = this.modalService.open(ErrorComponent);
    modalRef.componentInstance.error = error;
    modalRef.result.then((result) => {
      console.log("modal",result);
    }).catch((error) => {
      console.log(error);
    });
  }

}
