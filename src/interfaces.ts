export default interface DependencyValue {
  [key: string]: (a: any) => any;
}
