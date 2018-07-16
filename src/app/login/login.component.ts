import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, ValidationErrors } from '@angular/forms';
import { LoginService } from './login.service';
import { Router, ActivatedRoute, Params, ParamMap } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private errorMessage: string;
  private token: string;
  public loginForm: FormGroup;


  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    public loginService: LoginService) { }

  ngOnInit() {

    this.token = this.route.snapshot.queryParams['token'];
    if (this.token) {
      console.log(this.token);
      this.loginService.getUser(this.token);
    }

    this.initForm();
  }

  private initForm() {
    this.loginForm = this.fb.group({
      name: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  isControlInvalid(controlName: string): boolean {
    const control = this.loginForm.controls[controlName];
    const result = control.invalid && control.touched;
    return result;
  }

  onSubmit() {
    const controls = this.loginForm.controls;
    if (this.loginForm.invalid) {
      Object.keys(controls)
        .forEach(controlName => controls[controlName].markAsTouched());
      return;
    }
    ///////// * Обработка данных формы * //////////
    console.log(this.loginForm.value);
    this.loginService.login(this.loginForm.value)
    .subscribe(
      (results: any) => {
        if (!!results.success) {
          console.log('success');
          console.log(results.token);
          this.loginService.getUser(results.token);
        } else {
          this.errorMessage = results.message;
        }
      });
  }





}
