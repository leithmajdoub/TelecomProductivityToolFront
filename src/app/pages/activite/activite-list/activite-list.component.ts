import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Activite } from '../../../models/Activite';
import { ActiviteService } from '../../../services/activite.service';
import { NbWindowService } from '@nebular/theme';
import * as XLSX from 'xlsx'; 
import { UpdateActiviteComponent } from '../update-activite/update-activite.component';

@Component({
  selector: 'ngx-activite-list',
  templateUrl: './activite-list.component.html',
  styleUrls: ['./activite-list.component.scss']
})
export class ActiviteListComponent implements OnInit {

  activites: Activite[];
  fileName = 'ListeActivites.xlsx';
  order = true;
  isDesc = false;

  constructor(private route: ActivatedRoute, private router: Router, private activiteService: ActiviteService, private windowService: NbWindowService) {
   }

  ngOnInit(): void {
    this.activiteService.findAll().subscribe(data => {
      this.activites = data;
    });
  }

  deleteactivite(activiteId:number) {
    this.activiteService.deleteActivite(activiteId).subscribe(result => this.gotoActiviteList());
  }

  gotoActiviteList() {
    window.location.reload();
    // this.router.navigate(['/activite-list']);
  }

  openWindowForm(activiteId: number) {
    this.windowService.open(UpdateActiviteComponent, { title: `Modifier une activité`, context: { activiteId } });
  }

  sortActiviteById() {
    if (this.order) {
      let newArray = this.activites.sort((a: any, b: any) => b.id - a.id)
      this.activites = newArray
    }
    else{
      let newArray = this.activites.sort((a: any, b: any) => a.id - b.id)
      this.activites = newArray
    }
    this.order = !this.order
  }

  sortActiviteByName(property){
    this.isDesc = !this.isDesc;

    let direction = this.isDesc ? 1: -1;

    this.activites.sort(function(a,b){
      if (a[property] < b[property]){
        return -1 * direction;
      }
      else if (a[property] > b[property]){
        return 1 * direction;
      }
      else{
        return 0;
      }
    });
  }

  sortActiviteByNbEmplyes(){
    if (this.order) {
      let newArray = this.activites.sort((a: any, b: any) => b.nbEmployees - a.nbEmployees)
      this.activites = newArray
    }
    else{
      let newArray = this.activites.sort((a: any, b: any) => a.nbEmployees - b.nbEmployees)
      this.activites = newArray
    }
    this.order = !this.order
  }
  sortActiviteByPerformance(){
    if (this.order) {
      let newArray = this.activites.sort((a: any, b: any) => b.unitPerformance - a.unitPerformance)
      this.activites = newArray
    }
    else{
      let newArray = this.activites.sort((a: any, b: any) => a.unitPerformance - b.unitPerformance)
      this.activites = newArray
    }
    this.order = !this.order
  }

  sortActiviteByDriver(property){
    this.isDesc = !this.isDesc;

    let direction = this.isDesc ? 1: -1;

    this.activites.sort(function(a,b){
      if (a[property] < b[property]){
        return -1 * direction;
      }
      else if (a[property] > b[property]){
        return 1 * direction;
      }
      else{
        return 0;
      }
    });
  }

  sortActiviteByValeurDriver(){
    if (this.order) {
      let newArray = this.activites.sort((a: any, b: any) => b.valueDriverProductivite - a.valueDriverProductivite)
      this.activites = newArray
    }
    else{
      let newArray = this.activites.sort((a: any, b: any) => a.valueDriverProductivite - b.valueDriverProductivite)
      this.activites = newArray
    }
    this.order = !this.order
  }

  sortActiviteByValeurMinDriver(){
    if (this.order) {
      let newArray = this.activites.sort((a: any, b: any) => b.minValueBenchmarkDriverProductivite - a.minValueBenchmarkDriverProductivite)
      this.activites = newArray
    }
    else{
      let newArray = this.activites.sort((a: any, b: any) => a.minValueBenchmarkDriverProductivite - b.minValueBenchmarkDriverProductivite)
      this.activites = newArray
    }
    this.order = !this.order
  }

  sortActiviteByValeurMaxDriver(){
    if (this.order) {
      let newArray = this.activites.sort((a: any, b: any) => b.maxValueBenchmarkDriverProductivite - a.maxValueBenchmarkDriverProductivite)
      this.activites = newArray
    }
    else{
      let newArray = this.activites.sort((a: any, b: any) => a.maxValueBenchmarkDriverProductivite - b.maxValueBenchmarkDriverProductivite)
      this.activites = newArray
    }
    this.order = !this.order
  }

  exportexcel(): void {
    let element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    XLSX.writeFile(wb, this.fileName);
  }
}
