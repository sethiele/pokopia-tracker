import { WORLDS_META } from './worlds'
import { POKEMON } from './pokemon'

export const WORLDS = WORLDS_META.map(world => ({
  ...world,
  pokemon: POKEMON.filter(p => p.worldId === world.id),
}))
