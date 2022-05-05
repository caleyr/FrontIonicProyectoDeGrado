import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Order } from 'src/app/model/Order';
import { UserService } from '../../../services/user.service';
import { Params, ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Observable, Subject } from 'rxjs';

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
  listaMateriales = 
  [
    {
      material : 'Plastico'
    },
    {
      material : 'CartonYPapel'
    },
    {
      material : 'VidrioOMetal'
    },
    {
      material : 'Otro'
    }
  ]
  orden : Order = new Order();
  

  constructor(
    private formBuilder : FormBuilder,
    private userService : UserService,
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
        console.log('MAETRST '+ JSON.stringify(this.orden));
             
        this.cargarTipo().subscribe(data =>{
          console.log('HOAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+data);
        });            
      }
    });
  }

  
  cargarTipo() : Observable<Boolean>{
    var cant = 0;
    var subject = new Subject<boolean>();
    for (var index = 0; index < this.listaMateriales.length; index++) {
      cant = cant + 1;
      if(this.listaMateriales[index].material !== this.orden.typeOfMaterial){
        if(cant === index){
          subject.next(false);          
          return subject.asObservable();
        }
      }else if(this.listaMateriales[index].material === this.orden.typeOfMaterial){
        subject.next(true);        
        return subject.asObservable();
      }
    }    
  }

  inicializarFormularioVacio() {
    this.form = this.formBuilder.group({
      tipoMaterial: ['', [Validators.required]],
      precio: ['', [Validators.required, Validators.pattern('[0-9]*')]],
    });
    this.form.valueChanges.subscribe(value => {
      if(value.tipoMaterial !== 'Otro'){
        this.material = value.tipoMaterial;
      }else if(value.tipoMaterial === 'Otro'){
        this.material = ' ';
      }
    });
  }

  inicializarFormularioActualzar() {
    this.form = this.formBuilder.group({
      tipoMaterial: [this.orden.typeOfMaterial, [Validators.required]],
      precio: [this.orden.price, [Validators.required, Validators.pattern('[0-9]*')]],
    });
    this.form.valueChanges.subscribe(value => {
      if(value.tipoMaterial !== 'Otro'){
        this.material = value.tipoMaterial;
      }else if(value.tipoMaterial === 'Otro'){
        this.material = ' ';
      }
    });
  }

  inicializarFormularioActualzarOtro() {
    this.form = this.formBuilder.group({
      tipoMaterial: ['Otro', [Validators.required]],
      precio: [this.orden.price, [Validators.required, Validators.pattern('[0-9]*')]],
    });
    this.form.valueChanges.subscribe(value => {
      if(value.tipoMaterial !== 'Otro'){
        this.material = value.tipoMaterial;
      }else if(value.tipoMaterial === 'Otro'){
        this.material = ' ';
      }
    });
  }

  async guardarMaterial() {
    if(this.material === ' '){
      this.material = '';
    }else{
      if(this.form.valid == true){       
        if(this.state === 'crear'){

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

          let material : Order = new Order();
          material.typeOfMaterial = this.getTipoMaterial().value;
          material.price = this.getPrecio().value;
          this.userService.guardarMaterial( this.id ,material).subscribe(
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
      header: 'Error de Material.',
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
