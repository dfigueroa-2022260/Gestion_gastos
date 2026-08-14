export interface Usuario {
  id: string;
  nombre: string;
  email: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegistroRequest {
  nombre: string;
  email: string;
  password: string;
}

export interface OlvidePasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  usuario: Usuario;
}

export interface MensajeResponse {
  mensaje: string;
}
