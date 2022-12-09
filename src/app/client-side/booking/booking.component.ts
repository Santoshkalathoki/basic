import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BookingService } from '../service/booking.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss'],
})
export class BookingComponent implements OnInit {
  reactiveForm: FormGroup = new FormGroup({});
  submitted: boolean = false;
  isSubmitting: boolean | undefined;
  id: string | undefined;
  user: any;
  // seat:number|undefined;
  constructor(
    private form: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private bookingService: BookingService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
    // this.activatedRoute.params.subscribe((params) => {
    //   this.id = params['id'];
    // });
  }

  initForm() {
    this.reactiveForm = this.form.group({
      fname: [undefined, Validators.required],
      email: [undefined, Validators.required],
      mobileNumber: [undefined, Validators.required],
      vechileNumber: [undefined, Validators.required],
      seat:[1],
    });
  }
  get forms(): { [key: string]: AbstractControl } {
    return this.reactiveForm.controls;
  }

  onSubmitForm(form: any): void {
  this.submitted = true;
    if (this.reactiveForm.valid) {
      // console.log(this.reactiveForm.value)
      console.log(this.reactiveForm.value)
      this.bookingService.bookSeat(form).subscribe(
        (response: any) => {
          console.log("hello");
          console.log(response);
          this.router.navigate(['/client-side/dashboard']);
          console.log("booked successfully",response)

        },
        (error) => {
          console.error(error);
          console.log("Error on bookin",error)
        }
      );
    }
    console.log( this.user);
  }
}

