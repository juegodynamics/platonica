export type DataInterface<ClassT extends abstract new (...args: any) => any> = {
  [KeyT in keyof ClassT]: ClassT[KeyT] extends Function ? never : ClassT[KeyT]
}
