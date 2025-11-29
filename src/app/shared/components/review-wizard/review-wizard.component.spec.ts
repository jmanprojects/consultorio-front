import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewWizardComponent } from './review-wizard.component';

describe('ReviewWizardComponent', () => {
  let component: ReviewWizardComponent;
  let fixture: ComponentFixture<ReviewWizardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReviewWizardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReviewWizardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
