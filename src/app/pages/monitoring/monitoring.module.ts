import { NgModule } from "@angular/core";
import {
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbDatepickerModule,
  NbIconModule,
  NbInputModule,
  NbPopoverModule,
  NbProgressBarModule,
  NbRadioModule,
  NbSelectModule,
  NbUserModule,
} from "@nebular/theme";

import { ThemeModule } from "../../@theme/theme.module";
import { FormsModule as ngFormsModule, ReactiveFormsModule } from "@angular/forms";
import { MonitoringRoutingModule } from "./monitoring-routing.module";
import { ServicesMonitoringComponent } from "./service-monitoring/services-monitoring/services-monitoring.component";
import { MonitoringComponent } from "./monitoring.component";
import { CustomCardComponent } from "../forms/custom-card/custom-card/custom-card.component";
import {DpDatePickerModule} from 'ng2-jalali-date-picker';
import { NgxSelectModule } from "ngx-select-ex";
import { CustomFileUploaderComponent } from "../forms/custom-file-uploader/custom-file-uploader.component";
import { FileUploadModule } from "ng2-file-upload";

@NgModule({
  imports: [
    ThemeModule,
    NbInputModule,
    NbCardModule,
    NbButtonModule,
    NbActionsModule,
    NbUserModule,
    NbCheckboxModule,
    NbRadioModule,
    NbDatepickerModule,
    MonitoringRoutingModule,
    NbSelectModule,
    NbIconModule,
    ngFormsModule,
    NbProgressBarModule,
    NbPopoverModule,
    DpDatePickerModule,
    NgxSelectModule,
    ReactiveFormsModule,
    FileUploadModule
  ],
  declarations: [
    MonitoringComponent,
    ServicesMonitoringComponent,
    CustomCardComponent,
    CustomFileUploaderComponent
  ],
})
export class MonitoringModule {}
