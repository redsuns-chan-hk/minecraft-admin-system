import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplyDuplicatedComponent } from './apply-duplicated.component';

describe('ApplyDuplicatedComponent', () => {
  let component: ApplyDuplicatedComponent;
  let fixture: ComponentFixture<ApplyDuplicatedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplyDuplicatedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplyDuplicatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
