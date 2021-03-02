import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberApplicationComponent } from './member-application.component';

describe('MemberApplicationComponent', () => {
  let component: MemberApplicationComponent;
  let fixture: ComponentFixture<MemberApplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemberApplicationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
