import { Option, Map, Unit } from './option'

export default function Some<A>(value: A) {
  return new SomeClass<A>(value);
}

class SomeClass<A> implements Option<A> {

  public isDefined = true;
  public isEmpty = false;

  constructor(private value: A) {}

  map<B>(mapInner: Map<A, B>) {
    return Some<B>(mapInner(this.value));
  }

  foreach(handle: Unit<A>) {
    handle(this.value);
  }

  getOrElse(fallback: A) {
    return this.value;
  }

  equals(other: SomeClass<A>) {
    return other.value == this.value;
  }
}
