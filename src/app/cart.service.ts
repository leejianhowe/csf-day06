import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Item } from './item.model';

@Injectable()
export class CartService {
  constructor(private http: HttpClient) {}

  async getCart(): Promise<Item[]> {
    return await this.http
      // generic type <Item[]>
      .get<Item[]>('http://localhost:3000/cart', {
        headers: { Accept: 'application/json' },
      })
      .toPromise();
  }

  async getCartItem(itemId: string): Promise<Item> {
    return await this.http
      .get<Item>(`http://localhost:3000/cart/${itemId}`)
      .toPromise();
  }
  async updateItem(item): Promise<any> {
    // PUT /cart/:id
    return await this.http
      .put<any>(`http://localhost:3000/cart/${item.id}`, item)
      .toPromise();
  }

  async addItem(item): Promise<any> {
    return await this.http
      .post<any>(`http://localhost:3000/create`, item)
      .toPromise();
  }

  async deleteItem(item): Promise<any> {
    return await this.http
      .delete<any>(`http://localhost:3000/delete/${item.id}`)
      .toPromise();
  }
}
