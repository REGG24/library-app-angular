import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Client } from 'src/app/interfaces/client';
import { DeleteWarningComponent } from 'src/app/shared/modals/delete-warning/delete-warning.component';
import { ErrorComponent } from 'src/app/shared/modals/error/error.component';
import { ClientCreateComponent } from '../client-create/client-create.component';
import { ClientUpdateComponent } from '../client-update/client-update.component';
import { ClientService } from '../client.service';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements OnInit {
  public page = 1;
  public pageSize = 5;     
  clients: Client[] = [];
  clientsAUX: Client[] = [];
  reverse: boolean = false;

  constructor(
    private clientService: ClientService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.clientService.clientChanged$
    .subscribe(()=>{
      this.getClients();
    });
    this.getClients();
  }

  getClients(): void {
    this.clientService.getAll()
    .subscribe(
      response => {
        this.clients = response.data.clients;
        this.clientsAUX = [...this.clients];
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
      this.clients = this.clientsAUX.filter(clients => {
        return clients.name?.toLocaleLowerCase().match(inputValue?.toLocaleLowerCase());
      });
    }else if(inputValue == ""){
      this.clients = this.clientsAUX;
    } 
  }

  onOpenNewClientModal(): void {
    const modalRef = this.modalService.open(ClientCreateComponent);
    modalRef.result.then((result) => {
      console.log(result);
    }).catch((error) => {
      console.log(error);
    });
  }

  onEdit(idClient: number): void {
    this.clientService.read(idClient)
    .subscribe(
      response => {
        const modalRef = this.modalService.open(ClientUpdateComponent);
        modalRef.componentInstance.client = response.data.client;
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

  onDelete(idClient: number): void {
    const modalRef = this.modalService.open(DeleteWarningComponent);
    modalRef.componentInstance.id=idClient;
    modalRef.componentInstance.type="client";
    modalRef.result.then((result) => {
      console.log(result);
    }).catch((error) => {
      console.log(error);
    });
  }

  onSortDataByNumber(property: string): void {
    if(!this.reverse) {
      this.clients.sort((a: Client, b: Client)=> b[property] - a[property]);
      this.reverse = !this.reverse;
    }
    else if(this.reverse){
      this.clients.sort((a: Client, b: Client)=> a[property] - b[property]);
      this.reverse = !this.reverse
    }
  }

  onSortDataByString(property: string): void{
    this.reverse = !this.reverse;
    let direction = this.reverse ? 1 : -1;
    this.clients.sort(function (a, b){
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
