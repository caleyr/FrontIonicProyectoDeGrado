import { Component, OnInit } from '@angular/core';
import { PuntoRecoleccionService } from '../../../../services/punto-recoleccion.service';
import { Router } from '@angular/router';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Capacitor } from '@capacitor/core';
import { LoadingController } from '@ionic/angular';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Directory, Filesystem } from '@capacitor/filesystem';
import { LocalFile } from '../../../../model/LocalFile';
const IMAGE_DIR = 'stored-images';

@Component({
  selector: 'app-agregar-foto-recoleccion',
  templateUrl: './agregar-foto-recoleccion.page.html',
  styleUrls: ['./agregar-foto-recoleccion.page.scss'],
})
export class AgregarFotoRecoleccionPage implements OnInit {

  imagen : string;
  img : SafeResourceUrl;
  loading = null;
  constructor(private puntoRecoleccion : PuntoRecoleccionService,
    private router : Router,
    public loadingController: LoadingController) { }
  ngOnInit() {
    Camera.requestPermissions();
  }

  async addNewToGallery(){
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Base64,
      source: CameraSource.Camera,      
      allowEditing: false,
      quality: 60
    }).then(async (file) =>{      
      this.savePicture(file);
    },(err) => {
      console.log(err);
    });   
  }

  private async savePicture(photo: Photo) {
    this.puntoRecoleccion.format = photo.format;
    this.puntoRecoleccion.setImagen(photo.base64String);
    this.router.navigate(['/residente/crear-punto-recoleccion/agregar-direccion-recoleccion/']);
  }
}
