export class Observable {
  private observers: Array<Function>;
  [index: string]: any

  public constructor() {
    this.observers = []
  }
  public addObserver(callback: Function): void {
    this.observers = [...this.observers, callback]
  }
  public removeObserver(callback: Function): void {
    this.observers = this.observers.filter(ob => ob !== callback)
  }
  public notifyObservers(): void {
    this.observers.forEach(cb => {
      try {
        cb()
      } catch (error) {
        // prevent one observer error from stopping the other callbacks to happen
      }
    })
  }
}
