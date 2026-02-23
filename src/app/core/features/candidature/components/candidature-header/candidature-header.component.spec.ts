import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidatureHeaderComponent } from './candidature-header.component';

describe('CandidatureHeaderComponent', () => {
  let component: CandidatureHeaderComponent;
  let fixture: ComponentFixture<CandidatureHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CandidatureHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CandidatureHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
