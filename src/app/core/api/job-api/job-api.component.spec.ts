import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobApiComponent } from './job-api.component';

describe('JobApiComponent', () => {
  let component: JobApiComponent;
  let fixture: ComponentFixture<JobApiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobApiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
