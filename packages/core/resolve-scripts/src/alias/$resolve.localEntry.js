export default () => `
  import '$resolve.guardOnlyServer'
  import { connectPublisher, createAndInitConsumer } from '@reimagined/local-event-broker'
  import serverAssemblies from '$resolve.serverAssemblies'
  import eventBrokerConfig from '$resolve.eventBrokerConfig'
  import localEntry from '@reimagined/runtime/lib/local'

  export { default as entryPointMarker } from '@reimagined/runtime/lib/common/utils/entry-point-marker'
  
  Object.assign(serverAssemblies.assemblies, {
    eventBrokerConfig,
    createAndInitConsumer,
    connectPublisher
  })

  const initPromise = localEntry(serverAssemblies)

  const handler = async (...args) => {
    const worker = await initPromise
    return await worker(...args)
  }

  export default handler
`
