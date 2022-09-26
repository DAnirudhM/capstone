import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-team-registration',
  templateUrl: './team-registration.component.html',
  styleUrls: ['./team-registration.component.scss']
})
export class TeamRegistrationComponent implements OnInit {

  teamRegistrationForm!: FormGroup;

  @Input() displayTeamRegisterForm: boolean = true;
  @Input() displayEditTeamForm: boolean = false;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    //Validators.pattern('[- +()0-9]+')
    this.teamRegistrationForm = this.formBuilder.group({
      memberId: [null, [Validators.required]],
      memberEmail: [null, [Validators.required]],
      memberName: [null, Validators.compose([Validators.required, Validators.email])],
      memberPhone: [null, Validators.compose([Validators.required,Validators.pattern('[- +()0-9]+')])]
    });
  }

  onCancel() {
    throw new Error('Method not implemented.');
  }
  onSubmit(arg0: any) {
    throw new Error('Method not implemented.');
  }


}
