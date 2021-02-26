import { createClient } from '@reimagined/local-rpc'

const connectConsumer = async (config) => {
  return await createClient({
    address: config.address,
  })
}

export default connectConsumer