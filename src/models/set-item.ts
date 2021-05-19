import Realm from 'realm'

export type SetItem = {
  readonly _id: Realm.BSON.UUID
  name: string
  strSet: Realm.Set<string>
  mixedSet: Realm.Set<unknown>
  setItemSet: Realm.Set<SetItem>
  items: Realm.List<SetItem>
}

export const Schema = {
  name: 'SetItem',
  primaryKey: '_id',
  properties: {
    _id: 'uuid',
    name: 'string',
    strSet: 'string<>',
    mixedSet: 'mixed<>',
    setItemSet: 'SetItem<>',
    items: 'SetItem[]',
  },
}
