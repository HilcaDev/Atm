import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[brokeImage]'
})
export class BrokeImageDirective {
  @Input() urlImage!:string;

  constructor(private elementRef:ElementRef) { }

  @HostListener('error')
  UploadImage(){
    const element = this.elementRef.nativeElement;
    element.src = this.urlImage || 'https://dam.muyinteresante.com.mx/wp-content/uploads/2020/04/error-404.jpg'
  }
}
