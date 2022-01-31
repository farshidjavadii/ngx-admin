import { Component, Input, OnInit, EventEmitter } from "@angular/core";
import { FileUploader } from "ng2-file-upload";
import { CustomFileUploaderService } from "./custom-file-uploader.service";

@Component({
  selector: "custom-file-uploader",
  templateUrl: "./custom-file-uploader.component.html",
  styleUrls: ["./custom-file-uploader.component.scss"],
})
export class CustomFileUploaderComponent implements OnInit {
  constructor(private uploaderService:CustomFileUploaderService) {
    if (!this.MultiSelect) this.uploader.options.queueLimit = 1;

    console.log(this.uploader.options.allowedMimeType.toString());
  }

  ngOnInit() {
    this.uploader.response.subscribe(res => {
      this.uploaderService.response.emit(res);
    })
    console.log(this.uploader);
  }
  @Input() MultiSelect: boolean = false;
  @Input() selectBtnText: string = "انتخاب فایل";
  @Input() uploadBtnText: string = "بارگذاری";
  @Input() deleteBtnText: string = "حذف";
  @Input() uploadBtnTextAll: string = "بارگذاری همه";
  @Input() deleteBtnTextAll: string = "حذف همه";
  @Input() url: string = "not set";
  @Input() allowedType: string[] = ["image/jpeg", "image/png"];

  

  option = {
    url: this.url,
    allowedMimeType: this.allowedType,
    //allowedFileType:['image','video']
  };

  public uploader: FileUploader = new FileUploader(this.option);

  public hasBaseDropZoneOver: boolean = false;
  public hasAnotherDropZoneOver: boolean = false;

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
    console.log(e);
  }
  public fileOverAnother(e: any): void {
    this.hasAnotherDropZoneOver = e;
  }
}
