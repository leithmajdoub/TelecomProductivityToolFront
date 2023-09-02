import { Component, OnInit } from '@angular/core';
import { Analyse } from '../../models/Analyse';
import { AnalyseService } from '../../services/analyse.service';

@Component({
  selector: 'ngx-update-historique',
  templateUrl: './update-historique.component.html',
  styleUrls: ['./update-historique.component.scss']
})
export class UpdateHistoriqueComponent implements OnInit {

  analyse: Analyse;
  analyseId: number;
  // date: Date;
  existingAnalyses: Analyse[] = [];

  constructor(private analyseService: AnalyseService) {
    this.analyse = new Analyse();
   }

  ngOnInit(): void {
    this.fetchAnalyse();
  }

  fetchAnalyse() {
    this.analyseService.getAnalyseById(this.analyseId).subscribe(data => {
      this.analyse = data;
    });
  }

  onSubmit() {
    this.analyseService.updateAnalyse(this.analyse).subscribe(updatedAnalyse => {
      console.log('Analyse updated:', updatedAnalyse);
      this.gotoAnalyseList();
    });
  }

  gotoAnalyseList() {
    window.location.reload();
  }

}
