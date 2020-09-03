import { Component, OnInit, ViewChild } from '@angular/core';
import {Item} from '../../constant/Item';
import {ItemServices} from '../../services/Item.service';
import { DatePipe } from '@angular/common';
import { NgbModal , ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { UUID } from 'angular2-uuid';
import { FormControl } from '@angular/forms';
import { utf8Encode } from '@angular/compiler/src/util';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  item:Item;
  dpick;
  listItems:Array<Item>;
  constructor(private modalService: NgbModal,private itemService:ItemServices) { 
    this.clearItem();
  }

  typeItems=["Dapur", 
    "Eletronik",
    "Buku",
    "Komputer",
    "Fashion"]
  closeResult: string;
  ngOnInit(): void {
    this.getAllItems();
  }
  
  
  openEdit(content,id) {
    this.itemService.getItemById(id).subscribe((v)=>{
      this.item=v;
      let updDate=new Date(this.item.expiredDate*1000);
      const obj = { year: updDate.getFullYear(), month: updDate.getMonth()+1, day: 
        updDate.getDate() };
      this.dpick= obj;
    });
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReasonEdit(reason,id)}`;
    });
  }
  
  private getDismissReasonEdit(reason: any,id): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else if(reason ==='save click'){
      let date:Date=new Date(this.dpick.year,this.dpick.month-1,this.dpick.day)
      this.item.expiredDate=date.getTime() / 1000;
      this.itemService.updateItem(this.item).subscribe((v)=>{
        this.clearItem();
        this.getAllItems();
      });
      return  `with: ${reason}`;
    }else{
      return `with: ${reason}`;
    }
  }
  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else if(reason ==='save click'){
      let date:Date=new Date(this.dpick.year,this.dpick.month-1,this.dpick.day)
      this.item.uuid=UUID.UUID();
      this.item.expiredDate=date.getTime() / 1000;
      this.itemService.createItem(this.item).subscribe((v)=>{
        this.clearItem();
        this.getAllItems();
      });
      return  `with: ${reason}`;
    }else if(reason==='Cancel'){
      this.clearItem();
      return `with: ${reason}`;
    }else{
      return `with: ${reason}`;
    }
  }
  clearItem(){
    this.item=new Item();
    this.item.typeItem="Dapur";
  }
  getAllItems(){
    this.itemService.getAllItem().subscribe((v)=>{
      this.listItems=v;
    });
  }
  deleteItem(id){
    this.itemService.getItemById(id).subscribe((v)=>{
      let item=v;
      if(confirm("are you sure delete "+item.name+"?")){
          this.itemService.deleteItem(item.id).subscribe((v)=>{
            this.getAllItems();
          });
      }else{
  
      }
    })

  }
}
