import { NgModule } from '@angular/core';
import { NbAccordionModule, NbButtonModule, NbCardModule, NbCheckboxModule, NbListModule, NbMenuModule, NbRouteTabsetModule, NbSelectModule, NbStepperModule, NbTabsetModule, NbUserModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { ECommerceModule } from './e-commerce/e-commerce.module';
import { PagesRoutingModule } from './pages-routing.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { AnalyseavanceeComponent } from './analyseavancee/analyseavancee.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { LocalDataSource, Ng2SmartTableModule } from 'ng2-smart-table';
import { FormInputsComponent } from './forms/form-inputs/form-inputs.component';

import { FormsRoutingModule } from './forms/forms-routing.module';
import { FormsComponent } from './forms/forms.component';
import { FormLayoutsComponent } from './forms/form-layouts/form-layouts.component';
import { DatepickerComponent } from './forms/datepicker/datepicker.component';
import { ButtonsComponent } from './forms/buttons/buttons.component';
import { FormsModule as ngFormsModule } from '@angular/forms';
import { HistoriqueComponent } from './historique/historique.component';

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    DashboardModule,
    ECommerceModule,
    MiscellaneousModule,
    NbStepperModule,
    NbCardModule,
    ReactiveFormsModule,
    NbButtonModule,
    FormsModule,
    NbTabsetModule,
    NbRouteTabsetModule,
    NbListModule,
    NbAccordionModule,
    NbUserModule,
    NbCheckboxModule,
    NbSelectModule,
    NgxSliderModule,
    Ng2SmartTableModule
  ],
  declarations: [
    PagesComponent,
    AnalyseavanceeComponent,
    HistoriqueComponent,
  ],
})
export class PagesModule {
}
