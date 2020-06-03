import { Component, OnInit, ViewChild } from '@angular/core';
import { UserPersonalFormComponent } from '../user-personal-form/user-personal-form.component';
import { FormBuilder, FormGroup, Validators, AbstractControl, FormControl } from '@angular/forms';
import { UserProfessionalFormComponent } from '../user-professional-form/user-professional-form.component';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css'],

})
export class UserRegistrationComponent implements OnInit {
  @ViewChild(UserPersonalFormComponent) userPersonalFormComponent: UserPersonalFormComponent;
  @ViewChild(UserProfessionalFormComponent) userProfessionalFormComponent: UserProfessionalFormComponent;
  userRegisterForm: FormGroup;
  constructor(private formBuilder: FormBuilder) {
    this.userRegisterForm = this.formBuilder.group({

    });
  }

  onSubmit() {
    if (this.userRegisterForm.valid) {
      console.log('API call');
      console.table(this.userRegisterForm.value);
    } else {
      this.userPersonalFormComponent.userPersonalForm.setErrors(this.getFormErrors(this.userRegisterForm));
      this.userPersonalFormComponent.submitted = true;
      console.log(this.getFormErrors(this.userRegisterForm))
      console.log(this.getFormErrors(this.userProfessionalFormComponent.userProfessionalForm.get('controllerArray')['controls'][0]))
      this.userProfessionalFormComponent.userProfessionalForm.setErrors(
        this.getFormErrors(this.userProfessionalFormComponent.userProfessionalForm));
      this.userProfessionalFormComponent.submitted = true;

    }
  }

  getFormErrors(form: AbstractControl) {
    if (form instanceof FormControl) {
      // Return FormControl errors or null
      return form.errors ?? null;
    }
    if (form instanceof FormGroup) {
      const groupErrors = form.errors;
      // Form group can contain errors itself, in that case add'em
      const formErrors = groupErrors ? { groupErrors } : {};
      Object.keys(form.controls).forEach(key => {
        // Recursive call of the FormGroup fields
        const error = this.getFormErrors(form.get(key));
        if (error !== null) {
          // Only add error if not null
          formErrors[key] = error;
        }
      });
      // Return FormGroup errors or null
      return Object.keys(formErrors).length > 0 ? formErrors : null;
    }
  }

  ngOnInit(): void {
    this.userRegisterForm = this.formBuilder.group({
    }, {
    });
  }

  get f() { return this.userRegisterForm.controls; }

  onReset() {
    this.userRegisterForm.reset();
    this.userPersonalFormComponent.submitted = false;
    this.userPersonalFormComponent.userPersonalForm.setErrors(null);
    this.userPersonalFormComponent.userPersonalForm.reset();

    this.userProfessionalFormComponent.submitted = false;
    this.userProfessionalFormComponent.userProfessionalForm.setErrors(null);
    this.userProfessionalFormComponent.userProfessionalForm.reset();
  }

  // tslint:disable-next-line:use-lifecycle-interface
  ngAfterViewInit() {

    setTimeout(() => {
      this.userRegisterForm.addControl('personalForm', this.userPersonalFormComponent.userPersonalForm);
      this.userPersonalFormComponent.userPersonalForm.setParent(this.userRegisterForm);

      this.userRegisterForm.addControl('professionalForm', this.userProfessionalFormComponent.userProfessionalForm);
      this.userProfessionalFormComponent.userProfessionalForm.setParent(this.userRegisterForm);


    }, 0);

  }

}
