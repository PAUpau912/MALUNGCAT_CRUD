import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../api.service';
import { Product } from '../product';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-products',
  standalone: true,
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  imports: [FormsModule, CommonModule], // Keep FormsModule for data binding
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  selectedProduct: Product = new Product(0, '', 0);

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts(): void {
    this.apiService.readProducts().subscribe((products: Product[]) => {
      this.products = products;
      console.log("Products loaded:", this.products);
    });
  }

  createOrUpdateProduct(form: any): void {
    if (this.selectedProduct && this.selectedProduct.id) {
      // Update product
      this.apiService.updateProduct(this.selectedProduct).subscribe(() => {
        this.loadProducts();
        form.resetForm();
      });
    } else {
      // Create product
      this.apiService.createProduct(this.selectedProduct).subscribe(() => {
        this.loadProducts();
        form.resetForm();
      });
    }
  }

  selectProduct(product: Product): void {
    this.selectedProduct = product;
  }

  deleteProduct(id: number): void {
    this.apiService.deleteProduct(id).subscribe(() => {
      console.log("Product deleted");
      this.loadProducts();
    });
  }
}
