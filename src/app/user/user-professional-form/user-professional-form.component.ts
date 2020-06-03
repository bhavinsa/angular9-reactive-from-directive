import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-user-professional-form',
  templateUrl: './user-professional-form.component.html',
  styleUrls: ['./user-professional-form.component.css']
})
export class UserProfessionalFormComponent implements OnInit {
  userProfessionalForm: FormGroup;
  submitted: boolean;
  constructor(private formBuilder: FormBuilder) {
    this.userProfessionalForm = this.formBuilder.group({
      degree: ['', Validators.required],
      controllerArray: this.formBuilder.array([this.createEmpFormGroup()], [Validators.required])
    }, {
    });
  }
  get f() { return this.userProfessionalForm.controls; }
  get controllerArray(): FormArray {
    return this.userProfessionalForm.get('controllerArray') as FormArray;
  }

  onReset() {
    this.submitted = false;
    this.userProfessionalForm.reset();
  }

  createEmpFormGroup() {
    return this.formBuilder.group({
      skill: ['', [Validators.required]],
      year: ['', [Validators.required]],
    })
  }

  addInput() {(this.userProfessionalForm.get('controllerArray') as FormArray).push(
    this.formBuilder.group({skill: ['', Validators.required], year: ['', Validators.required]})); }


  ngOnInit(): void {
    // this.setArrayInputs(this.arrayInputs);
  }
  setArrayInputs(arrayInputs) {
    const arrayFG = arrayInputs.map(address => this.formBuilder.group(address));
    const formArray = this.formBuilder.array(arrayFG);
    this.userProfessionalForm.setControl('controllerArray', formArray);
  }

  removeInput(index) { this.userProfessionalForm.get('controllerArray')['controls'].splice(index, 1); }

}
