import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPersonalFormComponent } from './user-personal-form.component';

describe('UserPersonalFormComponent', () => {
  let component: UserPersonalFormComponent;
  let fixture: ComponentFixture<UserPersonalFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserPersonalFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserPersonalFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
