import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Options } from '@angular-slider/ngx-slider';

@Component({
  selector: 'ngx-analyseavancee',
  templateUrl: './analyseavancee.component.html',
  styleUrls: ['./analyseavancee.component.scss']
})
export class AnalyseavanceeComponent implements OnInit {

  minValue: number = 50;
  maxValue: number = 200;
  minValue1: number = 50;
  maxValue1: number = 200;
  minValue2: number = 50;
  maxValue2: number = 200;
  minValue3: number = 50;
  maxValue3: number = 200;
  minValue4: number = 50;
  maxValue4: number = 200;
  minValue5: number = 50;
  maxValue5: number = 200;
  options: Options = {
    floor: 0,
    ceil: 250
  }

  firstForm: UntypedFormGroup;
  secondForm: UntypedFormGroup;
  thirdForm: UntypedFormGroup;
  fourthForm: UntypedFormGroup;
  activitiesList: String[] = ["Identifier les clients prospects stratégiques", 
                              "Présenter les produits et services de l’opérateur aux clients prospects",
                              "Intervenir sur le plus de pannes possible",
                              "Effectuer des changements sur le réseau",
                              "Monitoring de la performance réseau",
                              "Implémenter les mesures de sécurité réseau (SOC)"];
  fifthForm: UntypedFormGroup;


  constructor(private fb: UntypedFormBuilder) {
  }

  ngOnInit() {
    this.firstForm = this.fb.group({
      firstCtrl: [''],
    });

    this.secondForm = this.fb.group({
      secondCtrl: [''],
    });

    this.thirdForm = this.fb.group({
      thirdCtrl: [''],
    });

    this.fourthForm = this.fb.group({
      fourthCtrl: [''],
    });
  }

  onFirstSubmit() {
    this.firstForm.markAsDirty();
  }

  onSecondSubmit() {
    this.secondForm.markAsDirty();
  }

  onThirdSubmit() {
    this.thirdForm.markAsDirty();
  }

  onFourthSubmit() {
    this.fourthForm.markAsDirty();
  }

  onFifthSubmit() {
    this.fourthForm.markAsDirty();
  }

}
