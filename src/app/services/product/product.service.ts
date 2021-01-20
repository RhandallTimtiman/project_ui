import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ProductService {
  constructor(private http: HttpClient) {}

  /**
   * Get List Of product
   *
   * @return {*}  {Observable<any>}
   * @memberof GroupService
   */
  getListOfProduct(): Observable<any> {
    return this.http.get(`${environment.projectUrl}/api/product`);
  }

  /**
   * Add product
   *
   * @param {*} payload
   * @return {*}  {Observable<any>}
   * @memberof GroupService
   */
  addProduct(payload: any): Observable<any> {
    return this.http.post(`${environment.projectUrl}/api/product`, payload);
  }

  /**
   * Update Product
   *
   * @param {*} payload
   * @return {*}  {Observable<any>}
   * @memberof GroupService
   */
  updateProduct(payload: any): Observable<any> {
    return this.http.put(
      `${environment.projectUrl}/api/product/${payload.id}`,
      payload
    );
  }

  /**
   * Delete Product
   *
   * @param {*} id
   * @memberof GroupService
   */
  deleteProduct(id: any): Observable<any> {
    return this.http.delete(`${environment.projectUrl}/api/product/${id}`);
  }
}
