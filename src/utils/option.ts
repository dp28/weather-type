export interface Map<A, B> {
  (value: A): B;
}

export interface Unit<A> {
  (value: A): void;
}

export interface Option<A> {
  map<B>(mapInner: Map<A, B>): Option<B>;
  foreach(handle: Unit<A>): void;
  getOrElse(fallback: A): A;
  isDefined: Boolean;
  isEmpty: Boolean;
}
