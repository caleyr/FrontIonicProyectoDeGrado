import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'usuarios',
    loadChildren: () => import('./pages/usuarios/usuarios.module').then( m => m.UsuariosPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./pages/admin/admin.module').then( m => m.AdminPageModule)
  },
  {
    path: 'lista-recoleccion-residente',
    loadChildren: () => import('./pages/residente/lista-recoleccion-residente/lista-recoleccion-residente.module').then( m => m.ListaRecoleccionResidentePageModule)
  },
  {
    path: 'crear-punto-recoleccion',
    loadChildren: () => import('./pages/residente/crear-punto-recoleccion/crear-punto-recoleccion.module').then( m => m.CrearPuntoRecoleccionPageModule)
  },
  {
    path: 'residente',
    loadChildren: () => import('./pages/residente/residente.module').then( m => m.ResidentePageModule)
  },
  {
    path: 'reciclador',
    loadChildren: () => import('./pages/reciclador/reciclador.module').then( m => m.RecicladorPageModule)
  },
  {
    path: 'cuidados',
    loadChildren: () => import('./pages/cuidados/cuidados.module').then( m => m.CuidadosPageModule)
  },
  {
    path: 'ver-registro',
    loadChildren: () => import('./pages/ver-registro/ver-registro.module').then( m => m.VerRegistroPageModule)
  },
  {
    path: 'img-modal',
    loadChildren: () => import('./pages/modal/img-modal/img-modal.module').then( m => m.ImgModalPageModule)
  },
  {
    path: 'ver-tieda-modal',
    loadChildren: () => import('./pages/modal/ver-tieda-modal/ver-tieda-modal.module').then( m => m.VerTiedaModalPageModule)
  },
  {
    path: 'confirmar-direccion',
    loadChildren: () => import('./pages/modal/confirmar-direccion/confirmar-direccion.module').then( m => m.ConfirmarDireccionPageModule)
  },
  {
    path: 'tienda',
    loadChildren: () => import('./pages/tienda/tienda.module').then( m => m.TiendaPageModule)
  },
  {
    path: 'opciones-direccion',
    loadChildren: () => import('./pages/popover/opciones-direccion/opciones-direccion.module').then( m => m.OpcionesDireccionPageModule)
  },
  {
    path: 'tabs-residente',
    loadChildren: () => import('./pages/tabs/tabs-residente/tabs-residente.module').then( m => m.TabsResidentePageModule)
  },
  {
    path: 'tabs-reciclador',
    loadChildren: () => import('./pages/tabs/tabs-reciclador/tabs-reciclador.module').then( m => m.TabsRecicladorPageModule)
  },
  {
    path: 'tabs-tienda',
    loadChildren: () => import('./pages/tabs/tabs-tienda/tabs-tienda.module').then( m => m.TabsTiendaPageModule)
  },
  {
    path: 'opciones-material',
    loadChildren: () => import('./pages/popover/opciones-material/opciones-material.module').then( m => m.OpcionesMaterialPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
