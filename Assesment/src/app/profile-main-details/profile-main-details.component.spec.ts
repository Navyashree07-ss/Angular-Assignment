import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileMainDetailsComponent } from './profile-main-details.component';

describe('ProfileMainDetailsComponent', () => {
  let component: ProfileMainDetailsComponent;
  let fixture: ComponentFixture<ProfileMainDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileMainDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProfileMainDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
