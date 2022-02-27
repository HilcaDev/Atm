export interface ILocalSRepository {
 setLocalStorage(name:string,value:any):any;
 getLocalStorage(name: string):any;
 removeLocalStorage(name:string):void;
}
