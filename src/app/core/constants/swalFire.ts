import { SwalFire } from '../interfaces/swalFire.interface';

export const messages: SwalFire[] = [
  {
    icon: 'error',
    title: 'Saldo Insuficiente',
    text: 'No cuenta con saldo suficiente para realizar esta transacción.'
  },
  {
    icon: 'error',
    title: 'Error...',
    text: 'Acceso denegado, favor verificar sus credenciales !'
  },
  {
    icon: 'error',
    title: 'Corregir credenciales',
    text: 'Los datos sumnistrados ya fueron utilizados por otro usuario'
  },
  {
    icon: 'success',
    title: 'Usuario registrado',
    text: 'Usuario registrado exitosamente'
  },
  {
    icon: 'warning',
    title: 'Lo sentimos !',
    text: 'Ninguno de sus amigos tiene ese número de cuenta'
  }
]

