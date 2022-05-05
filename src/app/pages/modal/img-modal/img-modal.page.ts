import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { IonSlides, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-img-modal',
  templateUrl: './img-modal.page.html',
  styleUrls: ['./img-modal.page.scss'],
})
export class ImgModalPage implements OnInit {

  @ViewChild(IonSlides) slides: IonSlides;
  @Input('img')img: any;
 
  sliderOpts = {
    zoom: true
  };
 
  constructor(private modalController: ModalController) { }
 
  ngOnInit() { }
 
  ionViewDidEnter(){
    this.slides.update();
  }
 
  async zoom(zoomIn: boolean) {
    const slider = await this.slides.getSwiper();
    const zoom = slider.zoom;
    zoomIn ? zoom.in() : zoom.out();
  }
 
  close() {
    this.modalController.dismiss();
  }

}
