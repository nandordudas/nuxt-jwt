import { accessSync, constants } from 'node:fs'

export function isReadable(filePath: string | undefined): boolean {
  if (!filePath)
    return false

  try {
    accessSync(filePath, constants.R_OK)

    return true
  }
  catch {
    return false
  }
}
