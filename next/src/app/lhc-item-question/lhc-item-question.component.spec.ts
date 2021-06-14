import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LhcItemQuestionComponent } from './lhc-item-question.component';
import { LhcItemQuestionTextComponent } from '../lhc-item-question-text/lhc-item-question-text.component';

describe('LhcItemQuestionComponent', () => {
  let component: LhcItemQuestionComponent;
  let fixture: ComponentFixture<LhcItemQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ 
        LhcItemQuestionComponent,
        LhcItemQuestionTextComponent 
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LhcItemQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
