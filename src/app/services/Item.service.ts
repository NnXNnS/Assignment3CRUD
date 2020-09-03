import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import { Item } from '../constant/Item';

@Injectable({
	providedIn:'root'
})
export class ItemServices{
	private BASE_URL = 'https://5d60ae24c2ca490014b27087.mockapi.io/api/v1/items';
	constructor(private http: HttpClient){ 
	}
	getAllItem(){
		return this.http.get<Item[]>(`${this.BASE_URL}`);
	}
	deleteItem(itemId:string){
		return this.http.delete(`${this.BASE_URL}/${itemId}`);
	}
	getItemById(itemId:string){
		return this.http.get<Item>(`${this.BASE_URL}/${itemId}`);
	}
	updateItem(item:Item){
		return this.http.put(`${this.BASE_URL}/${item.id}`,item);
	}
	createItem(item:Item){
		return this.http.post(`${this.BASE_URL}`,item);
	}
}