import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Options } from '@angular-slider/ngx-slider';
import { Unite } from '../../models/Unite';
import { UniteService } from '../../services/unite.service';
import { ActiviteService } from '../../services/activite.service';
import { Activite } from '../../models/Activite';
import { PositionningAgainstBenchmark } from '../../models/PositionningAgainstBenchmark';

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
  activitiesDictionary: { [key: string]: string } = {
    "Identifier les clients prospects stratégiques": "Nombre de prospects identifiés par mois",
    "Approcher les clients prospects stratégiques": "Nombre de prospects approchés par mois",
    "Présenter les produits et services de l’opérateur aux clients prospects": "Nombre de présentations produits (pitch client) par mois",
    "Mieux comprendre le besoin et les attentes des clients grâce au feedback": "Nombre de feedback analysés (CSAT) par mois",
    "Développer les propositions les plus adéquates aux besoins du client": "Nombre d'offres peronnalisées developpées par mois",
    "Négocier des contrats de vente": "Nombre de contrats négociés par mois",
    "Signer des contrats de vente": "Nombre de contrats signés par mois",
    "Atteindre ou dépasser les objectifs de vente": "Nombre de commerciaux ayant atteint leurs objectifs de vente",
    "Comparer les produits de l’opérateur avec ses concurrents": "Nombre des rapport d'analyse des conccurents par an",
    "Monitorer les potentielles menaces pour les activités B2B de l’opérateur": "Nombre de menaces identifiées par commercial par an",
    "Analyser les tendances du marché": "Nombre de rapports d'analyse des tendances du marché par an",
    "Exécuter des projets de transformation digitale": "Nombre de projets de transformation digitale exécutés par an",
    "Faire évoluer les transactions digitales": "Taux d'évolution des transactions digitales par produit ou service par mois",
    "Respecter le time to market des projets de transformation digitale": "Taux de respect du time-to-market des projets de transformation digitale par an",
    "Exécuter des projets d’innovation en marketing produit": "Nombre de projets d’innovation en marketing produit exécutés par employé par an",
    "Faire évoluer le taux de satisfaction des clients": "Évolution du taux de satisfaction des clients (CSAT): par projet par an",
    "Exécuter des projets de transformation produit": "Nombre de projets de transformation produit exécutés par employé par an",
    "Rédiger des rapport d'analyse du risque": "Nombre de rapports d'analyse du risque par mois, par Quarter et par An",
    "Rédiger des rapport d'analyse des tendances": "Nombre de rapports d'analyse des tendances par mois, par Quarter et par An",
    "Traiter les réclamations des clients": "Nombre de reclamations (cases) traitées",
    "Répondre aux questions des clients sur les produits et services de l’opérateur": "Nombre de questions clients traitées",
    "Répondre aux autres requetes des clients": "Nombre d’autres demandes clients traitées",
    "Diagnostiquer les pannes": "MTTD (Mean Time To Diagnose): Temps moyen pour diagnostique une panne par technicien par mois",
    "Réparer les pannes le plus vite possible": "MTTR (Mean Time To Repair): Le temps moyen par technicien pour réparer une panne",
    "Intervenir sur des pannes possible": "Nombre d'interventions par technicien par mois sur des pannes réseau",
    "Arriver au site de la panne le plus rapidement possible": "MTTI (Mean Time to intervene) : Temps moyen pour intervenir (Temps entre appel pour intervenir et arrivée sur site)",
    "Effectuer des changements sur le réseau": "Nombre de changements effectués sur le réseau par mois",
    "Effectuer des audits réseau": "Nombre d'audits réseau par an",
    "Monitoring de la performance réseau": "Temps moyen pour détécter une panne",
    "Tenir un plan de maintenance réseau": "Taux de respect des échéances de maintenance",
    "Faire la maintenance de l'infrastructure réseau": "Nombre d'opérations de maintenance de l'infrastructure réseau efféctuées",
    "Implémenter les mesures de sécurité réseau": "Nombre de mesures de sécurité réseau implémentées",
  };
  
  

  @ViewChild('stepper') stepper: any;

  options: Options = {
    floor: 0,
    ceil: 250
  }

  value = 50

  firstForm: UntypedFormGroup;
  secondForm: UntypedFormGroup;
  thirdForm: UntypedFormGroup;
  fourthForm: UntypedFormGroup;
  activitiesList: string[];
  fifthForm: UntypedFormGroup;



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

    this.realActivitiesList = [];

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
      this.activite.driverProductivite = this.activitiesDictionary[this.activitiesList[i]]

      this.activite.minValueBenchmarkDriverProductivite = Math.floor(Math.random() * (49 - 1)) + 1;
      this.activite.maxValueBenchmarkDriverProductivite = Math.floor(50 + Math.random() * (100 - 50));
      
      if (this.activite.valueDriverProductivite < this.activite.minValueBenchmarkDriverProductivite){
        this.activite.positionningAgainstBenchmark = PositionningAgainstBenchmark.LOW
      } else if (this.activite.valueDriverProductivite > this.activite.maxValueBenchmarkDriverProductivite){
        this.activite.positionningAgainstBenchmark = PositionningAgainstBenchmark.HIGH
      } else{
        this.activite.positionningAgainstBenchmark = PositionningAgainstBenchmark.IDEAL
      }
      
      console.log(this.activite)
      this.realActivitiesList.push(this.activite);
      console.log(this.realActivitiesList)
    }
    // this.realActivitiesList = this.activitiesList.map(a => Object.assign(new Activite(), a));  
    this.secondForm.markAsDirty();

    this.isConcatenationDone = true;
  }

  // onThirdSubmit() {
  //   for (var item of this.realActivitiesList) {
  //     this.activite = item;
  //     this.activiteService.updateActivite(this.activite).subscribe(data => {
  //       console.log(data)
  //     },
  //       error => console.log(error));
  //   }
  //   // console.log(this.realActivitiesList);
  //   this.thirdForm.markAsDirty();
  // }

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
    return item.id; 
  }

}
