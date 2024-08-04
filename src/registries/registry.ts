export class Registry<T> {
  protected records: Record<string, T> = {}

  constructor(readonly kind: string) {
    this.storeAtSessionStorage({})
  }

  protected storeAtSessionStorage(data?: typeof this.records) {
    sessionStorage.setItem(this.kind, JSON.stringify(data ? data : this.records))
  }

  register(key: string, value: T) {
    this.records[key] = value
    this.storeAtSessionStorage()
  }

  get(key: string) {
    const item = sessionStorage.getItem(this.kind)

    if (item) {
      return (JSON.parse(item) as typeof this.records)[key]
    }
    
    return null
  }

  getAll() {
    return this.records
  }

  clear() {
    sessionStorage.removeItem(this.kind)
  }
}

