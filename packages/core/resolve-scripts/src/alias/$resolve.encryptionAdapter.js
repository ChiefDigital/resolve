import {
  message,
  RESOURCE_CONSTRUCTOR_ONLY,
  RUNTIME_ENV_ANYWHERE,
  IMPORT_CONSTRUCTOR
} from '../constants'
import importResource from '../import_resource'

export default ({ resolveConfig, isClient }) => {
  if (isClient) {
    throw new Error(
      `${message.serverAliasInClientCodeError}$resolve.encryptionAdapter`
    )
  }

  const imports = [`import '$resolve.guardOnlyServer'`]
  const constants = []
  const exports = []

  importResource({
    resourceName: 'encryptionAdapter',
    resourceValue: resolveConfig.encryptionAdapter,
    runtimeMode: RUNTIME_ENV_ANYWHERE,
    importMode: RESOURCE_CONSTRUCTOR_ONLY,
    instanceMode: IMPORT_CONSTRUCTOR,
    imports,
    constants
  })

  exports.push('export default encryptionAdapter')

  return [...imports, ...constants, ...exports].join('\r\n')
}
