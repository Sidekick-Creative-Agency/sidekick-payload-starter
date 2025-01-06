import * as migration_20241112_161423 from './20241112_161423';
import * as migration_20250106_152518 from './20250106_152518';

export const migrations = [
  {
    up: migration_20241112_161423.up,
    down: migration_20241112_161423.down,
    name: '20241112_161423',
  },
  {
    up: migration_20250106_152518.up,
    down: migration_20250106_152518.down,
    name: '20250106_152518'
  },
];
