import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfessionalFormComponent } from './user-professional-form.component';

describe('UserProfessionalFormComponent', () => {
  let component: UserProfessionalFormComponent;
  let fixture: ComponentFixture<UserProfessionalFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserProfessionalFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProfessionalFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
