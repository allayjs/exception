import Exception from './exception'

export interface ExceptionOptions extends ErrorOptions {
  help?: string
  code?: string
  status?: number
}

export interface CreateException {
  <T extends any[] = never>(
    message?: string,
    code?: string,
    status?: number,
  ): typeof Exception & T extends never
    ? { new (args?: any, options?: ErrorOptions): Exception }
    : { new (args: T, options?: ErrorOptions): Exception }
}
