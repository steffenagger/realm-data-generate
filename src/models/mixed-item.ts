import Realm from 'realm'

export type MixedItem = {
  readonly _id: Realm.BSON.UUID
  name: string
  mixed: unknown
  items: Realm.List<MixedItem>
}

export const Schema = {
  name: 'MixedItem',
  primaryKey: '_id',
  properties: {
    _id: 'uuid',
    name: 'string',
    mixed: 'mixed',
    mixedList: 'mixed[]',
    items: 'MixedItem[]',
  },
}
