import { EventEmitter, Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class CustomFileUploaderService {
  response = new EventEmitter<any>();
}
