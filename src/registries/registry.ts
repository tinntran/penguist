export class Registry<T> {
  protected records: Record<string, T> = {}

  constructor(readonly kind: string) {}

  register(key: string, value: T) {
    this.records[key] = value
  }

  get(key: string) {
    return this.records[key]
  }

  getAll() {
    return this.records
  }

  clear() {
    this.records = {} 
  }
}

