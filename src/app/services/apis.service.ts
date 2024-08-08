import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApisService {

  constructor(private http:HttpClient) { }

  //api to fetch reciepe
  getAllRecipes(){
   return this.http.get('/assets/reciep.json')
  }
}
