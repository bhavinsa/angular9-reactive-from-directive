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
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      year: ['', [Validators.required]],
    })
  }

  addInput() {(this.userProfessionalForm.get('controllerArray') as FormArray).push(
    this.formBuilder.group({skill: ['', Validators.required], startDate: ['', Validators.required],
    endDate: ['', Validators.required], year: ['', Validators.required]})); }


  onBlurEvent(index){
    const endData = this.controllerArray.controls[index].get('endDate').value;
    const startDate = this.controllerArray.controls[index].get('startDate').value;
    const [diff, years] = this.calculateDateDiff(endData, startDate);
    debugger
    if (diff <= 0){
      this.controllerArray.controls[index].get('endDate').setErrors({greater: true});
    }
    this.controllerArray.controls[index].get('year').setValue(years > 0 ? years : 0);
  }

  calculateDateDiff(endData: string | number | Date, startDate: string | number | Date) {
    const date1 = new Date(endData);
    const date2 = new Date(startDate);

    const diff = Math.floor(date1.getTime() - date2.getTime());
    const day = 1000 * 60 * 60 * 24;

    const days = Math.floor(diff / day);
    const months = Math.floor(days / 31);
    const years = Math.floor(months / 12);
    return [diff, years];
  }


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
