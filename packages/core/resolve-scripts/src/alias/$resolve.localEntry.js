export default () => `
  import '$resolve.guardOnlyServer'
  import serverAssemblies from '$resolve.serverAssemblies'
  import localEntry from 'resolve-runtime/lib/local'

  export { default as entryPointMarker } from 'resolve-runtime/lib/common/utils/entry-point-marker'

  const initPromise = localEntry(serverAssemblies)

  const handler = async (...args) => {
    const worker = await initPromise
    return await worker(...args)
  }

  export default handler
`
