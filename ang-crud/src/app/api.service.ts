import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from './product';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  PHP_API_SERVER = "http://localhost/angphpmysql/api/";

  constructor(private httpClient: HttpClient) {}

  readProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(`${this.PHP_API_SERVER}/index.php`);
  }

  createProduct(product: Product): Observable<Product> {
    return this.httpClient.post<Product>(`${this.PHP_API_SERVER}/create_product.php`, product);
  }

  updateProduct(product: Product): Observable<Product> {
    return this.httpClient.put<Product>(`${this.PHP_API_SERVER}/update_product.php`, product);
  }

  deleteProduct(id: number): Observable<Product> {
    return this.httpClient.delete<Product>(`${this.PHP_API_SERVER}/delete_product.php/?id=${id}`);
  }
}
