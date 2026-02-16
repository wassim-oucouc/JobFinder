import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileInformationsEditComponent } from './profile-informations-edit.component';

describe('ProfileInformationsEditComponent', () => {
  let component: ProfileInformationsEditComponent;
  let fixture: ComponentFixture<ProfileInformationsEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileInformationsEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileInformationsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
