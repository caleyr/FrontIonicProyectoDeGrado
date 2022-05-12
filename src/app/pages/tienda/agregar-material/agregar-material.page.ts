import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Order } from 'src/app/model/Order';
import { UserService } from '../../../services/user.service';
import { Params, ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Observable, Subject } from 'rxjs';
import { resolve } from 'dns';
import { rejects } from 'assert';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-agregar-material',
  templateUrl: './agregar-material.page.html',
  styleUrls: ['./agregar-material.page.scss'],
})
export class AgregarMaterialPage implements OnInit {

  form: FormGroup;
  id : any;
  state : any;
  material : any;
  paso = null;  
  orden : Order = new Order();
  listaParaVerificar : Order[] = [];
  listaMateriales = 
  [
    {
      material : 'Plastico',
      value : 'Plastico'
    },
    {
      material : 'Carton Y Papel',
      value : 'CartonYPapel'
    },
    {
      material : 'VidrioOMetal',
      value : 'VidrioOMetal'
    },
    {
      material : 'Otro',
      value : 'Otro'
    }
  ]
  

  constructor(
    private formBuilder : FormBuilder,
    private userService : UserService,
    private apiService : ApiService,
    private route : ActivatedRoute,
    private alertController :  AlertController,
    private router : Router, 
  ) { 
    this.inicializarFormularioVacio();
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.state = params['state'];
      this.id = params['id'];
      if(this.state === 'crear'){
        this.inicializarFormularioVacio();
      }else{
        this.orden = this.userService.material;
        this.cargarTipo().then(data =>{
          if(data === false){
            this.inicializarFormularioActualzarOtro();
            this.material = 'Otro';
          }else{
            this.inicializarFormularioActualzar();
            this.material = this.orden.typeOfMaterial;
          }
        });
      }
    });
  }

  onChange(newValue) {
    if(this.material !== 'Otro'){
      this.form.patchValue({
        tipoMaterial : newValue
      })
    }else{
      this.form.patchValue({
        tipoMaterial : ' '
      })
    }    
  }

  
  cargarTipo(){
    return new Promise((resolve, rejects)=>{
      var cant = 0;
      for (var index = 0; index < this.listaMateriales.length; index++) {
        cant = cant + 1;
        if(this.listaMateriales[index].material !== this.orden.typeOfMaterial){
          if(cant === this.listaMateriales.length){
            resolve(false);
          }
        }else if(this.listaMateriales[index].material === this.orden.typeOfMaterial){
          resolve(true);
        }
      }
    });
  }

  inicializarFormularioVacio() {
    this.form = this.formBuilder.group({
      tipoMaterial: ['', [Validators.required]],
      precio: ['', [Validators.required, Validators.pattern('[0-9]*')]],
    });
  }

  inicializarFormularioActualzar() {
    this.form = this.formBuilder.group({
      tipoMaterial: [this.orden.typeOfMaterial, [Validators.required]],
      precio: [this.orden.price, [Validators.required, Validators.pattern('[0-9]*')]],
    });
  }

  inicializarFormularioActualzarOtro() {
    this.form = this.formBuilder.group({
      tipoMaterial: [this.orden.typeOfMaterial, [Validators.required]],
      precio: [this.orden.price, [Validators.required, Validators.pattern('[0-9]*')]],
    });
  }

  async guardarMaterial() {
    if(this.getTipoMaterial().value === ' '){
      this.form.patchValue({
        tipoMaterial : ''
      })
    }else{
      if(this.form.valid == true){
        if(this.state === 'crear'){
          this.listaParaVerificar = await (await this.userService.obtenerInfoTienda(this.apiService.emailUser).toPromise()).data.orderList;
          this.listaParaVerificar = this.listaParaVerificar.filter((data) => data.typeOfMaterial === this.getTipoMaterial().value);
          if(this.listaParaVerificar.length === 0){
            let material : Order = new Order();
            material.typeOfMaterial = this.getTipoMaterial().value;
            material.price = this.getPrecio().value;          
            this.userService.guardarMaterial( this.id ,material).subscribe(
              async _ => {
                this.presentAlert('Material Creado'); 
              },
              async (res) => {       
                this.presentAlertError();
              }
            );
          }else{
            this.presentAlertError();
          }          
        }else{

          let material : Order = new Order();
          material.typeOfMaterial = this.getTipoMaterial().value;
          material.price = this.getPrecio().value;
          this.userService.actualizarMaterial( this.id ,material).subscribe(
            async _ => {       
              this.presentAlert('Material Actualizado');
            },
            async (res) => {       
              this.presentAlertError();            
            }
          );
          
        }  
      }else{
        this.form.markAllAsTouched();
      }
    }    
  }

  async presentAlertError(){
    const alert = await this.alertController.create({
      mode: 'ios',
      header: 'Error del Material.',
      buttons: ['OK']
    });
    await alert.present();
  }

  async presentAlert(msg : string) {
    const alert = await this.alertController.create({
      mode: 'ios',
      header: msg,
      backdropDismiss: false,
      buttons: [
        {
          text: 'OK',
          handler: (blah) => {
            this.router.navigateByUrl('/tabs-tienda/ver-datos-tienda', { replaceUrl: true });
          }
        }
      ]
    });
    await alert.present();
  }

  getTipoMaterial(){
    return this.form.get('tipoMaterial');
  }

  getPrecio(){
    return this.form.get('precio');
  }
}
