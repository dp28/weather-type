import { Option, Map, Unit } from './option'

export default function None<A>() {
  return new NoneClass<A>();
}

class NoneClass<A> implements Option<A> {

  public isDefined = false;
  public isEmpty = true;

  map<B>(mapInner: Map<A, B>) {
    return this;
  }

  foreach(handle: Unit<A>) {}

  getOrElse(fallback: A) {
    return fallback;
  }
}
