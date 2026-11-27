import * as migration_20261127_221500_initial from "./20261127_221500_initial";

export const migrations = [
  {
    up: migration_20261127_221500_initial.up,
    down: migration_20261127_221500_initial.down,
    name: "20261127_221500_initial",
  },
];
