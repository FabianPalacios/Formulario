import { Component } from '@angular/core';
import {FormGroup} from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  fgValidation: FormGroup;

  constructor(private  fb:FormBuilder){
  }


  ngOnInit(){
    this.fgValidationBuilder();
  }

  fgValidationBuilder(){
    this.fgValidation = this.fb.group({
      firstName: ['',[Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      lastName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      email: ['', [Validators.required,  Validators.email]],
      address: ['',[Validators.required, Validators.maxLength(100)]]
    });
  }

  get isInvalidForm(){
    return this.fgValidation.invalid;
  }
  
  
  peopleList = [];

 get peopleAmount(){
   return this.peopleList.length;
 }

 get fg(){
  return this.fgValidation.controls;
 }



 savePersonData(){
  if (this.fgValidation.invalid){
    alert("invalid form data.")
  }else{
    let fn = this.fg.firstName.value;
    let ln =  this.fg.lastName.value;
    let e = this.fg.email.value;
    let adr =  this.fg.address.value;
    if(this.check()== true){
      this.onDelete(this.fg.email.value);
      this.peopleList.push({firstName:fn, lastName: ln, email: e, address:adr});
      this.resetForm();
    }else{
      this.peopleList.push({firstName:fn, lastName: ln, email: e, address:adr});
      this.resetForm();
    }
  }

  }
  
  onSelect(p){
    this.fg.firstName.setValue(p.firstName);
    this.fg.lastName.setValue(p.lastName);
    this.fg.email.setValue(p.email);
    this.fg.address.setValue(p.address);
  }

  onDelete(email){
    this.peopleList = this.peopleList.filter(p => p.email != email);

    /*let aux = [];
    this.peopleList.forEach(p => {
      if(p.email != email){
        aux.push(p);
      }
    });    
    this.peopleList = aux;*/
  }

  check(){
    let bandera = false;
    this.peopleList.forEach(p => {
      if(this.fg.email.setValue(p.email) == this.fg.email.value()){
        bandera= true;
      }
    })
    return bandera;
  }

  resetForm() {
    this.fg.firstName.setValue('');
    this.fg.lastName.setValue('');
    this.fg.email.setValue('');
    this.fg.address.setValue('');
  }

}

