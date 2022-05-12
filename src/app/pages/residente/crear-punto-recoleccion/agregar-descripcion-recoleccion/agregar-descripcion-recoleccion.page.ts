import { Component, OnInit } from '@angular/core';
import { PuntoRecoleccionService } from '../../../../services/punto-recoleccion.service';
import { LocalFile } from '../../../../model/LocalFile';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-agregar-descripcion-recoleccion',
  templateUrl: './agregar-descripcion-recoleccion.page.html',
  styleUrls: ['./agregar-descripcion-recoleccion.page.scss'],
})
export class AgregarDescripcionRecoleccionPage implements OnInit {

  form: FormGroup;
  formData : FormData = new FormData();

  constructor(
    private puntoRecoleccion : PuntoRecoleccionService,
    private formBuilder : FormBuilder,
    private alertController : AlertController,
    private router: Router,
    ) {
    this.inicializarFormularioVacio();
   }

  ngOnInit() {
  }

  inicializarFormularioVacio() {
    this.form = this.formBuilder.group({
      cantidad: [0, [Validators.maxLength(2)]],     
      descripcion: ['', [Validators.required]],
    });
  }

  async guardarForm() {
    if(this.form.valid){
      this.puntoRecoleccion.setDescripcion(this.getDescripcion().value);
      //this.puntoRecoleccion.setCantidad(this.getCantidad().value);
      this.puntoRecoleccion.setEstado('Espera');
      this.subirImg();
    }else{
      this.form.markAllAsTouched();
    }
  }

  async subirImg(){
    this.puntoRecoleccion.agregarCollectionPoint(this.puntoRecoleccion.punto, this.puntoRecoleccion.format).subscribe(
      async data =>{
        console.log(data);
      },
      (err) =>{
        console.log(err);        
      }
    );
    this.presentAlert('Reciclaje Publicado');
  }


  cambiarPunto(number : number){
    const Numeroaletra = String(number);
    const Buscarpunto = Numeroaletra.indexOf('.');
    const Parte1 = Numeroaletra.substring(0,Buscarpunto)
    const Parte2 = Numeroaletra.substring(Buscarpunto+1,Numeroaletra.length)
    return Parte1+","+Parte2;
  }

  async presentAlert(mensaje : string) {
    const alert = await this.alertController.create({
      mode: 'ios',
      header: mensaje,
      backdropDismiss: false,
      buttons: [
        { 
          text: 'OK',
          handler: (blah) => {            
            this.router.navigateByUrl('/tabs-residente/ver-historial', { replaceUrl: true });
          }
        }
      ]
    });
    await alert.present();
  }

  getCantidad(){
    return this.form.get('cantidad');
  }

  getDescripcion(){
    return this.form.get('descripcion');
  }
}
