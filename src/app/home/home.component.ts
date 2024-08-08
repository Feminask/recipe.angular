// import { Component, OnInit } from '@angular/core';
// import { ApisService } from '../services/apis.service';

// @Component({
//   selector: 'app-home',
//   templateUrl: './home.component.html',
//   styleUrls: ['./home.component.css']
// })
// export class HomeComponent implements OnInit {
//   resList:any=[]
//   searchData:any=""
//   constructor(private service:ApisService){}
// ngOnInit(): void {
//   this.service.getAllRecipes().subscribe((response:any)=>{
//     // console.log(response.recipes);
//     this.resList=response.recipes
//     console.log(this.resList);
    
//   })
// }
// }

import { Component, OnInit } from '@angular/core';
import { ApisService } from '../services/apis.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  resList: any[] = [];
  filteredList: any[] = [];
  searchData: string = '';
  selectedFilter: string = 'All';

  constructor(private service: ApisService) {}

  ngOnInit(): void {
    this.service.getAllRecipes().subscribe((response: any) => {
      this.resList = response.recipes;
      this.applyFilters();
    });
  }

  applyFilters(): void {
    console.log('Applying filters with searchData:', this.searchData, 'and selectedFilter:', this.selectedFilter);

    this.filteredList = this.resList.filter(item => {
      const searchTerm = this.searchData.trim().toLowerCase();
      const matchesSearch = item.name.trim().toLowerCase().includes(searchTerm) ||
                            item.cuisine.trim().toLowerCase().includes(searchTerm);
      const matchesFilter = this.selectedFilter === 'All' || item.mealType.includes(this.selectedFilter);
      return matchesSearch && matchesFilter;
    });

    console.log('Filtered list:', this.filteredList);
  }

  filterRecipes(filter: string): void {
    this.selectedFilter = filter;
    this.applyFilters();
  }

  onSearchChange(searchTerm: string): void {
    this.searchData = searchTerm;
    this.applyFilters();
  }
}
