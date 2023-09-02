import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UniteService } from '../../../services/unite.service';
import { Unite } from '../../../models/Unite';

@Component({
  selector: 'ngx-update-unite',
  templateUrl: './update-unite.component.html',
  styleUrls: ['./update-unite.component.scss']
})
export class UpdateUniteComponent implements OnInit {

  unite: Unite;
  uniteId: number;
  existingUnites: Unite[] = [];

  constructor(private uniteService: UniteService) { 
    this.unite = new Unite();
  }

  ngOnInit(): void {
    this.fetchUnite();
  }

  fetchUnite(): void {
    this.uniteService.getUniteById(this.uniteId).subscribe(data => {
      this.unite = data;
    });
  }

  onSubmit() {
    this.uniteService.updateUnite(this.unite).subscribe(updatedUnite => {
      console.log('Unite updated:', updatedUnite);
      this.gotoUniteList();
    });
  }

  gotoUniteList() {
    window.location.reload();
  }

}
