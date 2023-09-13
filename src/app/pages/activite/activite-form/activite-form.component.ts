import { Component, OnInit } from '@angular/core';
import { Activite } from '../../../models/Activite';
import { ActivatedRoute, Router } from '@angular/router';
import { ActiviteService } from '../../../services/activite.service';

@Component({
  selector: 'ngx-activite-form',
  templateUrl: './activite-form.component.html',
  styleUrls: ['./activite-form.component.scss']
})
export class ActiviteFormComponent implements OnInit {

  activite: Activite

  constructor(private route: ActivatedRoute, private router: Router, private activiteService: ActiviteService) { 
    this.activite = new Activite();
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.activiteService.createActivite(this.activite).subscribe(result => this.gotoActiviteList());
  }

  gotoActiviteList() {
    this.router.navigate(['/pages/activite-list']);
    // window.location.reload();
  }

}
