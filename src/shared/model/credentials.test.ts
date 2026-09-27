import { describe, expect, it } from 'vitest'
import { credentialsSchema } from './credentials'

const validCredentials = {
  idInstance: '110000000001',
  apiTokenInstance: 'd75b3a66374942c5b3c019c698abc2067e151558acbd412345',
}

describe('credentialsSchema', () => {
  it('accepts a valid credentials pair', () => {
    expect(credentialsSchema.safeParse(validCredentials).success).toBe(true)
  })

  it('trims surrounding whitespace', () => {
    expect(
      credentialsSchema.parse({
        idInstance: `  ${validCredentials.idInstance}  `,
        apiTokenInstance: `  ${validCredentials.apiTokenInstance}  `,
      }),
    ).toEqual(validCredentials)
  })

  it('rejects an empty idInstance', () => {
    expect(credentialsSchema.safeParse({ ...validCredentials, idInstance: '' }).success).toBe(false)
  })

  it('rejects a non-numeric idInstance', () => {
    expect(
      credentialsSchema.safeParse({ ...validCredentials, idInstance: '11000000000a' }).success,
    ).toBe(false)
  })

  it('rejects an idInstance of the wrong length', () => {
    expect(
      credentialsSchema.safeParse({ ...validCredentials, idInstance: '1100000001' }).success,
    ).toBe(false)
  })

  it('rejects an apiTokenInstance with invalid characters', () => {
    expect(
      credentialsSchema.safeParse({
        ...validCredentials,
        apiTokenInstance: 'd75b3a66374942c5b3c019c698abc2067e151558acbd41234!',
      }).success,
    ).toBe(false)
  })

  it('rejects an apiTokenInstance of the wrong length', () => {
    expect(
      credentialsSchema.safeParse({ ...validCredentials, apiTokenInstance: 'abc123' }).success,
    ).toBe(false)
  })
})
