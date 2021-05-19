import { Schema as UuidSchema } from './uuid-item'
import { Schema as DictionarySchema } from './dictionary-item'
import { Schema as SetSchema } from './set-item'
import { Schema as MixedSchema } from './mixed-item'

export const SchemaVersion = 0
export const Schemas = [UuidSchema, DictionarySchema, SetSchema, MixedSchema]
