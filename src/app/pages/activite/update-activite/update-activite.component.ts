import { Component, OnInit } from '@angular/core';
import { Activite } from '../../../models/Activite';
import { ActiviteService } from '../../../services/activite.service';

@Component({
  selector: 'ngx-update-activite',
  templateUrl: './update-activite.component.html',
  styleUrls: ['./update-activite.component.scss']
})
export class UpdateActiviteComponent implements OnInit {

  activite: Activite;
  activiteId: number;
  existingActivites: Activite[] = [];

  constructor(private activiteService: ActiviteService) {
    this.activite = new Activite();
   }

  ngOnInit(): void {
    this.fetchActivite();
  }

  fetchActivite(): void {
    this.activiteService.getActiviteById(this.activiteId).subscribe(data => {
      this.activite = data;
    });
  }

  onSubmit() {
    this.activiteService.updateActivite(this.activite).subscribe(updateActivite => {
      console.log('Activité updated:', updateActivite);
      this.gotoActiviteList();
    });
  }

  gotoActiviteList() {
    window.location.reload();
  }


}
