import type { Wording } from "@/fields/common";

// Every word the User Directory's own screens show, with today's wording as the default. The
// blocks (user directory, user profile) and the User Directory settings' Directory tab are built
// from these lists, and the seed fills them in from the same lists. Placeholders in braces are
// filled in by the app: {name}, {search}, {count}, {age}, {selected}, {max}, {value}, {label}.

/** The list page's own heading and the button that opens the form. */
export const LIST_HEADING: Wording[] = [
  ["title", "Users"],
  ["intro", "Browse, add and manage everyone in one place."],
  ["add", "Add user"],
  ["addHint", "Add user (N)", "The button's tooltip, with its keyboard shortcut."],
];

export const LIST_STATS: Wording[] = [
  ["users", "Users"],
  ["averageAge", "Average age"],
  ["countries", "Countries"],
  ["topInterest", "Top interest"],
];

export const LIST_TOOLBAR: Wording[] = [
  ["searchPlaceholder", "Search by name, email, job, city, interest…"],
  ["search", "Search", "The search box's name for screen readers."],
  ["clearSearch", "Clear search"],
  ["sort", "Sort users", "The sort menu's name for screen readers."],
  ["bestMatch", "Best match", "The sort used while searching."],
  ["layout", "Layout", "The card/table switch's name for screen readers."],
  ["cards", "Cards view"],
  ["table", "Table view"],
];

/** The sort menu: one label per order the API offers. */
export const LIST_SORTS: Wording[] = [
  ["idDesc", "Recently added"],
  ["idAsc", "First added"],
  ["nameAsc", "Name (A–Z)"],
  ["nameDesc", "Name (Z–A)"],
  ["ageAsc", "Age (youngest)"],
  ["ageDesc", "Age (oldest)"],
  ["countryAsc", "Country (A–Z)"],
  ["countryDesc", "Country (Z–A)"],
];

export const LIST_FILTERS: Wording[] = [
  ["button", "Filters"],
  ["title", "Filters"],
  ["clearAll", "Clear all"],
  ["country", "Country"],
  ["anyCountry", "Any country"],
  ["age", "Age"],
  ["anyAge", "Any"],
  ["interests", "Interests"],
  ["matchAll", "Match all selected"],
  ["showOne", "Show {count} user"],
  ["showMany", "Show {count} users"],
  ["activeCountry", "Country: {value}"],
  ["activeAge", "Age: {value}"],
  ["remove", "Remove filter {label}"],
];

export const LIST_RESULTS: Wording[] = [
  ["name", "Name", "Table column."],
  ["age", "Age", "Table column."],
  ["country", "Country", "Table column."],
  ["interests", "Interests", "Table column, and the tags' name for screen readers."],
  ["actions", "Actions", "Table column, read out only."],
  ["yearsOld", "{age} years old"],
  ["edit", "Edit"],
  ["delete", "Delete"],
  ["editUser", "Edit {name}"],
  ["deleteUser", "Delete {name}"],
];

export const LIST_EMPTY: Wording[] = [
  ["noUsersTitle", "No users yet"],
  ["noUsersBody", "Add your first user to get started."],
  ["noMatchSearch", "No one matches “{search}”"],
  ["noMatchFilters", "No one matches these filters"],
  ["noMatchBody", "Try fewer words, a different spelling, or removing a filter."],
  ["clear", "Clear search and filters"],
];

export const LIST_PAGINATION: Wording[] = [
  ["nav", "Pagination"],
  ["showing", "Showing"],
  ["of", "of"],
  ["previous", "Previous page"],
  ["next", "Next page"],
  ["page", "Page {page}"],
  ["perPage", "Per page"],
];

/** The profile page. */
export const PROFILE: Wording[] = [
  ["back", "All users"],
  ["yearsOld", "{age} years old"],
  ["email", "Email"],
  ["phone", "Phone"],
  ["location", "Location"],
  ["jobTitle", "Job title"],
  ["memberSince", "Member since"],
  ["lastUpdated", "Last updated"],
  ["notProvided", "Not provided"],
  ["interests", "Interests"],
  ["edit", "Edit"],
  ["delete", "Delete"],
];

// --- Shared by the list and the profile: the User Directory settings' Directory tab ---------

export const FORM: Wording[] = [
  ["addTitle", "Add new user"],
  ["editTitle", "Edit user"],
  ["addIntro", "Fields marked optional can be filled in later."],
  ["editIntro", "Update {name}'s details."],
  [
    "tryItOut",
    "Try it out: every field is checked, but saving needs an account.",
    "For people who can't save.",
  ],
  ["close", "Close"],
  ["optional", "(optional)"],
  ["fullName", "Full name"],
  ["fullNamePlaceholder", "e.g. Jane Doe"],
  ["email", "Email"],
  ["emailPlaceholder", "jane@example.com"],
  ["phone", "Phone"],
  ["phonePlaceholder", "+44 7700 900123"],
  ["age", "Age"],
  ["agePlaceholder", "18–120"],
  ["country", "Country"],
  ["selectCountry", "Select country"],
  ["commonCountries", "Common"],
  ["allCountries", "All countries"],
  ["city", "City"],
  ["cityPlaceholder", "e.g. Manchester"],
  ["jobTitle", "Job title"],
  ["jobTitlePlaceholder", "e.g. Product designer"],
  ["interests", "Interests"],
  ["interestsCount", "{selected} of {max} selected"],
  ["bio", "Bio"],
  ["bioPlaceholder", "A sentence or two about them"],
  ["cancel", "Cancel"],
  ["save", "Save changes"],
  ["saving", "Saving…"],
  ["add", "Add user"],
  ["adding", "Adding…"],
  ["saved", "Saved changes to {name}"],
  ["added", "Added {name}"],
];

export const DELETE: Wording[] = [
  ["title", "Delete user?"],
  ["body", "{name} will be removed permanently. This can't be undone.", "{name} is shown in bold."],
  ["confirm", "Delete"],
  ["busy", "Deleting…"],
  ["cancel", "Cancel"],
  ["deleted", "Deleted {name}"],
  ["failed", "Couldn't delete {name}. Please try again."],
  [
    "refused",
    "{name} is still here: only editors can delete users.",
    "Under the refusal, for people who can't delete.",
  ],
  ["emailForAccess", "Email me for access"],
];

/** What the server says when it refuses a change. */
export const REFUSALS: Wording[] = [
  ["signInRequired", "Please sign in to make changes."],
  ["editAccessRequired", "Your account can't make changes yet."],
  ["notFound", "That user no longer exists."],
  ["fixFields", "Please fix the highlighted fields."],
  ["emailTaken", "That email is already in use."],
  ["emailTakenField", "Another user already has this email"],
];

/** The box in the form when a save is refused, and the banner above the list. */
export const ACCESS: Wording[] = [
  [
    "visitorRefused",
    "Everything you entered passed the checks, but visitors can't save changes. I'm happy to give you temporary access to try the rest.",
  ],
  [
    "memberRefused",
    "Everything you entered passed the checks, but your account doesn't have edit access yet. Ask for it and I'll approve it.",
  ],
  ["requestAccess", "Request access"],
  ["requestEditAccess", "Request edit access"],
  ["emailForAccess", "Email me for access"],
  ["signIn", "Sign in"],
  ["visitorLead", "You're browsing as a visitor.", "The banner's first sentence, in bold."],
  [
    "visitorBody",
    "Try adding or editing someone to see the form checks at work; saving changes needs an account.",
  ],
  [
    "visitorWithRequest",
    "{request} and I'll approve it, or {email}.",
    "{request} and {email} become links.",
  ],
  [
    "visitorWithoutRequest",
    "I'm happy to create one and give you temporary access: {email}.",
    "When request access isn't set up.",
  ],
  ["emailMe", "email me", "The {email} link's text."],
  ["memberLead", "You're signed in, but can't edit yet."],
  ["memberBody", "Try adding or editing someone to see the form checks at work."],
  [
    "memberRequest",
    "{request} and I'll approve it.",
    "{request} becomes the Request edit access link.",
  ],
  ["memberRefresh", "Already approved? {refresh}.", "{refresh} becomes the link below."],
  ["refreshLink", "Refresh your sign-in"],
];

/** The dialog after authentik's Request access page sends someone back. */
export const REQUEST_SENT: Wording[] = [
  ["title", "Request sent"],
  [
    "body",
    "Thanks for asking. I've been notified and will look at it soon. Your account already works across the site; once editing is approved you'll get an email, and you can make changes here.",
  ],
  ["button", "Got it"],
];

/** When a page can't load (the API is down). */
export const ERROR_PAGE: Wording[] = [
  ["title", "Something went wrong"],
  ["body", "The page couldn't be loaded. Check the server is running and try again."],
  ["retry", "Try again"],
];
