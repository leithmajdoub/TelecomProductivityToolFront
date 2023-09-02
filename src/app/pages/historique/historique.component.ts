import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

import { SmartTableData } from '../../@core/data/smart-table';
import { AnalyseService } from '../../services/analyse.service';
import { Analyse } from '../../models/Analyse';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from "jspdf-autotable"
import { NbWindowService } from '@nebular/theme';
import { UpdateHistoriqueComponent } from '../update-historique/update-historique.component';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'ngx-historique',
  templateUrl: './historique.component.html',
  styleUrls: ['./historique.component.scss']
})
export class HistoriqueComponent {
  fileName = 'HistoriqueAnalyses.xlsx';
  order = true;
  isDesc = false;

  settings = {
    // add: {
    //   addButtonContent: '<i class="nb-plus"></i>',
    //   createButtonContent: '<i class="nb-checkmark"></i>',
    //   cancelButtonContent: '<i class="nb-close"></i>',
    // },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      id: {
        title: 'ID',
        type: 'number',
      },
      codeMission: {
        title: 'Code Mission',
        type: 'number',
      },
      date: {
        title: 'Date',
        type: 'date',
      },
      nomUnite: {
        title: 'Unité analysée',
        type: 'string',
      },
      nomConsultant: {
        title: 'Consultant',
        type: 'string',
      },
    },
  };

  data1 = [];

  source: LocalDataSource = new LocalDataSource();
  analyses: Analyse[];

  constructor(private router: Router, private analyseService: AnalyseService, private windowService: NbWindowService) {
    this.analyseService.findAll().subscribe(data => {
      this.analyses = data;
      this.data1 = this.generateData()
      console.log(this.data1)
      this.source.load(this.data1);
    });

  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  getNewObj(analyse: Analyse): any {
    return {
      id: analyse.id,
      date: analyse.date,
      codeMission: analyse.codeMission,
      nomUnite: analyse.unite.name,
      nomConsultant: analyse.utilisateur.name,
    };
  }

  generateData(): Array<any> {
    const data = [];
    for (let i = 0; i < this.analyses.length; i++) {
      data.push(this.getNewObj(this.analyses[i]));
    }
    return data;
  }

  deleteAnalyse(analyseId: number) {
    this.analyseService.deleteAnalyse(analyseId).subscribe(result => this.gotoAnalyseList());
  }

  openWindowForm(analyseId: number, date: Date) {
    this.windowService.open(UpdateHistoriqueComponent, { title: `Modifier une analyse`, context: { analyseId }});
  }

  gotoAnalyseList() {
    window.location.reload();
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

  exportCSV() {
    const header = ['ID', 'Code Mission', 'Date', 'Nom de l\'unité', 'Nom du consultant'];
    const rows = this.analyses.map((analyse) => [analyse.id, analyse.codeMission, analyse.date, analyse.unite.name, analyse.utilisateur.name]);
  
    const csvContent = [header, ...rows].map((row) => row.join(',')).join('\n');
  
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
    FileSaver.saveAs(blob, 'analyses.csv'); 
  }

  sortAnalysesById() {
    if (this.order) {
      let newArray = this.data1.sort((a: any, b: any) => b.id - a.id)
      this.data1 = newArray
    }
    else {
      let newArray = this.data1.sort((a: any, b: any) => a.id - b.id)
      this.data1 = newArray
    }
    this.order = !this.order
  }

  sortAnalysesByCodeMission() {
    if (this.order) {
      let newArray = this.data1.sort((a: any, b: any) => b.codeMission - a.codeMission)
      this.data1 = newArray
    }
    else {
      let newArray = this.data1.sort((a: any, b: any) => a.codeMission - b.codeMission)
      this.data1 = newArray
    }
    this.order = !this.order
  }

  sortAnalysesByNomUnite(property){
    this.isDesc = !this.isDesc;

    let direction = this.isDesc ? 1: -1;

    this.data1.sort(function(a,b){
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
