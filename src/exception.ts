import type { CreateException, ExceptionOptions } from './types'
import { format } from 'node:util'

/**
 * `Exception` class extends the built-in `Error` class and provides additional
 * properties and methods for handling exceptions. This class is designed to be
 * used in place of the standard `Error` class when more detailed error information is needed.
 * 
 * Usage example:
 * ```ts
 * throw new Exception('An error occurred', { 
 *  status: 500, 
 *  code: 'E_GENERIC_ERROR'
 * });
 * ```
 */
export default class Exception extends Error {
  declare static help?: string
  declare static code?: string
  declare static status?: number
  declare static message?: string

  declare help?: string
  declare code?: string

  public name: string
  public status: number

  constructor (message?: string, options?: ExceptionOptions) {
    super(message)

    const ExceptionConstructor = this.constructor as typeof Exception

    this.name = ExceptionConstructor.name
    this.message = message ?? ExceptionConstructor.message ?? ''

    this.status = options?.status ?? ExceptionConstructor.status ?? 500

    const code = options?.code || ExceptionConstructor.code
    if (code !== undefined) {
      this.code = code
    }

    const help = ExceptionConstructor.help
    if (help !== undefined) {
      this.help = help
    }

    Error.captureStackTrace(this, ExceptionConstructor)
  }
}

/**
 * Creates a custom exception class with the specified message, code, and status.
 * 
 * Usage example:
 * ```ts
 * const exception = createException('An error occurred', 'E_GENERIC_ERROR', 500);
 * ```
 */
export const createException: CreateException = function (message, code, status) {
  return class extends Exception {
    static message = message
    static code = code
    static status = status

    constructor (args: any[], options?: ErrorOptions) {
      super(format(message, ...(args || [])), options)
      this.name = 'Exception'
    }
  }
}
