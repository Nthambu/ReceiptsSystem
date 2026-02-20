import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class MessagingService {
  constructor(private messageService:MessageService){}
  handleError(err:any):void{
    this.messageService.add({severity:'error', summary:'Failed', detail:err?.error?.message ?? 'An error occured processing your request'});
  }
  handleSuccess(response:any):void{
 this.messageService.add({severity:'success', summary:'Success', detail:(response?.msg  || response?.message )?? 'success'})
  }
}
