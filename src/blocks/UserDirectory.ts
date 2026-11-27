import type { Block } from "payload";
import { wordingGroup } from "@/fields/common";
import {
  LIST_EMPTY,
  LIST_FILTERS,
  LIST_HEADING,
  LIST_PAGINATION,
  LIST_RESULTS,
  LIST_SORTS,
  LIST_STATS,
  LIST_TOOLBAR,
} from "@/wording/userDirectory";

/**
 * The directory itself: heading, stats, search, filters, sort, cards or table, paging, and the
 * add/edit/delete forms. The users come from the API at request time; every word is here. The
 * form, dialogs and access messages it shares with the profile are in the User Directory
 * settings (Directory tab).
 */
export const UserDirectory: Block = {
  slug: "userDirectory",
  dbName: "pb_udir",
  interfaceName: "UserDirectoryBlock",
  labels: { singular: "User directory", plural: "User directories" },
  admin: { group: "User Directory" },
  fields: [
    wordingGroup("heading", "Heading", LIST_HEADING),
    wordingGroup("stats", "Stats", LIST_STATS),
    wordingGroup("toolbar", "Search, sort and layout", LIST_TOOLBAR),
    wordingGroup("sorts", "Sort orders", LIST_SORTS),
    wordingGroup("filters", "Filters", LIST_FILTERS),
    wordingGroup("results", "Cards and table", LIST_RESULTS),
    wordingGroup("empty", "Nothing to show", LIST_EMPTY),
    wordingGroup("pagination", "Paging", LIST_PAGINATION),
  ],
};
