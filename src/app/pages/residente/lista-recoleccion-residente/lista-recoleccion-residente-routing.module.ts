import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaRecoleccionResidentePage } from './lista-recoleccion-residente.page';

const routes: Routes = [
  {
    path: '',
    component: ListaRecoleccionResidentePage
  },
  {
    path: 'ver-recoleccion-residente/:estado/:id',
    loadChildren: () => import('./ver-recoleccion-residente/ver-recoleccion-residente.module').then( m => m.VerRecoleccionResidentePageModule)
  },
  {
    path: 'agregar-comentario',
    loadChildren: () => import('./agregar-comentario/agregar-comentario.module').then( m => m.AgregarComentarioPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListaRecoleccionResidentePageRoutingModule {}
