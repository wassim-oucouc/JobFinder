import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobsHeroSectionComponent } from './jobs-hero-section.component';

describe('JobsHeroSectionComponent', () => {
  let component: JobsHeroSectionComponent;
  let fixture: ComponentFixture<JobsHeroSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobsHeroSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobsHeroSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
