import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  HostListener,
  AfterViewInit
} from "@angular/core";
import { fromEvent, combineLatest } from "rxjs";
import { filter, tap, concatMap, mergeMap, takeUntil } from "rxjs/operators";
import { HttpService } from "../http.service";

export enum Direction {
  up,
  left,
  down,
  right
}

export const DistanceConfig = {
  up: {
    x: 0,
    y: 10
  },
  left: {
    x: -10,
    y: 0
  },
  down: {
    x: 0,
    y: -10
  },
  right: {
    x: 10,
    y: 0
  }
};

@Component({
  selector: 'app-notfound',
  templateUrl: './notfound.component.html',
  styleUrls: ['./notfound.component.css']
})
export class NotfoundComponent {
  title = 'FronDLContinua';
  name = "Angular";
  cx;
  canvas = { width: 500, height: 500 };
  currentLocation = { x: 0, y: 0 };
  preDirection: string;
  pixels:any=[]
  click=0
  mouse:any;
  locationList = [];

  @ViewChild("myCanvas", { static: false }) myCanvas: ElementRef;

  constructor(private el: ElementRef,private http: HttpService) {}



  
}
