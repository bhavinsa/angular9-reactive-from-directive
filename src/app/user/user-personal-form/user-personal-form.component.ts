import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-personal-form',
  templateUrl: './user-personal-form.component.html',
  styleUrls: ['./user-personal-form.component.css']
})
export class UserPersonalFormComponent implements OnInit {
  userPersonalForm: FormGroup;
  submitted: boolean;
  constructor(private formBuilder: FormBuilder) {
    this.userPersonalForm = this.formBuilder.group({
      title: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      acceptTerms: [false, Validators.requiredTrue]
    }, {
      // validator: MustMatch('password', 'confirmPassword')
    });
  }
  get f() { return this.userPersonalForm.controls; }

  onReset() {
    this.submitted = false;
    this.userPersonalForm.reset();
  }

  ngOnInit(): void {
  }

}
