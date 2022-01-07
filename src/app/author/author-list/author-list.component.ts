import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Author } from 'src/app/interfaces/author';
import { DeleteWarningComponent } from 'src/app/shared/modals/delete-warning/delete-warning.component';
import { ErrorComponent } from 'src/app/shared/modals/error/error.component';
import { AuthorCreateComponent } from '../author-create/author-create.component';
import { AuthorUpdateComponent } from '../author-update/author-update.component';
import { AuthorService } from '../author.service';

@Component({
  selector: 'app-author-list',
  templateUrl: './author-list.component.html',
  styleUrls: ['./author-list.component.css']
})
export class AuthorListComponent implements OnInit {
  public page = 1;
  public pageSize = 5;     
  authors: Author[] = [];
  authorsAUX: Author[] = [];
  reverse: boolean = false;

  constructor(
    private authorService: AuthorService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.authorService.authorChanged$
    .subscribe(()=>{
      this.getAuthors();
    });
    this.getAuthors();
  }

  getAuthors(): void {
    this.authorService.getAll()
    .subscribe(
      response => {
        this.authors = response.data.authors;
        this.authorsAUX = [...this.authors];
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
      this.authors = this.authorsAUX.filter(authors => {
        return authors.name?.toLocaleLowerCase().match(inputValue?.toLocaleLowerCase());
      });
    }else if(inputValue == ""){
      this.authors = this.authorsAUX;
    } 
  }

  onOpenNewAuthorModal(): void {
    const modalRef = this.modalService.open(AuthorCreateComponent);
    modalRef.result.then((result) => {
      console.log(result);
    }).catch((error) => {
      console.log(error);
    });
  }

  onEdit(idAuthor: number): void {
    this.authorService.read(idAuthor)
    .subscribe(
      response => {
        const modalRef = this.modalService.open(AuthorUpdateComponent);
        modalRef.componentInstance.author = response.data.author;
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

  onDelete(idAuthor: number): void {
    const modalRef = this.modalService.open(DeleteWarningComponent);
    modalRef.componentInstance.id=idAuthor;
    modalRef.componentInstance.type="author";
    modalRef.result.then((result) => {
      console.log(result);
    }).catch((error) => {
      console.log(error);
    });
  }

  onSortDataByNumber(property: string): void {
    if(!this.reverse) {
      this.authors.sort((a: Author, b: Author)=> b[property] - a[property]);
      this.reverse = !this.reverse;
    }
    else if(this.reverse){
      this.authors.sort((a: Author, b: Author)=> a[property] - b[property]);
      this.reverse = !this.reverse
    }
  }

  onSortDataByString(property: string): void{
    this.reverse = !this.reverse;
    let direction = this.reverse ? 1 : -1;
    this.authors.sort(function (a, b){
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
