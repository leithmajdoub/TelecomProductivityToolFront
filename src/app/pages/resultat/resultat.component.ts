import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Unite } from '../../models/Unite';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import { NbToastrService } from '@nebular/theme';
import { Activite } from '../../models/Activite';
import { PositionningAgainstBenchmark } from '../../models/PositionningAgainstBenchmark';

@Component({
  selector: 'ngx-resultat',
  templateUrl: './resultat.component.html',
  styleUrls: ['./resultat.component.scss']
})
export class ResultatComponent implements OnInit {

  @Input() unite: Unite;
  fileName = 'ResultatAnalyseAvancee.xlsx';
  @ViewChild('table') table: any;
  activities: Activite[] = [
    {
      id: 1,
      name: "Activity 1",
      nbEmployees: 10,
      unitPerformance: 90,
      driverProductivite: "Productivity Driver 1",
      valueDriverProductivite: 50,
      minValueBenchmarkDriverProductivite: 40,
      maxValueBenchmarkDriverProductivite: 60,
      positionningAgainstBenchmark: PositionningAgainstBenchmark.LOW,
    },
    {
      id: 2,
      name: "Activity 2",
      nbEmployees: 15,
      unitPerformance: 80,
      driverProductivite: "Productivity Driver 2",
      valueDriverProductivite: 55,
      minValueBenchmarkDriverProductivite: 45,
      maxValueBenchmarkDriverProductivite: 65,
      positionningAgainstBenchmark: PositionningAgainstBenchmark.HIGH,
    },
  ];
  

  constructor(private toastrService: NbToastrService) { 
    this.unite = new Unite();
    this.unite.name = "Test";
    this.unite.id = 2;
    this.unite.activites = this.activities;
  }

  ngOnInit(): void {
    
  }

  getPositionningAgainstBenchmarkString(value: PositionningAgainstBenchmark): string {
    switch (value) {
      case PositionningAgainstBenchmark.LOW:
        return 'L\'activité sous-performe';
      case PositionningAgainstBenchmark.IDEAL:
        return 'La performance est idéale';
      case PositionningAgainstBenchmark.HIGH:
        return 'L\'activité sur-performe';
      default:
        return '';
    }
  }

  getStatusForBenchmark(value: PositionningAgainstBenchmark): string {
    switch (value) {
      case PositionningAgainstBenchmark.LOW:
        return 'danger'; 
      case PositionningAgainstBenchmark.IDEAL:
        return 'success';
      case PositionningAgainstBenchmark.HIGH:
        return 'info'; 
      default:
        return '';
    }
  }

  exportexcel(): void {
    let element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    XLSX.writeFile(wb, this.fileName);
  }

  exportCSV() {
    const header = ['#', 'Activité', 'Driver de productivité', 'Valeurs benchmark', 'Valeur du driver', 'Performance'];
  
    const rows = this.unite.activites.map((activity) => [
      this.unite.id, activity.name, activity.driverProductivite, 'Value bar',
      activity.valueDriverProductivite, activity.positionningAgainstBenchmark
    ]);
  
    const csvContent = [header, ...rows].map((row) => row.join(',')).join('\n');
  
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
    FileSaver.saveAs(blob, 'ResultatAnalyseAvancee.csv');
  }

}
