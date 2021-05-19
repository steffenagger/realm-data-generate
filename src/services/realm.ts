import Realm from 'realm'
import { Schemas, SchemaVersion } from '../models'

export const initRealm = async (): Promise<Realm> => {
  const config: Realm.Configuration = {
    path: './data/realm-db.realm',
    schema: Schemas,
    schemaVersion: SchemaVersion,
  }

  const realm = await Realm.open(config)

  return realm
}
