import * as migration_20261127_221500_initial from "./20261127_221500_initial";
import * as migration_20261128_015242_sites_block_sets from "./20261128_015242_sites_block_sets";
import * as migration_20261128_024944_shared_showcase_blocks from "./20261128_024944_shared_showcase_blocks";

export const migrations = [
  {
    up: migration_20261127_221500_initial.up,
    down: migration_20261127_221500_initial.down,
    name: "20261127_221500_initial",
  },
  {
    up: migration_20261128_015242_sites_block_sets.up,
    down: migration_20261128_015242_sites_block_sets.down,
    name: "20261128_015242_sites_block_sets",
  },
  {
    up: migration_20261128_024944_shared_showcase_blocks.up,
    down: migration_20261128_024944_shared_showcase_blocks.down,
    name: "20261128_024944_shared_showcase_blocks",
  },
];
