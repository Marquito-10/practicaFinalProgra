import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { FormRoutines } from './pages/form-routines/form-routines';
import { Clientes } from './pages/clientes/clientes';

export const routes: Routes = [

  {path:'formulario', component: FormRoutines},
  {path:'clientes', component: Clientes},
  {path:'**', component: Clientes},
  {path:'', component: Clientes}
];
