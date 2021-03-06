import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminPage } from './admin.page';

const routes: Routes = [
  {
    path: '',
    component: AdminPage
  },
  {
    path: 'lista-usuario-admin',
    loadChildren: () => import('./lista-usuario-admin/lista-usuario-admin.module').then( m => m.ListaUsuarioAdminPageModule)
  },
  {
    path: 'lista-ruta-admin',
    loadChildren: () => import('./lista-ruta-admin/lista-ruta-admin.module').then( m => m.ListaRutaAdminPageModule)
  },
  {
    path: 'lista-recoleccion-admin',
    loadChildren: () => import('./lista-recoleccion-admin/lista-recoleccion-admin.module').then( m => m.ListaRecoleccionAdminPageModule)
  },
  {
    path: 'lista-sugerencias',
    loadChildren: () => import('./lista-sugerencias/lista-sugerencias.module').then( m => m.ListaSugerenciasPageModule)
  },
  {
    path: 'reporte-estadisticas',
    loadChildren: () => import('./reporte-estadisticas/reporte-estadisticas.module').then( m => m.ReporteEstadisticasPageModule)
  },
  {
    path: 'usuarios-pendientes',
    loadChildren: () => import('./usuarios-pendientes/usuarios-pendientes.module').then( m => m.UsuariosPendientesPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminPageRoutingModule {}
