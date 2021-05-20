import chalk from 'chalk'
import { BSON } from 'realm'
import { initRealm } from './services/realm'
import { UuidItem, Schema as UuidItemSchema } from './models/uuid-item'
import { DictionaryItem, Schema as DictionaryItemSchema } from './models/dictionary-item'
import { SetItem, Schema as SetItemSchema } from './models/set-item'
import { MixedItem, Schema as MixedItemSchema } from './models/mixed-item'

const ARGS = process.argv.slice(2).map((x) => x.toLowerCase())
const LOGGING_ENABLED = ARGS.includes('log') || ARGS.includes('verbose')

const { ObjectId, UUID } = BSON

const serialize = (item: unknown) => {
  try {
    return JSON.stringify(item, null, 2)
  } catch {
    return JSON.stringify(item, Realm.JsonSerializationReplacer, 2)
  }
}

const main = async () => {
  const realm = await initRealm()
  console.log(chalk.red('realm.deleteAll()'))
  realm.write(() => {
    realm.deleteAll()
  })

  console.log(chalk.yellow('creating uuids...'))
  realm.write(() => {
    const item1 = realm.create<UuidItem>(UuidItemSchema.name, {
      _id: new UUID(),
      name: 'UUID Item 1',
      mandatory: new UUID(),
      optional: new UUID(),
      list: [new UUID(), new UUID(), new UUID()],
    })

    const item2 = realm.create<UuidItem>(UuidItemSchema.name, {
      _id: new UUID(),
      name: 'UUID Item 2',
      mandatory: new UUID(),
      list: [new UUID(), new UUID()],
    })

    const item3 = realm.create<UuidItem>(UuidItemSchema.name, {
      _id: new UUID(),
      name: 'UUID Item 3',
      mandatory: new UUID(),
      optional: new UUID(),
    })

    item1.items.push(item1, item2, item3)

    if (LOGGING_ENABLED) {
      const items = realm.objects<UuidItem>(UuidItemSchema.name).sorted('name')
      for (const item of items) {
        console.log(`"${item.name}" was created`)
      }
    }
  })

  console.log(chalk.cyan('creating dictionaries...'))
  realm.write(() => {
    const item1 = realm.create<DictionaryItem>(DictionaryItemSchema.name, {
      _id: new UUID(),
      name: 'Dictionary Item 1',
      strDict: {
        key1: 'test',
      },
      mixedDict: {
        key1: 'test',
        key2: 'test test',
        key3: 'test test test',
        key4: 'test test test test',
      },
      items: [
        {
          _id: new UUID(),
          name: 'Dictionary Item 1.5 (directly in create)',
        },
      ],
    })

    const item2 = realm.create<DictionaryItem>(DictionaryItemSchema.name, {
      _id: new UUID(),
      name: 'Dictionary Item 2',
      strDict: {
        key1: 'test',
        key2: 'test test',
        key3: 'test test test',
      },
    })

    const item3 = realm.create<DictionaryItem>(DictionaryItemSchema.name, {
      _id: new UUID(),
      name: 'Dictionary Item 3',
      strDict: {
        key1: 'test',
        key2: 'test test',
      },
      mixedDict: {
        oid: new ObjectId(),
        uuid: new UUID(),
        item2,
      },
      items: [item1, item2],
    })

    item1.items.push(item1, item2, item3)
    item2.items.push(item1, item3)

    if (LOGGING_ENABLED) {
      const items = realm.objects<DictionaryItem>(DictionaryItemSchema.name).sorted('name')
      for (const item of items) {
        console.log(`"${item.name}" was created`, serialize(item))
      }
    }
  })

  console.log(chalk.magenta('creating sets...'))
  realm.write(() => {
    const item1 = realm.create<SetItem>(SetItemSchema.name, {
      _id: new UUID(),
      name: 'Set Item 1',
      strSet: ['string 1', 'string 2', 'string 3'],
      mixedSet: [1, 'two', 3.3, true, false],
    })

    const item2 = realm.create<SetItem>(SetItemSchema.name, {
      _id: new UUID(),
      name: 'Set Item 2',
      strSet: [
        'string 1',
        'string 2',
        'string 3',
        'string 4',
        'string 5',
        'string 6',
        'string 7',
        'string 8',
        'string 9',
        'string 10',
      ],
      mixedSet: [item1, 2, 'three'],
    })

    const item3 = realm.create<SetItem>(SetItemSchema.name, {
      _id: new UUID(),
      name: 'Set Item 3',
      mixedSet: [item1, item2],
      setItemSet: [item1, item2],
    })

    item1.items.push(item1, item2, item3)
    item2.items.push(item1, item3)

    if (LOGGING_ENABLED) {
      const items = realm.objects<SetItem>(SetItemSchema.name).sorted('name')
      for (const item of items) {
        console.log(`"${item.name}" was created`, serialize(item))
      }
    }
  })

  console.log(chalk.blue('creating mixed...'))
  realm.write(() => {
    const item1 = realm.create<MixedItem>(MixedItemSchema.name, {
      _id: new UUID(),
      name: 'Mixed Item 1 (number)',
      mixed: 1,
    })

    const item2 = realm.create<MixedItem>(MixedItemSchema.name, {
      _id: new UUID(),
      name: 'Mixed Item 2 (string)',
      mixed: 'Two',
    })

    const item3 = realm.create<MixedItem>(MixedItemSchema.name, {
      _id: new UUID(),
      name: 'Mixed Item 3 (number - decimal)',
      mixed: 3.3,
    })

    const item4 = realm.create<MixedItem>(MixedItemSchema.name, {
      _id: new UUID(),
      name: 'Mixed Item 4 (boolean)',
      mixed: true,
    })

    const item5 = realm.create<MixedItem>(MixedItemSchema.name, {
      _id: new UUID(),
      name: 'Mixed Item 5 (null)',
      mixed: null,
    })

    const item6 = realm.create<MixedItem>(MixedItemSchema.name, {
      _id: new UUID(),
      name: 'Mixed Item 6 (realm object - circular structure)',
      mixed: item1,
    })

    const item7 = realm.create<MixedItem>(MixedItemSchema.name, {
      _id: new UUID(),
      name: 'Mixed Item 7 (realm object - single structure)',
      mixed: item5,
    })

    const item8 = realm.create<MixedItem>(MixedItemSchema.name, {
      _id: new UUID(),
      name: 'Mixed Item 8 (date)',
      mixed: new Date(),
    })

    const item9 = realm.create<MixedItem>(MixedItemSchema.name, {
      _id: new UUID(),
      name: 'Mixed Item 9 (mixed list)',
      mixed: 'mixed list =>',
      mixedList: [
        item1.mixed,
        item2.mixed,
        item3.mixed,
        item4.mixed,
        item5.mixed, // Error: Mixed conversion not possible for type: null (fixed)
        item6.mixed,
        item7.mixed,
        item8.mixed,
      ],
    })

    item1.items.push(item1, item2, item3, item4, item5, item6, item7, item8, item9)
    item2.items.push(item1, item3)

    if (LOGGING_ENABLED) {
      const items = realm.objects<MixedItem>(MixedItemSchema.name).sorted('name')
      for (const item of items) {
        console.log(`"${item.name}" was created`, serialize(item))
      }
    }
  })
}

main()
  .then(() => console.log(chalk.green('done...')))
  .catch((err) => console.error(chalk.red(err.stack ?? err)))
  .finally(() => process.exit(0)) // let's help node figure out that we're done.
