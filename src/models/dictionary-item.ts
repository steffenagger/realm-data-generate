import Realm from 'realm'

export type DictionaryItem = {
  readonly _id: Realm.BSON.UUID
  name: string
  strDict?: Realm.Dictionary<string>
  mixedDict?: Realm.Dictionary
  items: Realm.List<DictionaryItem>
}

export const Schema = {
  name: 'DictionaryItem',
  primaryKey: '_id',
  properties: {
    _id: 'uuid',
    name: 'string',
    strDict: 'string{}',
    mixedDict: '{}', // TODO: 'mixed{}' errors with: Schema type: mixed not supported for Dictionary.
    items: 'DictionaryItem[]',
  },
}
