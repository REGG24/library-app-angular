import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomResponse } from 'src/app/interfaces/custom-resonse';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {
  @Input() error: Error | CustomResponse;

  status: string;
  message: string;
  
  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
    if(typeof(this.error) === 'function'){
      this.status = (<Error>this.error).name;
    }else{
      this.status = (<CustomResponse>this.error).status
    }  
    this.message = this.error.message;
  }

}
