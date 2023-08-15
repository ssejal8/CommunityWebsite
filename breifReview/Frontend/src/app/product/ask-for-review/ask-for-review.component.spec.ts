import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AskForReviewComponent } from './ask-for-review.component';

describe('AskForReviewComponent', () => {
  let component: AskForReviewComponent;
  let fixture: ComponentFixture<AskForReviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AskForReviewComponent]
    });
    fixture = TestBed.createComponent(AskForReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
