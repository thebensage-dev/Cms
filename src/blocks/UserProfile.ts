import type { Block } from "payload";
import { wordingGroup } from "@/fields/common";
import { PROFILE } from "@/wording/userDirectory";

/**
 * One user's profile, for a page whose path has [id] (such as /users/[id]): the user comes from
 * the API at request time. The edit form and delete dialog are in the User Directory settings
 * (Directory tab).
 */
export const UserProfile: Block = {
  slug: "userProfile",
  dbName: "pb_uprof",
  interfaceName: "UserProfileBlock",
  labels: { singular: "User profile", plural: "User profiles" },
  admin: { group: "User Directory" },
  fields: [wordingGroup("labels", "Labels", PROFILE)],
};
