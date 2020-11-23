import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Item } from './item.model';
import { CartService } from './cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  contents: Item[];
  selectedItem: Item;

  // HttpClient - Service, Dependency Injection
  // typescript provides angular with shortcut
  // this attribute can only be used in this class
  // public can be used outside the class
  // no private/public can only be used inside the constructor
  constructor(private http: HttpClient, private CartService: CartService) {}

  async ngOnInit(): Promise<void> {
    // wait for server to resp with content
    this.contents = await this.CartService.getCart();
    console.log('contents', this.contents);
  }

  async getId(itemId: string) {
    console.log('selected itemId', itemId);
    this.selectedItem = await this.CartService.getCartItem(itemId);
    console.log('response from server', this.selectedItem);
  }
  async updateItem(item: Item) {
    console.log('updated Item', item);
    this.CartService.updateItem(item);
    this.contents = await this.CartService.getCart()
  }
  
  async addItem(item: Item) {
    console.log('add Item', item);
    this.CartService.addItem(item);
    this.contents = await this.CartService.getCart()
  }
  
  async deleteItem(item: Item) {
    console.log('delete item', item)
    // delete request
    this.CartService.deleteItem(item)
    this.contents = await this.CartService.getCart()
  }
}
