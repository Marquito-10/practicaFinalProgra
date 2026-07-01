export interface RoutineModel {
  Id: string;
  nombreCliente: string;
  tipoEntrenamiento: string;
  duracion: number;
  dificultad: string;
  sesionGrupal: boolean;
  observaciones: string;
}

export interface NewRoutineModel {
  nombreCliente: string;
  tipoEntrenamiento: string;
  duracion: number;
  dificultad: string;
  sesionGrupal: boolean;
  observaciones: string;
}
