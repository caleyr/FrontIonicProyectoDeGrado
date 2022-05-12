import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsuariosPage } from './usuarios.page';

const routes: Routes = [
  {
    path: '',
    component: UsuariosPage
  },
  {
    path: 'agregar-direccion/:id_role/:state/:id',
    loadChildren: () => import('./agregar-direccion/agregar-direccion.module').then( m => m.AgregarDireccionPageModule)
  },
  {
    path: 'codigo-verificacion/:accion/:email',
    loadChildren: () => import('./codigo-verificacion/codigo-verificacion.module').then( m => m.CodigoVerificacionPageModule)
  },
  {
    path: 'cambiar-password/:email/:codigo',
    loadChildren: () => import('./cambiar-password/cambiar-password.module').then( m => m.CambiarPasswordPageModule)
  },
  {
    path: 'verificar-email',
    loadChildren: () => import('./verificar-email/verificar-email.module').then( m => m.VerificarEmailPageModule)
  },
  {
    path: 'enviar-sugerencia',
    loadChildren: () => import('./enviar-sugerencia/enviar-sugerencia.module').then( m => m.EnviarSugerenciaPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsuariosPageRoutingModule {}
