import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../../environments/environment';
import {
  AuthResponse,
  LoginRequest,
  MensajeResponse,
  OlvidePasswordRequest,
  RegistroRequest,
  ResetPasswordRequest,
  Usuario,
} from '../models/auth.models';

const TOKEN_KEY = 'cash_track_token';
const USUARIO_KEY = 'cash_track_usuario';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly baseUrl = `${environment.apiUrl}/auth`;

  readonly usuario = signal<Usuario | null>(this.leerUsuarioGuardado());

  constructor(private readonly http: HttpClient) {}

  login(data: LoginRequest): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.baseUrl}/login`, data)
      .pipe(tap((res) => this.guardarSesion(res)));
  }

  registro(data: RegistroRequest): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.baseUrl}/registro`, data)
      .pipe(tap((res) => this.guardarSesion(res)));
  }

  olvidePassword(data: OlvidePasswordRequest): Observable<MensajeResponse> {
    return this.http.post<MensajeResponse>(`${this.baseUrl}/olvide-password`, data);
  }

  resetPassword(data: ResetPasswordRequest): Observable<MensajeResponse> {
    return this.http.post<MensajeResponse>(`${this.baseUrl}/reset-password`, data);
  }

  logout(): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USUARIO_KEY);
    this.usuario.set(null);
  }

  obtenerToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  estaAutenticado(): boolean {
    return !!this.obtenerToken();
  }

  private guardarSesion(res: AuthResponse): void {
    localStorage.setItem(TOKEN_KEY, res.token);
    localStorage.setItem(USUARIO_KEY, JSON.stringify(res.usuario));
    this.usuario.set(res.usuario);
  }

  private leerUsuarioGuardado(): Usuario | null {
    const raw = localStorage.getItem(USUARIO_KEY);
    return raw ? (JSON.parse(raw) as Usuario) : null;
  }
}
