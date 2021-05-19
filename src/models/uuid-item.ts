import Realm from 'realm'

export type UuidItem = {
  readonly _id: Realm.BSON.UUID
  name: string
  mandatory: Realm.BSON.UUID
  optional?: Realm.BSON.UUID
  list: Realm.List<Realm.BSON.UUID>
  items: Realm.List<UuidItem>
}

export const Schema = {
  name: 'UuidItem',
  primaryKey: '_id',
  properties: {
    _id: 'uuid',
    name: 'string',
    mandatory: 'uuid',
    optional: 'uuid?',
    list: 'uuid[]',
    items: 'UuidItem[]',
  },
}
