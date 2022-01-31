import { animate, state, style, transition, trigger } from "@angular/animations";
import { Component, Input, OnInit, ViewChild } from "@angular/core";

@Component({
  selector: "custom-card",
  templateUrl: "./custom-card.component.html",
  styleUrls: ["./custom-card.component.scss"],
  animations: [
    trigger(
      'enterAnimation', [
      //   state('hide', style({
      //     height: '0px',
      //     opacity: '0',
      //     overflow: 'hidden',
      //     // display: 'none'
      // })),
      // state('show', style({
      //     height: '*',
      //     opacity: '1',
      //     // display: 'block'
      // })),
      //   transition('* <=> *',animate('600ms'))
        transition(':enter', [
          style({transform: 'translateY(-100%)', opacity: 0,}),
          animate('500ms', style({transform: 'translateY(0)', opacity: 1}))
        ]),
        transition(':leave', [
          style({transform: 'translateY(0)', opacity: 1}),
          animate('500ms', style({transform: 'translateY(-100%)', opacity: 0}))
        ]),
      ]
    )
  ],
})
export class CustomCardComponent implements OnInit {
  constructor() {}

  @Input() title: string = "default title";
  @Input() removable: boolean = false;
  @Input() minimizable: boolean = false;
  @Input() fullscreenable: boolean = false;
  enterAnimation = 'show';
  removeCustomCard: boolean = false;
  minimizeCustomCard: boolean = false;
  fullscreenCustomCard: boolean = false;

  ngOnInit() {}

  closeIconClick(popover) {
    console.log(popover);

    this.removeCustomCard = true;
  }
  minimizeIconClick(event) {
    debugger;
    console.log(this.enterAnimation);
    this.enterAnimation = this.enterAnimation== 'show'? 'hide':'show'
    this.minimizeCustomCard = this.minimizeCustomCard == false;
  }
  fullScreenClick() {
    this.fullscreenCustomCard = this.fullscreenCustomCard == false;
  }
}
