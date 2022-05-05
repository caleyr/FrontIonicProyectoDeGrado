import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Directory, Filesystem } from '@capacitor/filesystem';
import { Capacitor } from '@capacitor/core';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { PuntoRecoleccionService } from '../../services/punto-recoleccion.service';
import { CollectionPoint } from '../../model/CollectionPoint';

@Component({
  selector: 'app-punto-recoleccion',
  templateUrl: './punto-recoleccion.page.html',
  styleUrls: ['./punto-recoleccion.page.scss'],
})
export class PuntoRecoleccionPage implements OnInit {

  private imageUrl : string;
  

  constructor(private puntoRecoleccion : PuntoRecoleccionService,
              private router : Router){}

  ngOnInit() {
  }

  public async addNewToGallery(){
    /*const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100,
    });
    this.imageUrl = capturedPhoto.webPath;
    this.puntoRecoleccion.setImagen(this.imageUrl);
    
    if(this.imageUrl!=null){
      this.router.navigate(['/punto-recoleccion/agregar-clasificacion/']);
    }*/
  }  
}
