import { Component, OnInit } from '@angular/core';
import { Unite } from '../../../models/Unite';
import { UniteService } from '../../../services/unite.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'ngx-unite-form',
  templateUrl: './unite-form.component.html',
  styleUrls: ['./unite-form.component.scss']
})
export class UniteFormComponent {

  unite: Unite; 

  constructor(private route: ActivatedRoute, private router: Router, private uniteService: UniteService) {
    this.unite = new Unite();
   }


  onSubmit() {
    this.uniteService.createUnite(this.unite).subscribe(result => this.gotoUniteList());
  }

  gotoUniteList() {
    this.router.navigate(['/pages/unite-list']);
  }

}
