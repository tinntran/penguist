type RecordType<T> = { [key: string]: T }

export class Registry<T> {
  protected records: RecordType<T> = {}

  constructor(readonly kind: string) {
    this.storeAtSessionStorage({})
  }

  protected storeAtSessionStorage(data?: RecordType<T>) {
    sessionStorage.setItem(this.kind, JSON.stringify(data ? data : this.records))
  }

  register(key: string, value: T) {
    this.records[key] = value
    this.storeAtSessionStorage()
  }

  get(key: string) {
    const item = sessionStorage.getItem(this.kind)

    if (item) {
      return (JSON.parse(item) as RecordType<T>)[key]
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

