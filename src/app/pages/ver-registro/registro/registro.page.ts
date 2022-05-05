import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ValueAccessor } from '@ionic/angular/directives/control-value-accessors/value-accessor';
import { Address } from 'src/app/model/Address';
import { Recycler } from 'src/app/model/Recycler';
import { Resident } from 'src/app/model/Resident';
import { Shop } from 'src/app/model/Shop';
import { User } from 'src/app/model/User';
import { UserService } from 'src/app/services/user.service';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  form: FormGroup;

  rol: string;
  loading = null;

  constructor(    
    private formBuilder : FormBuilder,
    private route: ActivatedRoute,
    private registro : UserService,
    private alertController: AlertController,
    private router: Router,
    private loadingController : LoadingController
  ) { 
    this.inicializarFormularioVacio();
  }

  async ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.rol = params['id_role'];
      if(this.rol == "residente"){      
        this.form.patchValue({
          numeroDocumento: '0',             
          tipoDocumento: ' '
        });
      }else if(this.rol == "tienda"){
        this.form.patchValue({
          apellido: 'a'
        });
      }else if(this.rol == "reciclador"){
        this.form.patchValue({          
          tipoDocumento: ' '
        });   
      }
    });    
    this.loading = await this.loadingController.create();
  }

  inicializarFormularioVacio() {
    this.form = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      correo: ['', [Validators.required, Validators.email]],
      tipoDocumento: ['', [Validators.required]],
      numeroDocumento: ['', [Validators.required, Validators.pattern('[0-9]*')]],
      telefono: ['', [Validators.required, Validators.pattern('[0-9]*')]],         
      contraseña: ['', [Validators.required]]
    });
    
  }

  async guardarUsuario() {
    console.log(this.rol + ' ' + this.form.valid);    
    if(this.form.valid === true){
      await this.loading.present();
      let usuario = new User();
      usuario.email = this.getCorreo().value;
      usuario.password = this.getContrasenia().value;

      if(this.rol === "residente"){

        let residente = new Resident();
        residente.name = this.getNombre().value;
        residente.lastName = this.getApellido().value;
        residente.phone = this.getTelefono().value;
        residente.addressList = [];   
        usuario.state = true;               
        usuario.role = "Residente";    
        residente.user = usuario;
        const data = await this.registro.guardarResident(residente).toPromise();
        if(data.status === 409){
          await this.loading.dismiss();
          this.presentAlertError();
        }else{
          await this.loading.dismiss();
          console.log('Ok' + JSON.stringify(data.status));     
          this.router.navigateByUrl(`/usuarios/codigo-verificacion/registro/${usuario.email}`, { replaceUrl: true });
          //this.presentAlert();
        }
        
      }else if(this.rol === "reciclador"){
        
        let reciclador = new Recycler();
        reciclador.name = this.getNombre().value;
        reciclador.lastName = this.getApellido().value;
        reciclador.documentType = "CC";
        reciclador.document = this.getNumeroDocumento().value;
        reciclador.phone = this.getTelefono().value;      
        usuario.state = true;               
        usuario.role = "Reciclador";    
        reciclador.user = usuario;
        const data = await this.registro.guardarRecycler(reciclador).toPromise();
        if(data.status === 409){
          await this.loading.dismiss();
          this.presentAlertError();
        }else{
          await this.loading.dismiss();
          console.log('Ok' + JSON.stringify(data.status));     
          this.router.navigateByUrl(`/usuarios/codigo-verificacion/registro/${usuario.email}`, { replaceUrl: true });
          //this.presentAlert();
        }

      }else if(this.rol === "tienda"){
        let tienda = new Shop();
        tienda.name = this.getNombre().value;
        tienda.documentType = this.getTipoDocumento().value;
        tienda.document = this.getNumeroDocumento().value;
        tienda.phone = this.getTelefono().value;
        tienda.address = null;
        tienda.orderList = [];        
        usuario.state = true;       
        usuario.role = "Tienda";    
        tienda.user = usuario;

        const data = await this.registro.guardarShop(tienda).toPromise();
        if(data.status === 409){
          await this.loading.dismiss();
          this.presentAlertError();
        }else{
          await this.loading.dismiss();
          console.log('Ok' + JSON.stringify(data.status));     
          this.router.navigateByUrl(`/usuarios/codigo-verificacion/registro/${usuario.email}`, { replaceUrl: true });
          //this.presentAlert();
        }
      }
    }else{
      this.form.markAllAsTouched();
    }
  }

  getNombre(){
    return this.form.get('nombre');
  }

  getApellido(){
    return this.form.get('apellido');
  }

  getCorreo(){
    return this.form.get('correo');
  }

  getTipoDocumento(){
    return this.form.get('tipoDocumento');
  }

  getNumeroDocumento(){
    return this.form.get('numeroDocumento');
  }

  getTelefono(){
    return this.form.get('telefono');
  }

  getContrasenia(){
    return this.form.get('contraseña');
  }

  async presentAlertError(){
    const alert = await this.alertController.create({
      mode: 'ios',
      header: 'Este usuario ya existe.',
      buttons: ['OK']
    });
    await alert.present();
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      mode: 'ios',
      header: 'Usuario Registrado.',
      backdropDismiss: false,
      buttons: [
        {
          text: 'OK',
          handler: (blah) => {
            this.router.navigateByUrl('/login', { replaceUrl: true });
          }
        }
      ]
    });
    await alert.present();
  }

}
