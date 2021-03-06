import type {
  AdapterPoolConnectedProps,
  AdapterPoolConnected,
  AdapterPoolPossiblyUnconnected,
  SavedEvent,
} from 'resolve-eventstore-base'

import {
  AdapterConfigSchema,
  UnbrandProps,
  iots as t,
} from 'resolve-eventstore-base'

// eslint-disable-next-line import/no-extraneous-dependencies
import RDSDataService from 'aws-sdk/clients/rdsdataservice'

export type Coercer = (
  value: {
    intValue: number
    stringValue: string
    bigIntValue: number
    longValue: number
    booleanValue: boolean
  } & {
    [key: string]: any
  }
) => number | string | boolean
type EscapeFunction = (source: string) => string
type FullJitter = (retries: number) => number

export type AdminPool = {
  RdsDataService?: RDSDataService
  escapeId?: EscapeFunction
  escape?: EscapeFunction
  fullJitter?: FullJitter
  executeStatement?: (sql: string) => Promise<any[]>
  coercer?: Coercer
}

export type PostgresqlAdapterPoolConnectedProps = AdapterPoolConnectedProps & {
  rdsDataService: RDSDataService
  dbClusterOrInstanceArn: string
  awsSecretStoreArn: string
  databaseName: string
  eventsTableName: string
  secretsTableName: string
  snapshotsTableName: string
  fullJitter: FullJitter
  coercer: Coercer
  executeStatement: (sql: any, transactionId?: string) => Promise<any[]>
  escapeId: EscapeFunction
  escape: EscapeFunction
  isTimeoutError: (error: any) => boolean
  beginTransaction: (pool: AdapterPool) => Promise<any>
  commitTransaction: (pool: AdapterPool, transactionId: string) => Promise<void>
  rollbackTransaction: (
    pool: AdapterPool,
    transactionId: string
  ) => Promise<void>
}

export const PostgresqlAdapterConfigSchema = t.intersection([
  AdapterConfigSchema,
  t.type({
    dbClusterOrInstanceArn: t.string,
    awsSecretStoreArn: t.string,
    databaseName: t.string,
  }),
  t.partial({
    eventsTableName: t.string,
    secretsTableName: t.string,
    snapshotsTableName: t.string,
    region: t.string,
  }),
  t.UnknownRecord,
])

type PostgresqlAdapterConfigChecked = t.TypeOf<
  typeof PostgresqlAdapterConfigSchema
>
export type PostgresqlAdapterConfig = UnbrandProps<
  PostgresqlAdapterConfigChecked
>

export type AdapterPool = AdapterPoolConnected<
  PostgresqlAdapterPoolConnectedProps
>

export type AdapterPoolPrimal = AdapterPoolPossiblyUnconnected<
  PostgresqlAdapterPoolConnectedProps
>

export type ConnectionDependencies = {
  RDSDataService: typeof RDSDataService
  fullJitter: FullJitter
  escapeId: EscapeFunction
  escape: EscapeFunction
  executeStatement: (pool: AdapterPool, sql: string) => Promise<any[]>
  coercer: Coercer
}

export type CloudResource = {
  createResource: (options: CloudResourceOptions) => Promise<any>
  disposeResource: (options: CloudResourceOptions) => Promise<any>
  destroyResource: (options: CloudResourceOptions) => Promise<any>
}

export type CloudResourcePool = {
  executeStatement: (pool: AdapterPool, sql: string) => Promise<any[]>
  RDSDataService: typeof RDSDataService
  escapeId: EscapeFunction
  escape: EscapeFunction
  fullJitter: FullJitter
  coercer: Coercer
  shapeEvent: (event: any, additionalFields?: any) => SavedEvent
  connect: (
    pool: AdapterPoolPrimal,
    connectionDependencies: ConnectionDependencies,
    config: PostgresqlAdapterConfig
  ) => Promise<any>
  dispose: (pool: AdapterPool) => Promise<any>
}

export const CloudResourceOptionsSchema = t.type({
  region: t.string,
  databaseName: t.string,
  eventsTableName: t.string,
  secretsTableName: t.string,
  snapshotsTableName: t.string,
  userLogin: t.string,
  awsSecretStoreAdminArn: t.string,
  dbClusterOrInstanceArn: t.string,
})

export type CloudResourceOptions = t.TypeOf<typeof CloudResourceOptionsSchema>
