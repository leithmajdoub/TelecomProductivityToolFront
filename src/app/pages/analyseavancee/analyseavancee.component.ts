import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Options } from '@angular-slider/ngx-slider';
import { Unite } from '../../models/Unite';
import { UniteService } from '../../services/unite.service';
import { ActiviteService } from '../../services/activite.service';
import { Activite } from '../../models/Activite';

@Component({
  selector: 'ngx-analyseavancee',
  templateUrl: './analyseavancee.component.html',
  styleUrls: ['./analyseavancee.component.scss']
})
export class AnalyseavanceeComponent implements OnInit {

  unite: Unite;
  activite: Activite;
  selectedItemsB2B: string[];
  selectedItemsServiceClient: string[];
  selectedItemsTransformationInnovation: string[];
  selectedItemsReseau: string[];
  isConcatenationDone = false;

  realActivitiesList: Activite[];

  @ViewChild('stepper') stepper: any;

  minValue: number = 30;
  maxValue: number = 200;
  minValue1: number = 50;
  maxValue1: number = 250;
  minValue2: number = 20;
  maxValue2: number = 60;
  minValue3: number = 50;
  maxValue3: number = 100;
  minValue4: number = 30;
  maxValue4: number = 150;
  minValue5: number = 20;
  maxValue5: number = 170;

  options: Options = {
    floor: 0,
    ceil: 250
  }

  value = 50

  firstForm: UntypedFormGroup;
  secondForm: UntypedFormGroup;
  thirdForm: UntypedFormGroup;
  fourthForm: UntypedFormGroup;
  // activitiesList: String[] = ["Identifier les clients prospects stratégiques", 
  //                             "Présenter les produits et services de l’opérateur aux clients prospects",
  //                             "Intervenir sur le plus de pannes possible",
  //                             "Effectuer des changements sur le réseau",
  //                             "Monitoring de la performance réseau",
  //                             "Implémenter les mesures de sécurité réseau (SOC)"];
  activitiesList: string[];
  fifthForm: UntypedFormGroup;

  buttonChoices = [
    { label: 'Performance idéale', status: 'success' },
    { label: 'Sous-performance', status: 'danger' },
    { label: 'Sur-performance', status: 'warning' },
  ];


  constructor(private fb: UntypedFormBuilder, private uniteService: UniteService, private activiteService: ActiviteService) {
    this.unite = new Unite();
    this.activite = new Activite();

    this.activitiesList = [];
    this.realActivitiesList = [];
    
    this.selectedItemsB2B = [];
    this.selectedItemsServiceClient = [];
    this.selectedItemsTransformationInnovation = [];
    this.selectedItemsReseau = [];
  }

  ngOnInit() {
    this.firstForm = this.fb.group({
      firstCtrl: [''],
    });

    this.secondForm = this.fb.group({
      secondCtrl: [''],
    });

    this.thirdForm = this.fb.group({
      // nbEmployees: new FormControl(''),
      // valueDriverProductivite: new FormControl(''),
      thirdCtrl: [''],
    });

    this.fourthForm = this.fb.group({
      fourthCtrl: [''],
    });
  }

  onFirstSubmit() {
    // this.uniteService
    // .createUnite(this.unite).subscribe(data => {
    //     console.log(data)
    //     this.stepper.next();
    //   },
    //     error => console.log(error));

    this.firstForm.markAsDirty();
    
  }

  onSecondSubmit() {

    // here 
    this.realActivitiesList = [];
    // console.log(this.selectedItemsB2B)
    // console.log(this.selectedItemsTransformationInnovation)
    // console.log(this.selectedItemsServiceClient)

    for (var item of this.selectedItemsB2B) {
      this.activite = new Activite();
      this.activite.name = item;
      this.activiteService.createActivite(this.activite).subscribe(data => {
        // this.realActivitiesList.push(this.activite);
      },
        error => console.log(error));
    }

    for (var item of this.selectedItemsTransformationInnovation) {
      this.activite = new Activite();
      this.activite.name = item;
      this.activiteService.createActivite(this.activite).subscribe(data => {
        // this.realActivitiesList.push(this.activite);
        // console.log(data)
      },
        error => console.log(error));
    }

    for (var item of this.selectedItemsServiceClient) {
      this.activite = new Activite();
      this.activite.name = item;
      this.activiteService.createActivite(this.activite).subscribe(data => {
        // this.realActivitiesList.push(this.activite);
        // console.log(data)
      },
        error => console.log(error));
    }

    // console.log(this.realActivitiesList)
    this.activitiesList = this.selectedItemsB2B.concat(this.selectedItemsTransformationInnovation, this.selectedItemsServiceClient, this.selectedItemsReseau);
    for (let i = 0; i < this.activitiesList.length; i++ ) {
      this.activite = new Activite();
      this.activite.name = this.activitiesList[i];
      console.log(this.activite)
      this.realActivitiesList.push(this.activite);
      console.log(this.realActivitiesList)
    }
    // this.realActivitiesList = this.activitiesList.map(a => Object.assign(new Activite(), a));  
    this.secondForm.markAsDirty();

    this.isConcatenationDone = true;
  }

  onThirdSubmit() {
    for (var item of this.realActivitiesList) {
      this.activite = item;
      this.activiteService.updateActivite(this.activite).subscribe(data => {
        console.log(data)
      },
        error => console.log(error));
    }
    // console.log(this.realActivitiesList);
    this.thirdForm.markAsDirty();
  }

  // Make unité activites list == realActivitiesList
  onThirdSubmitV2(){
    // this.unite.name="V2";
    // this.unite.nbEmployees= 15;
    console.log(this.unite.name);
    console.log(this.unite.nbEmployees);
    this.unite.activites = this.realActivitiesList;
    this.uniteService.createUnite(this.unite).subscribe(data => {
        console.log(data)
        // this.stepper.next();
      },
        error => console.log(error));
    
  }

  onFourthSubmit() {
    this.fourthForm.markAsDirty();
  }

  onFifthSubmit() {
    this.fourthForm.markAsDirty();
  }

  trackByFn(item: Activite) {
    return item.id; // or any other unique identifier for the item
  }

  getRandomChoice() {
    const randomIndex = Math.floor(Math.random() * this.buttonChoices.length);
    return this.buttonChoices[randomIndex];
  }

  calculateWidth(): number {
    if (this.value <= this.minValue) {
      return 0;
    } else if (this.value >= this.maxValue) {
      return 100;
    } else {
      return ((this.value - this.minValue) / (this.maxValue - this.minValue)) * 100;
    }
  }

}
