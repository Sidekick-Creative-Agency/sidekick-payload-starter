import * as migration_20250117_201720 from './20250117_201720';

export const migrations = [
  {
    up: migration_20250117_201720.up,
    down: migration_20250117_201720.down,
    name: '20250117_201720'
  },
];
