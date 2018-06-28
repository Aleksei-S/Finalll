import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, ValidationErrors } from '@angular/forms';
import { Router, ActivatedRoute, Params, ParamMap } from '@angular/router';
import { LoginService } from './login.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    public loginForm: FormGroup;
    private token: string;
    constructor(private fb: FormBuilder,
        private route: ActivatedRoute,
        public loginService: LoginService) { }

    ngOnInit() {

        this.token = this.route.snapshot.queryParams['token'];
        if (this.token) {
            console.log(this.token);
            this.loginService.getUser(this.token);
        }

        // this.token = this.route.snapshot.queryParams["token"];
        // if (this.token) {
        //   this.loginService.getUser(this.token);
        // }

        this.initForm();
    }

    private initForm() {
        this.loginForm = this.fb.group({
            name: ['admin', [Validators.required, Validators.maxLength(25), Validators.minLength(3)]],
            password: ['password', [Validators.required, Validators.maxLength(20), Validators.minLength(3)]]
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

    }

}
