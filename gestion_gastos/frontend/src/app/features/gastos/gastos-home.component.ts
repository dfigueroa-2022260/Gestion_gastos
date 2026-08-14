import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';

@Component({
  selector: 'app-gastos-home',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div style="padding: 40px; font-family: Inter, sans-serif;">
      <h2>Hola, {{ authService.usuario()?.nombre }} 👋</h2>
      <p>Aca va el modulo de gastos (listado, alta y resumen por categoria).</p>
      <button (click)="salir()">Cerrar sesion</button>
    </div>
  `,
})
export class GastosHomeComponent {
  constructor(
    public readonly authService: AuthService,
    private readonly router: Router
  ) {}

  salir(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
