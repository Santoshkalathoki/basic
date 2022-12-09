import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  Validators,
  AbstractControl,
  FormBuilder,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { ClientServiceService } from '../service/client-service.service';
import { ProfileService } from '../service/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  updateForm: FormGroup = new FormGroup({});
  submitted: boolean = false;
  isSubmitting: boolean | undefined;
  id: string | undefined;
  user: any;
  userId: any | undefined;
  // seat:number|undefined;
  constructor(
    private form: FormBuilder,
    private updateService: ProfileService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.activatedRoute.params.subscribe((res: any) =>{
    this.userId = localStorage.getItem('userId');
    // this.getUsersById(res?.userId);
    console.log(this.userId);
    });
  }

  getUsersById(userId: number){
    this.updateService.updateUser(userId).subscribe({
      next: (response: any) => {
        this.user = response;
        this.updateForm.patchValue(response);
      }
    })
  }

  initForm() {
    this.updateForm = this.form.group({
      fname: [undefined, Validators.required],
      email: [undefined, Validators.required],
      mobileNumber: [undefined, Validators.required],
      vechileNumber: [undefined, Validators.required],
      password: [undefined, Validators.required],
    });
  }
  get forms(): { [key: string]: AbstractControl } {
    return this.updateForm.controls;
  }

  onSubmitForm(form: any): void {
    this.submitted = true;
    if (this.updateForm.valid) {
      // console.log(this.reactiveForm.value)
      console.log(this.updateForm.value);
      this.updateService.addUSer(form).subscribe(
        (response: any) => {
          console.log('hello');
          console.log(response);
          console.log('booked successfully', response);
        },
        (error) => {
          console.error(error);
          console.log('Error on bookin', error);
        }
      );
    }
    console.log(this.user);
  }
}
