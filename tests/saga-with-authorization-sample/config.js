import { merge, defaultResolveConfig, validateConfig } from '@reimagined/scripts'

const localConfig = {
  mode: 'development',
  target: 'local',
}

// mdis-start app-config
const appConfig = {
  aggregates: [
    {
      name: 'Process',
      commands: 'process.commands.js',
    },
  ],
  sagas: [
    {
      name: 'ProcessKiller',
      source: 'saga.js',
      connectorName: 'default',
    },
  ],
}
// mdis-stop app-config

// mdis-start dev-config
const devConfig = {
  eventstoreAdapter: {
    module: '@reimagined/eventstore-lite',
    options: {
      databaseFile: ':memory:',
    },
  },
  readModelConnectors: {
    default: {
      module: '@reimagined/readmodel-lite',
      options: {
        databaseFile: ':memory:',
      },
    },
    /*
    default: {
      module: 'resolve-readmodel-mysql',
      options: {
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: '',
        database: 'SagaWithAuthorizationSample'
      }
    }
    */
  },
}
// mdis-stop dev-config

const config = merge(defaultResolveConfig, localConfig, appConfig, devConfig)

validateConfig(config)

export default config
