import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import * as moment from "jalali-moment";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CustomFileUploaderService } from "../../../forms/custom-file-uploader/custom-file-uploader.service";

@Component({
  selector: "app-services-monitoring",
  templateUrl: "./services-monitoring.component.html",
  styleUrls: ["./services-monitoring.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServicesMonitoringComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private fileUploaderService: CustomFileUploaderService
  ) {}
  dateObject = moment("1395-11-22", "jYYYY,jMM,jDD");
  datePickerConfig = {
    drops: "auto",
    format: "YY/M/D",
  };

  form: FormGroup;
  cars = [
    { id: 1, name: "مقدار اول" },
    { id: 2, name: "مقدار دوم" },
    { id: 3, name: "مقدار سوم" },
    { id: 4, name: "مقدارم چهارم" },
  ];
  ngOnInit() {
    this.fileUploaderService.response.subscribe((res) => {
      console.log(res);
    });
    
    this.form = this.formBuilder.group({
      // email: [null, [Validators.required, Validators.email]],
      datePicer: [null, Validators.required],
      drop: [null, Validators.required],
    });
    console.log(this.form);
  }
  setDropDownSelectItem(event: any) {
    this.form.get("drop")?.setValue(event);
  }
  setDatePicker(event: any) {
    this.dateObject = event;
    this.form.get("datePicer")?.setValue(event);
  }

  allowDrop(ev) {
    ev.preventDefault();
  }

  drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
  }

  drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
  }
}
