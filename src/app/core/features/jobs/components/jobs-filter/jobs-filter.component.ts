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

  @Input() availableLevels: string[] = ["Senior Level", "Mid Level", "Entry Level"];

  @Input() availableLocations: string[] = [];

  @Output() valueChange: EventEmitter<string> = new EventEmitter();

  filtersValidated: any = {
    level: "",
    location: "",
    company: "",
  };

  searchValue: string = "";

  @Output() filterChange: EventEmitter<any> = new EventEmitter();

  selectedLevel: string = '';

  selectedLocation: string = '';

  selectedCompany: string = '';


  isSearchActive: boolean = false;


  onSearch() {
    this.valueChange.emit(this.searchValue);
  }


  searchKeyword($event: any) {
    this.searchValue = ($event.target as HTMLInputElement).value;
    this.valueChange.emit(this.searchValue)
  }


  clearSearch() {
    this.searchValue = "";

    this.valueChange.emit(this.searchValue);

  }


  onFilterChange() {

    this.filtersValidated.company = this.selectedCompany;
    this.filtersValidated.location = this.selectedLocation;
    this.filtersValidated.level = this.selectedLevel;

    this.filterChange.emit(this.filtersValidated);


  }

  applyFilters() {
    this.filtersValidated.company = this.selectedCompany;
    this.filtersValidated.location = this.selectedLocation;
    this.filtersValidated.level = this.selectedLevel;

    this.filterChange.emit(this.filtersValidated);
  }

  resetFilters() {

    this.selectedCompany = "";
    this.selectedLevel = "";
    this.selectedLocation= "";

    this.filterChange.emit({company: this.selectedCompany,
      location: this.selectedLocation,
      level: this.selectedLevel});


  }





}
