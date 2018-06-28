import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';

import { LoginService } from './login.service';
import { SignupComponent } from './signup/signup.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        LoginRoutingModule
    ],
    declarations: [LoginComponent, SignupComponent],
    providers: [LoginService]
})
export class LoginModule { }
