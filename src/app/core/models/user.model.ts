export interface UserModel {

  nombreUsuario: string;
  password: string;
  nombres: string;
  apellidos: string;
  ciudad: string;
  pais: string;
  estado: string;
  roles?: [String];

}
