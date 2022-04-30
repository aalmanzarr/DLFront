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
export class NotfoundComponent implements OnInit, AfterViewInit {
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

  ngOnInit() {}

  ngAfterViewInit(): void {
    const canvasEl: HTMLCanvasElement = this.myCanvas.nativeElement;
    this.cx = canvasEl.getContext("2d");

    const mouseDown$ = fromEvent(this.myCanvas.nativeElement, "mousedown");
    const mouseMove$ = fromEvent(this.myCanvas.nativeElement, "mousemove");
    const mouseUp$ = fromEvent(this.myCanvas.nativeElement, "mouseup");

    mouseDown$.pipe(concatMap(down => mouseMove$.pipe(takeUntil(mouseUp$))));

    const mouseDraw$ = mouseDown$.pipe(
      tap((e: MouseEvent) => {
        this.cx.moveTo(e.offsetX, e.offsetY);
      }),
      concatMap(() => mouseMove$.pipe(takeUntil(mouseUp$)))
    );

    mouseDraw$.subscribe((e: MouseEvent) => {this.draw(e.offsetX, e.offsetY)
    this.mouse=e;
    
    });
  }

  draw(offsetX, offsetY) {
    if (this.mouse) {     
    this.click = 1;
    this.cx.lineTo(offsetX, offsetY);
    var x = Math.floor(offsetY * 0.2);
    var y = Math.floor(offsetX * 0.2) + 1;

      
    
    for (var dy = 0; dy < 2; dy++){     
        for (var dx = 0; dx < 2; dx++){

            if ((x + dx < 28) && (y + dy < 28)){
                this.pixels[(y+dy)+(x+dx)*28] = 1;
            }
            else{
              this.pixels[(y+dy)+(x+dx)*28] = 0;
            }
        }
    }

    
    this.cx.stroke();}
  }
  result:any
  resultDS:any
  set_value(){
    if (this.click == 1){
      this.click = 0;
    this.resultDS = "[["
        for (var i = 0; i < 28; i++) {
          this.resultDS += "["
            for (var j = 0; j < 28; j++) {

              this.resultDS += this.pixels [i * 28 + j]? this.pixels [i * 28 + j]:0                
                if (j < 27) {
                  this.resultDS += ", "
                }
            }
            this.resultDS += "]"
            if (i < 27) {
              this.resultDS += ", "
            }
        }
        this.resultDS += "]]"
    console.log(this.resultDS);
    this.sendToAWS()
      }
    
  }
  sendToAWS(){
    this.http.getNumber(this.resultDS).then((data)=>{console.log(data);
    this.result=data
    })

  }

  refresh() {
    console.log(this.cx);
    
    this.cx.fillStyle= "rgb(255,255,255)";
    this.cx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.cx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    for (var i = 0; i < 28*28; i++) this.pixels[i] = 0;
    window.location.reload();
  }
    
}
