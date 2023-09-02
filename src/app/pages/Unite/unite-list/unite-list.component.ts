import { Component, OnInit, Output } from '@angular/core';
import { Unite } from '../../../models/Unite';
import { ActivatedRoute, Router } from '@angular/router';
import { UniteService } from '../../../services/unite.service';
import * as XLSX from 'xlsx';
import { NbWindowService } from '@nebular/theme';
import { UpdateUniteComponent } from '../update-unite/update-unite.component';

@Component({
  selector: 'ngx-unite-list',
  templateUrl: './unite-list.component.html',
  styleUrls: ['./unite-list.component.scss']
})
export class UniteListComponent implements OnInit {

  unites: Unite[];
  order = true;
  isDesc = false;
  fileName = 'ListUnités.xlsx';
  // reverseNbEmployes = true;
  types = ['ID', '#Employees', 'year'];
  type = 'week';

  constructor(private route: ActivatedRoute, private router: Router, private uniteService: UniteService,
    private windowService: NbWindowService
  ) { }

  ngOnInit(): void {
    this.uniteService.findAll().subscribe(data => {
      this.unites = data;
    });
    // console.log(this.router.url);
  }

  deleteunite(uniteId: number) {
    this.uniteService.deleteUnite(uniteId).subscribe(result => this.gotoUniteList());
  }

  gotoUniteList() {
    window.location.reload();
    // this.router.navigate(['/pages/unite-list']);
  }

  openWindowForm(uniteId: number) {
    this.windowService.open(UpdateUniteComponent, { title: `Modifier une unité`, context: { uniteId } });
  }

  exportexcel(): void {
    /* table id is passed over here */
    let element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);
  }

  sortEmployeeById() {
    if (this.order) {
      let newArray = this.unites.sort((a: any, b: any) => b.id - a.id)
      this.unites = newArray
    }
    else{
      let newArray = this.unites.sort((a: any, b: any) => a.id - b.id)
      this.unites = newArray
    }
    this.order = !this.order
  }

  sortEmployeeByNbEmployes(){
    if (this.order) {
      let newArray = this.unites.sort((a: any, b: any) => b.nbEmployees - a.nbEmployees)
      this.unites = newArray
    }
    else {
      let newArray = this.unites.sort((a: any, b: any) => a.nbEmployees - b.nbEmployees)
      this.unites = newArray
    }
    this.order = !this.order
  }

  sortName(property){
    this.isDesc = !this.isDesc;

    let direction = this.isDesc ? 1: -1;

    this.unites.sort(function(a,b){
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

}
