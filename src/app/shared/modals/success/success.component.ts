import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomResponse } from 'src/app/interfaces/custom-resonse';


@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css']
})
export class SuccessComponent implements OnInit {
  @Input() response: CustomResponse;

  status: string;
  message: string;
  
  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {  
    this.status = "Great!";
    this.message = this.response.message;
  }

  closeModal() {
    this.activeModal.close('Modal Closed');
  }
  
}
