import { IUser} from '../interfaces/auth.interface';

export const arrayInfoUsers: IUser[] = [
  {
    id:0,
    username: 'hilca',
    password: '123456',
    fullName: 'hilca alvarez',
    email:'hilky@gmail.com',
    rol:'practicante',
    numberAccountBalance:123456,
    accountBalance:500000,
    friends:[],
    transactions:[]
  },
  {
    id:1,
    username: 'alex',
    password: '111111',
    fullName: 'alex macleod',
    email:'alex@gmail.com',
    rol:'web developer',
    numberAccountBalance:111111,
    accountBalance:1000000,
    friends:[],
    transactions:[]

  }
]
