import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CharacterService } from '../character-service';

@Component({
  selector: 'profile-details',
  templateUrl: './profile-main-details.component.html',
  styleUrl: './profile-main-details.component.css'
})
export class ProfileMainDetailsComponent {
  public profile: any;
  public profileData: any;
  public filmsData: any;
  public vehicleData: any;
  public starShipsData: any;

  constructor(private route: ActivatedRoute, public characterService: CharacterService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params :any) => {
      var name = params['name']; 
      this.getPeopleProfile(name);
    });
  }


  async getPeopleProfile(name: string): Promise<void>  {
    console.log(name);
    this.characterService.getPeople().subscribe(
      async (data: any[]) => {
        this.profile = data;
        this.profileData = this.profile.find((x: any) => x.name == name);
        if (this.profileData.films.length > 0) {
          this.filmsData = [];
          for (var i = 0; i < this.profileData.films.length; i++) {
            var films = await this.characterService.getCharcterSpecificData(this.profileData.films[i]).toPromise();
            if (films != undefined) {
              this.filmsData.push(films);
            }
          }
        }
        if (this.profileData.vehicles.length > 0) {
          this.vehicleData = [];
          for (var i = 0; i < this.profileData.vehicles.length; i++) {
            var vehicles = await this.characterService.getCharcterSpecificData(this.profileData.vehicles[i]).toPromise();
            if (vehicles != undefined) {
              this.vehicleData.push(vehicles);
            }
          }
        }
        if (this.profileData.starships.length > 0) {
          this.starShipsData = [];
          for (var i = 0; i < this.profileData.starships.length; i++) {
            var starships = await this.characterService.getCharcterSpecificData(this.profileData.starships[i]).toPromise();
            if (starships != undefined) {
              this.starShipsData.push(starships);
            }
          }
        }
      },
      (error) => {
        console.error('Error fetching characters', error);
      }
    );
  }
}
