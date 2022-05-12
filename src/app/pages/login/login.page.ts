import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AlertController, LoadingController } from '@ionic/angular';
import { ApiService } from '../../services/api.service';
import { AppComponent } from '../../app.component';
import { DataService } from '../../services/data.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  credentials: FormGroup;

  constructor(
    private router: Router,
    private menu: MenuController,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private apiService: ApiService,
    private formBuilder : FormBuilder,
    private appComponent : AppComponent,
    private dataService : DataService,
    private userService : UserService
    ) {
     }

  ngOnInit() {
    this.menu.enable(false);
    this.inicializarFormularioVacio();
  }

  async login() {
    const loading = await this.loadingController.create();
    await loading.present();
    this.userService.verificarCorreoExistente(this.credentials.get('email').value).subscribe(async result=>{
      if(result.status === 200){
        const data = await this.apiService.verificarEstado(this.credentials.get('email').value).toPromise();
        if(data.status === 200){
          this.apiService.login(this.credentials.value).subscribe(
            async data => {        
              await loading.dismiss();        
              this.cargarRuta();  
            },
            async (res) => {        
              await loading.dismiss();
              this.presentAlert();
            }
          );
        }else{
          await loading.dismiss();
          this.presentAlertEstado();
        }
      }else{
        await loading.dismiss();
        this.presentAlert();
      }
    });   
  }

  inicializarFormularioVacio() {
    this.credentials = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass:'my-custom-class',
      mode : 'ios',
      header: 'Correo o contraseña incorrecta.',
      buttons: ['OK']
    });

    await alert.present();
  }

  async presentAlertEstado() {
    const alert = await this.alertController.create({
      cssClass:'my-custom-class',
      mode : 'ios',
      header: 'Usuario Inactivo',
      message : 'Debes esperar hasta que verifiquen tus datos.',
      buttons: ['OK']
    });

    await alert.present();
  }


  cargarRuta(){    
    this.appComponent.componentes = this.dataService.getMenuOpts();
    if(this.apiService.roleUser === "Administrador"){
      this.router.navigateByUrl('/admin/lista-usuario-admin', { replaceUrl: true });
    }else if(this.apiService.roleUser === "Reciclador"){
      this.router.navigateByUrl('/tabs-reciclador/ver-recoleccion', { replaceUrl: true });
      this.apiService.comprobarNotificacion();
    }else if(this.apiService.roleUser === "isResident"){
      this.router.navigateByUrl('/tabs-residente/crear-publicacion', { replaceUrl: true });
      this.apiService.comprobarNotificacion();
    }else if(this.apiService.roleUser === "isShop"){
      this.router.navigateByUrl('/tabs-tienda/ver-datos-tienda', { replaceUrl: true });
    }
  }

  lllamar(){
    this.userService.obtenerListaUsuario().subscribe((data : any)=>{
      console.log(data.data);        
    });
  }
}

