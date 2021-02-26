import debugLevels from '@reimagined/debug-levels'

import shutdownOne from './shutdown-one'

const log = debugLevels('resolve:runtime:shutdown')

const shutdown = async (resolve, upstream) => {
  log.debug('shutdown started')
  const promises = []
  for (const { name: eventSubscriber } of resolve.eventListeners.values()) {
    promises.push(
      shutdownOne({
        eventBus: resolve.eventBus,
        eventSubscriber,
        upstream,
      })
    )
  }

  await Promise.all(promises)

  log.debug('shutdown successful')

  return 'ok'
}

export default shutdown
