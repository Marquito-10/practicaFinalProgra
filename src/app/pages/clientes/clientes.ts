import { Component, inject, signal, OnInit, computed } from '@angular/core';
import { ServiceRoutines } from '../../service/service-routines';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clientes',
  imports: [],
  templateUrl: './clientes.html',
  styleUrl: './clientes.css',
})
export class Clientes {

  private routineService = inject(ServiceRoutines);
  private router = inject(Router);

  public routines = this.routineService.routines;

  criterioOrden = signal<'nombre' | 'tipo' | 'duracion'>('nombre');

  OnInit(){
    this.routineService.getRoutines();
  }

  rutinasOrdenadas = computed(() => {

    const list = [...this.routines()]

    return list.sort((a,b) => {

      if(this.criterioOrden() === 'tipo'){
        if(a.tipoEntrenamiento === b.tipoEntrenamiento){
          return a.nombreCliente.localeCompare(b.nombreCliente)
        }
        return a.tipoEntrenamiento.localeCompare(b.tipoEntrenamiento)
      }

      if(this.criterioOrden() === 'duracion'){
        if(a.duracion === b.duracion){
          return a.nombreCliente.localeCompare(b.nombreCliente)
        }
        return a.duracion - b.duracion;
      }

      return a.nombreCliente.localeCompare(b.nombreCliente);

    })

  })

  verDetalle(id:string){
    this.router.navigate(['/rutinas', id]);
  }

  ordenarPorTipo(){
    this.criterioOrden.set('tipo');
  }

  ordenarPorDuracion(){
    this.criterioOrden.set('duracion');
  }

}
