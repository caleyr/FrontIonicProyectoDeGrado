import { Component, OnInit, Inject, Renderer2 } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Address } from '../../../model/Address';
import { DataService } from '../../../services/data.service';
import { Neighborhood } from '../../../model/Neighborhood';
import { Geolocation } from '@capacitor/geolocation';
import { DOCUMENT } from '@angular/common';
import { ConfirmarDireccionPage } from '../../modal/confirmar-direccion/confirmar-direccion.page';
import { ModalController, AlertController } from '@ionic/angular';
import { ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { alertController } from '@ionic/core';
declare var google;

@Component({
  selector: 'app-agregar-direccion',
  templateUrl: './agregar-direccion.page.html',
  styleUrls: ['./agregar-direccion.page.scss'],
})
export class AgregarDireccionPage implements OnInit {

  
  form: FormGroup;
  listaTipoDirecciones : Neighborhood[];

  nombreTipo : string = 'Calle';

  direccion : Address = new Address();
  id : any;
  rol : any;
  state : any;
  check = true;
  geocoder = null;
  loc = [];
  
  constructor(
    private dataService : DataService,
    private formBuilder : FormBuilder,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document,
    private modalController: ModalController,
    private route: ActivatedRoute,
    private userService : UserService,
    private alertController : AlertController
    ){
      this.inicializarFormularioVacio();      
  }

  ngOnInit() {
    this.dataService.getCamino().subscribe(data=>{
      this.listaTipoDirecciones = data;
    });
    this.route.params.subscribe((params: Params) => {      
      this.rol = params['id_role'];
      this.state = params['state'];
      this.id = params['id'];
      if(this.state === 'crear' || this.state === 'crearPunto'){
        this.inicializarFormularioVacio();
      }else{
        this.direccion = this.userService.direccion;
        this.inicializarFormularioActualzar();
      }
    });    
    this.loadGoogle();    
  }

  loadGoogle(){
    this.geocoder = new google.maps.Geocoder();
  }

  inicializarFormularioVacio() {
    this.form = this.formBuilder.group({
      lugar: [{ value: 'Facatativá', disabled: true },[Validators.required]],
      barrio: ['', [Validators.required]],
      tipoCalle:['', [Validators.required]],
      calle: ['', [Validators.required, Validators.maxLength(10)]],
      numeroUno: [ '', [Validators.required, Validators.maxLength(10)]],
      checkB: [ false, [Validators.required]],
      numeroDos: ['', [Validators.required, Validators.maxLength(5)]],     
      descripcion: ['', [Validators.required ,Validators.maxLength(100)]],
    });
    this.form.valueChanges.subscribe(value => {
      if(value.tipoCalle !== ''){
        this.nombreTipo = value.tipoCalle;
      }
    });
  }

  inicializarFormularioActualzar() {
    this.form = this.formBuilder.group({
      lugar: [{ value: 'Facatativá', disabled: true },[Validators.required]],
      barrio: [this.direccion.neighborhood, [Validators.required]],
      tipoCalle:[this.direccion.streetType , [Validators.required]],
      calle: [this.direccion.career, [Validators.required, Validators.maxLength(10)]],
      numeroUno: [ this.direccion.numberOne , [Validators.required, Validators.maxLength(10)]],
      checkB: [ false, [Validators.required]],
      numeroDos: [ this.direccion.numberTwo, [Validators.required, Validators.maxLength(5)]],     
      descripcion: [this.direccion.description , [Validators.required, Validators.maxLength(100)]],
    });

    if(this.direccion.numberOne === null && this.direccion.numberTwo === null){
      this.form.controls['numeroUno'].disable();
      this.form.controls['numeroDos'].disable();
      this.form.controls['checkB'].setValue('on');
    }
    
    if(this.getTipoCalle().value !== ''){
      this.nombreTipo = this.getTipoCalle().value;
    }
    this.form.valueChanges.subscribe(value => {
      if(value.tipoCalle !== ''){
        this.nombreTipo = value.tipoCalle;
      }
    });
  }

  async guardarDireccion() {
    if(this.form.valid){
      let direccion = new Address();
      direccion.neighborhood = this.form.value['barrio'];    
      direccion.streetType = this.form.value['tipoCalle'];
      direccion.career = this.form.value['calle'];
      direccion.numberOne = this.form.value['numeroUno'];
      direccion.numberTwo = this.form.value['numeroDos'];
      direccion.description = this.form.value['descripcion'];
      if(this.state === 'crear' || this.state === 'crearPunto'){
        this.codificacion(direccion);
      }else{
        direccion.latitude = this.direccion.latitude;
        direccion.longitude = this.direccion.longitude;
        this.modalSetDireccion(direccion);
      }
    }else{
      this.form.markAllAsTouched();
    }
  }

  async codificacion(direccion : Address){
    let direccionText;
    if(direccion.numberOne === undefined && direccion.numberOne === undefined){
      direccionText = `${direccion.streetType} ${direccion.career}, Facatativa`;
    }else{
      direccionText = `${direccion.streetType} ${direccion.career} #${direccion.numberOne} - ${direccion.numberTwo}, Facatativa`;
    }
    this.geocoder.geocode({
        address : direccionText
      }).then((result)=>{
        const { results } = result;
        direccion.latitude = (results[0].geometry.location.lat());
        direccion.longitude = (results[0].geometry.location.lng());     
        this.modalSetDireccion(direccion);
    }).catch((e) => {
      this.presentAlertError();
    });
  }

  cambiarCheck(event){
    if(event.currentTarget.checked === true){
      this.form.controls['numeroUno'].disable();
      this.form.controls['numeroDos'].disable();
      
    }else{
      this.form.controls['numeroUno'].enable();
      this.form.controls['numeroDos'].enable();
    } 
  }

  async modalSetDireccion(direccion : Address){
    const modal = await this.modalController.create({
      component: ConfirmarDireccionPage,
      componentProps:{        
        rol : this.rol,        
        estado : this.state,        
        id : this.id,
        direccion,
      }
    })
    await modal.present();
  }

  async presentAlertError(){
    const alert = await this.alertController.create({
      mode: 'ios',
      header: 'Direccion no Encontrada.',
      buttons: ['OK']
    });
    await alert.present();
  }

  getLugar(){
    return this.form.get('lugar');
  }

  getBarrio(){
    return this.form.get('barrio');
  }

  getTipoCalle(){
    return this.form.get('tipoCalle');
  }

  getCalle(){
    return this.form.get('calle');
  }

  getNumeroUno(){
    return this.form.get('numeroUno');
  }

  getNumeroDos(){
    return this.form.get('numeroDos');
  }

  getCheck(){
    return this.form.get('numeroDos');
  }

  getDescripcion(){
    return this.form.get('descripcion');
  }

}
