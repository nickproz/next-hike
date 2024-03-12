export abstract class BaseConverter<T, U> {
  public abstract doForward(t: T): U;
  public abstract doBackward(u: U): T;

  public convertAll = (ts: T[] = []): U[] => {
    return ts.map(this.doForward);
  };

  public reverseAll = (us: U[] = []): T[] => {
    return us.map(this.doBackward);
  };
}
