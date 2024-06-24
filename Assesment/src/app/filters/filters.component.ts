import { Component, booleanAttribute, ChangeDetectorRef } from '@angular/core';
import {  ViewChild, OnInit, OnDestroy, ViewEncapsulation, Injector, Input, ViewContainerRef, ElementRef, AfterViewInit } from '@angular/core';
import { DropDownListComponent } from '@progress/kendo-angular-dropdowns';
import { Router } from '@angular/router';
import { CharacterService } from '../character-service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.css',
})

export class FiltersComponent {
  @ViewChild('moviedropdownList', { static: false }) public moviedropdownList!: DropDownListComponent;
  @ViewChild('speciesdropdownList', { static: false }) public speciesdropdownList!: DropDownListComponent;
  @ViewChild('vechicledropdownList', { static: false }) public vechicledropdownList!: DropDownListComponent;
  @ViewChild('starShipdropdownList', { static: false }) public starShipdropdownList!: DropDownListComponent;
  @ViewChild('birthYeardropdownList', { static: false }) public birthYeardropdownList!: DropDownListComponent;

  public people: any = [];
  public species: any = [];
  public onlySpecies: string[] = [];
  public Vehicles: any = [];
  public onlyVehicles: string[] = [];
  public movies: any = [];
  public moviedropListValues: string[] = [];
  public starships: any = [];
  public starShipDropListValues: string[] = [];
  public birthYears: any[] = [];
  public birthyearDropListValues: any[] = [];
  public selectedMovieNames: string = "";
  public originalData: any = [];

  constructor(private router: Router, public characterService: CharacterService, private cdr: ChangeDetectorRef) {
    this.peoples();
    this.getSpecies();
    this.getVehicles();
    this.getMovies();
    this.getStarShips();
  }

  async peoples(): Promise<void> {
    console.log('Fetching characters...');
    try {
      const data = await this.characterService.getPeople().toPromise();
      this.people = data;
      let SIcount: number = 1;

      for (var x of this.people) {
        x.speciesLength = 'species' + x.species.length;
        x.SINo = SIcount++;
        if (x.species.length > 0) {
          var species = await this.characterService.getCharcterSpecificData(x.species[0]).toPromise();
          x.speciesData = species;
        }
           
        if (x.films.length > 0) {
          x.filmsData = [];
          for (var i = 0; i < x.films.length; i++) {
            var films = await this.characterService.getCharcterSpecificData(x.films[i]).toPromise();
            if (films != undefined) {
              x.filmsData.push(films);
            }
          }
        }

        this.birthYears.push({ isSelected: false, birthYear: x.birth_year });
        this.originalData = [];
        this.originalData = this.people
      }

      this.birthyearDropListValues = this.birthYears.map((item: { birthYear: string }) => item.birthYear);
    } catch (error) {
      console.error('Error fetching characters', error);
    }
    // this.router.navigate(['./profile-details']);
  }

  public onSearch() {
    let temp: any = [];
    for (var j = 0; j < this.originalData.length; j++) {
      for (var i = 0; i < this.originalData[j].filmsData.length; i++) {
        if (this.originalData[j].filmsData[i].title == this.movies.find((x: any) => x.isSelected).title) {
          temp.push(this.originalData[j]);
        }
      }
    }
   
    setTimeout(() => {
    this.people = temp; // Assign a new array to trigger change detection
      this.cdr.detectChanges(); // Trigger change detection manually
    }, 0);
   
  }

  getSpecies(): any{
    this.characterService.getSpecies().subscribe(
      (data: any[]) => {
        this.species = data;
        this.onlySpecies = this.species.map((item: { name: string }) => item.name);
        this.species.forEach((x: any) => { x.isSelected = false })
      },
      (error) => {
        console.error('Error fetching species', error);
      }
    );
  }

  getMovies(): any {
    this.characterService.getMovies().subscribe(
      (data: any[]) => {
        this.movies = data;
        this.moviedropListValues = this.movies.map((item: { title: string }) => item.title);
        this.movies.forEach((x: any) => { x.isSelected = false })
      },
      (error) => {
        console.error('Error fetching species', error);
      }
    );
  }

  getStarShips(): any {
    this.characterService.getStarShips().subscribe(
      (data: any[]) => {
        this.starships = data;
        this.starShipDropListValues = this.starships.map((item: { name: string }) => item.name);
        this.starships.forEach((x: any) => { x.isSelected = false })
      },
      (error) => {
        console.error('Error fetching species', error);
      }
    );
  }


  getVehicles(): any {
    this.characterService.getVehicle().subscribe(
      (data: any[]) => {
        this.Vehicles = data;
        this.onlyVehicles = this.Vehicles.map((item: { name: string }) => item.name);
        this.Vehicles.forEach((x: any) => { x.isSelected = false })
      },
      (error) => {
        console.error('Error fetching species', error);
      }
    );
  }

 
 
  public onMovieDropDownListClose(event: any): void {
    event.preventDefault();
    if (this.moviedropdownList.wrapper.nativeElement.contains(document.activeElement)) {
      this.moviedropdownList.toggle(false);
    }
  }

  public onSpeciesDropDownListClose(event: any): void {
    event.preventDefault();
    if (this.speciesdropdownList.wrapper.nativeElement.contains(document.activeElement)) {
      this.speciesdropdownList.toggle(false);
    }
  }

  public onVechicleDropDownListClose(event: any): void {
    event.preventDefault();
    if (this.vechicledropdownList.wrapper.nativeElement.contains(document.activeElement)) {
      this.vechicledropdownList.toggle(false);
    }
  }

  public onStartShioDropDownListClose(event: any): void {
    event.preventDefault();
    if (this.starShipdropdownList.wrapper.nativeElement.contains(document.activeElement)) {
      this.starShipdropdownList.toggle(false);
    }
  }


  public onBirthYearDropDownListClose(event: any): void {
    event.preventDefault();
    if (this.birthYeardropdownList.wrapper.nativeElement.contains(document.activeElement)) {
      this.birthYeardropdownList.toggle(false);
    }
  }

  public onItemSelected(event:any) {
   
  }
  public selectOrUnselectAllSites(event: any, item: any): void {
    item.checked = (event.target as HTMLInputElement).checked;
  }

  public selectOrUnselectMovies(event: any, item: any): void {
    var checked = (event.target as HTMLInputElement).checked;
    this.movies.find((x: any) => x.title == item).isSelected = checked;
    this.selectedMovieNames = this.movies.filter((y:any) => y.isSelected).map((x:any) => x.title).join(',')
  }

  public selectOrUnselectSpecies(event: any, item: any): void {
    var checked = (event.target as HTMLInputElement).checked;
    this.species.find((x: any) => x.name == item).isSelected = checked;
  }

  public selectOrUnselectVehicle(event: any, item: any): void {
    var checked = (event.target as HTMLInputElement).checked;
    this.Vehicles.find((x: any) => x.name == item).isSelected = checked;
  }

  public selectOrUnselectStarShips(event: any, item: any): void {
    var checked = (event.target as HTMLInputElement).checked;
    this.starships.find((x: any) => x.name == item).isSelected = checked;
  }

  public selectOrUnselectBirthYear(event: any, item: any): void {
    var checked = (event.target as HTMLInputElement).checked;
    this.birthYears.find((x: any) => x.birthYear == item).isSelected = checked;
  }

  public contentColor: string = "#787878";

  public dblClickEvent(event: any) {
    const target = event.target || event.srcElement || event.currentTarget;
    const tr = target.closest('tr'); // Get the closest row element
    if (tr) {
      var rowIndex = tr.rowIndex; // Get the row index
      var rowData = this.people[rowIndex]; // Get the data for the row
    }
    this.router.navigate(["/profile-details"], { queryParams: { name: rowData.name } });
  }
  
}

