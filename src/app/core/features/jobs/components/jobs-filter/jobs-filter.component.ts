import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-jobs-filter',
  imports: [CommonModule, FormsModule],
  standalone : true,
  templateUrl: './jobs-filter.component.html',
  styleUrl: './jobs-filter.component.css'
})
export class JobsFilterComponent {


  @Input() availableCompanies: string[] = [];

  @Input() availableLevels: string[] = ["Senior Level","Mid Level","Entry Level"];

@Input() availableLocations : string[] = [];

@Output() valueChange: EventEmitter<string> = new EventEmitter();

  selectedLevel : string = '';

  selectedLocation : string = '';

  selectedCompany : string = '';


  isSearchActive : boolean = false;





  onSearch(){

  }

  searchKeyword($event : any)
  {
    console.log($event.target.value);
    this.valueChange.emit($event);
  }


  clearSearch()
  {

  }






  onFilterChange(){

  }

  applyFilters()
  {

  }

  resetFilters()
  {

  }




}
