import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import 'zone.js';
import { FormsModule } from '@angular/forms';
import { Gasto } from './gasto';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [FormsModule, NgFor, NgIf],
  standalone: true,
  template: `
  <div class="contenedor-principal">

  <div class="form presupuesto">
    <label for="presupuesto">Ingresa tu presupuesto:</label>
    <input
      id="presupuesto"
      type="number"
      [(ngModel)]="presupuesto"
      (keyup.enter)="ingresarSaldoInicial()"
      [readonly]="saldoInicialIngresado"
    />
    <button
      (click)="ingresarSaldoInicial()"
      *ngIf="!saldoInicialIngresado"
    >
      Listo
    </button>
  </div>

  <div class="form gasto" *ngIf="saldoInicialIngresado">
    <h3>Agrega tus gastos aquí</h3>
    <div>
      <label for="nombre-gasto">Nombre:</label>
      <input
       id="nombre-gasto"
       type="text" 
      [(ngModel)]="nombreGasto"
      (keyup.enter)="agregarGasto()"

      />
    </div>
    <div>
      <label for="cantidad-gasto">Cantidad:</label>
      <input
        id="cantidad-gasto"
        type="number"
        [(ngModel)]="cantidadGasto"
        (keyup.enter)="agregarGasto()"

      />

    </div>
    
    <button (click)="agregarGasto()">Listo</button>
  </div>
</div>


<div class="contenedor-lista">
    <div class="restante" *ngIf="saldoInicialIngresado">
      <p>Saldo disponible</p>
      <p>{{saldo}} Bs</p>
    </div>

    <div class="caja-lista">

      <ul>

      <li *ngFor="let gasto of gastos; index as indice">
          <p>{{gasto.nombre}}</p>
          <div>
            <span>{{gasto.cantidad}} Bs</span>
            <button (click)="eliminarGasto(indice, gasto.cantidad)">
              <img src="https://raw.githubusercontent.com/angular-bolivia/ng-she-workshop/develop/src/assets/trash-icon.svg" alt="Eliminar gasto" />
            </button>
          </div>
        </li>
     
      </ul>
    </div>
  </div>
  `,
})
export class App {
  nombreGasto = '';
  cantidadGasto = 0;
  gastos: Gasto[] = [];
  presupuesto = 0;
  saldo = 0;
  saldoInicialIngresado = false;

  ingresarSaldoInicial(): void {
    this.saldo = this.presupuesto;
    this.saldoInicialIngresado = true;
  }

  agregarGasto(): void {
    const gasto = new Gasto(this.nombreGasto, this.cantidadGasto);
    this.gastos.push(gasto);
    this.saldo = this.saldo - gasto.cantidad;
    this.nombreGasto = '';
    this.cantidadGasto = 0;
  }
  eliminarGasto(indiceGasto: number, cantidadGasto: number): void {
    this.gastos.splice(indiceGasto, 1);
    this.saldo += cantidadGasto;
  }
}

bootstrapApplication(App);
