import { MigrateUpArgs, MigrateDownArgs, sql } from "@payloadcms/db-postgres";

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_sites_header_nav_icon" AS ENUM('Activity', 'ArrowDown', 'ArrowRight', 'ArrowUpRight', 'BellRing', 'Blocks', 'BookOpen', 'Braces', 'Code', 'Compass', 'Container', 'Database', 'Download', 'Eye', 'FileBraces', 'FileCode', 'Filter', 'FingerprintPattern', 'FlaskConical', 'FolderGit2', 'FolderKanban', 'Forward', 'Gauge', 'GitBranch', 'GitPullRequest', 'Globe', 'Inbox', 'KeyRound', 'Laptop', 'Link2', 'ListChecks', 'LockKeyhole', 'LogIn', 'LogOut', 'Mail', 'MailCheck', 'MessagesSquare', 'MoonStar', 'Palette', 'PenTool', 'Repeat', 'Rocket', 'ScrollText', 'Search', 'Send', 'Server', 'ShieldCheck', 'Split', 'Ticket', 'UserCheck', 'UserPlus', 'UserRoundCheck', 'Users', 'Workflow', 'Wrench', 'Zap');
  CREATE TYPE "public"."enum_sites_header_nav_link_type" AS ENUM('page', 'url', 'email', 'project', 'requestAccess', 'apiSpec', 'status', 'mainSite');
  CREATE TYPE "public"."target" AS ENUM('default', 'app', 'docs', 'source');
  CREATE TYPE "public"."app" AS ENUM('portfolio', 'user-directory', 'api', 'cms');
  CREATE TYPE "public"."enum_sites_footer_groups_links_icon" AS ENUM('Activity', 'ArrowDown', 'ArrowRight', 'ArrowUpRight', 'BellRing', 'Blocks', 'BookOpen', 'Braces', 'Code', 'Compass', 'Container', 'Database', 'Download', 'Eye', 'FileBraces', 'FileCode', 'Filter', 'FingerprintPattern', 'FlaskConical', 'FolderGit2', 'FolderKanban', 'Forward', 'Gauge', 'GitBranch', 'GitPullRequest', 'Globe', 'Inbox', 'KeyRound', 'Laptop', 'Link2', 'ListChecks', 'LockKeyhole', 'LogIn', 'LogOut', 'Mail', 'MailCheck', 'MessagesSquare', 'MoonStar', 'Palette', 'PenTool', 'Repeat', 'Rocket', 'ScrollText', 'Search', 'Send', 'Server', 'ShieldCheck', 'Split', 'Ticket', 'UserCheck', 'UserPlus', 'UserRoundCheck', 'Users', 'Workflow', 'Wrench', 'Zap');
  CREATE TYPE "public"."enum_sites_footer_groups_links_link_type" AS ENUM('page', 'url', 'email', 'project', 'requestAccess', 'apiSpec', 'status', 'mainSite');
  CREATE TYPE "public"."enum_sites_footer_legal_link_type" AS ENUM('page', 'url', 'email', 'project', 'requestAccess', 'apiSpec', 'status', 'mainSite');
  CREATE TYPE "public"."enum_sites_slug" AS ENUM('portfolio', 'user-directory');
  CREATE TYPE "public"."enum__sites_v_version_header_nav_icon" AS ENUM('Activity', 'ArrowDown', 'ArrowRight', 'ArrowUpRight', 'BellRing', 'Blocks', 'BookOpen', 'Braces', 'Code', 'Compass', 'Container', 'Database', 'Download', 'Eye', 'FileBraces', 'FileCode', 'Filter', 'FingerprintPattern', 'FlaskConical', 'FolderGit2', 'FolderKanban', 'Forward', 'Gauge', 'GitBranch', 'GitPullRequest', 'Globe', 'Inbox', 'KeyRound', 'Laptop', 'Link2', 'ListChecks', 'LockKeyhole', 'LogIn', 'LogOut', 'Mail', 'MailCheck', 'MessagesSquare', 'MoonStar', 'Palette', 'PenTool', 'Repeat', 'Rocket', 'ScrollText', 'Search', 'Send', 'Server', 'ShieldCheck', 'Split', 'Ticket', 'UserCheck', 'UserPlus', 'UserRoundCheck', 'Users', 'Workflow', 'Wrench', 'Zap');
  CREATE TYPE "public"."enum__sites_v_version_header_nav_link_type" AS ENUM('page', 'url', 'email', 'project', 'requestAccess', 'apiSpec', 'status', 'mainSite');
  CREATE TYPE "public"."enum__sites_v_version_footer_groups_links_icon" AS ENUM('Activity', 'ArrowDown', 'ArrowRight', 'ArrowUpRight', 'BellRing', 'Blocks', 'BookOpen', 'Braces', 'Code', 'Compass', 'Container', 'Database', 'Download', 'Eye', 'FileBraces', 'FileCode', 'Filter', 'FingerprintPattern', 'FlaskConical', 'FolderGit2', 'FolderKanban', 'Forward', 'Gauge', 'GitBranch', 'GitPullRequest', 'Globe', 'Inbox', 'KeyRound', 'Laptop', 'Link2', 'ListChecks', 'LockKeyhole', 'LogIn', 'LogOut', 'Mail', 'MailCheck', 'MessagesSquare', 'MoonStar', 'Palette', 'PenTool', 'Repeat', 'Rocket', 'ScrollText', 'Search', 'Send', 'Server', 'ShieldCheck', 'Split', 'Ticket', 'UserCheck', 'UserPlus', 'UserRoundCheck', 'Users', 'Workflow', 'Wrench', 'Zap');
  CREATE TYPE "public"."enum__sites_v_version_footer_groups_links_link_type" AS ENUM('page', 'url', 'email', 'project', 'requestAccess', 'apiSpec', 'status', 'mainSite');
  CREATE TYPE "public"."enum__sites_v_version_footer_legal_link_type" AS ENUM('page', 'url', 'email', 'project', 'requestAccess', 'apiSpec', 'status', 'mainSite');
  CREATE TYPE "public"."enum__sites_v_version_slug" AS ENUM('portfolio', 'user-directory');
  CREATE TYPE "public"."enum_pb_phead_actions_style" AS ENUM('primary', 'secondary', 'accent', 'ghost');
  CREATE TYPE "public"."enum_pb_phead_actions_size" AS ENUM('default', 'sm', 'lg');
  CREATE TYPE "public"."enum_pb_phead_actions_icon" AS ENUM('Activity', 'ArrowDown', 'ArrowRight', 'ArrowUpRight', 'BellRing', 'Blocks', 'BookOpen', 'Braces', 'Code', 'Compass', 'Container', 'Database', 'Download', 'Eye', 'FileBraces', 'FileCode', 'Filter', 'FingerprintPattern', 'FlaskConical', 'FolderGit2', 'FolderKanban', 'Forward', 'Gauge', 'GitBranch', 'GitPullRequest', 'Globe', 'Inbox', 'KeyRound', 'Laptop', 'Link2', 'ListChecks', 'LockKeyhole', 'LogIn', 'LogOut', 'Mail', 'MailCheck', 'MessagesSquare', 'MoonStar', 'Palette', 'PenTool', 'Repeat', 'Rocket', 'ScrollText', 'Search', 'Send', 'Server', 'ShieldCheck', 'Split', 'Ticket', 'UserCheck', 'UserPlus', 'UserRoundCheck', 'Users', 'Workflow', 'Wrench', 'Zap');
  CREATE TYPE "public"."enum_pb_phead_actions_icon_position" AS ENUM('start', 'end');
  CREATE TYPE "public"."enum_pb_phead_actions_link_type" AS ENUM('page', 'url', 'email', 'project', 'requestAccess', 'apiSpec', 'status', 'mainSite');
  CREATE TYPE "public"."enum_pb_text_actions_style" AS ENUM('primary', 'secondary', 'accent', 'ghost');
  CREATE TYPE "public"."enum_pb_text_actions_size" AS ENUM('default', 'sm', 'lg');
  CREATE TYPE "public"."enum_pb_text_actions_icon" AS ENUM('Activity', 'ArrowDown', 'ArrowRight', 'ArrowUpRight', 'BellRing', 'Blocks', 'BookOpen', 'Braces', 'Code', 'Compass', 'Container', 'Database', 'Download', 'Eye', 'FileBraces', 'FileCode', 'Filter', 'FingerprintPattern', 'FlaskConical', 'FolderGit2', 'FolderKanban', 'Forward', 'Gauge', 'GitBranch', 'GitPullRequest', 'Globe', 'Inbox', 'KeyRound', 'Laptop', 'Link2', 'ListChecks', 'LockKeyhole', 'LogIn', 'LogOut', 'Mail', 'MailCheck', 'MessagesSquare', 'MoonStar', 'Palette', 'PenTool', 'Repeat', 'Rocket', 'ScrollText', 'Search', 'Send', 'Server', 'ShieldCheck', 'Split', 'Ticket', 'UserCheck', 'UserPlus', 'UserRoundCheck', 'Users', 'Workflow', 'Wrench', 'Zap');
  CREATE TYPE "public"."enum_pb_text_actions_icon_position" AS ENUM('start', 'end');
  CREATE TYPE "public"."enum_pb_text_actions_link_type" AS ENUM('page', 'url', 'email', 'project', 'requestAccess', 'apiSpec', 'status', 'mainSite');
  CREATE TYPE "public"."enum_pb_img_size" AS ENUM('column', 'small');
  CREATE TYPE "public"."enum_pb_imgtxt_actions_style" AS ENUM('primary', 'secondary', 'accent', 'ghost');
  CREATE TYPE "public"."enum_pb_imgtxt_actions_size" AS ENUM('default', 'sm', 'lg');
  CREATE TYPE "public"."enum_pb_imgtxt_actions_icon" AS ENUM('Activity', 'ArrowDown', 'ArrowRight', 'ArrowUpRight', 'BellRing', 'Blocks', 'BookOpen', 'Braces', 'Code', 'Compass', 'Container', 'Database', 'Download', 'Eye', 'FileBraces', 'FileCode', 'Filter', 'FingerprintPattern', 'FlaskConical', 'FolderGit2', 'FolderKanban', 'Forward', 'Gauge', 'GitBranch', 'GitPullRequest', 'Globe', 'Inbox', 'KeyRound', 'Laptop', 'Link2', 'ListChecks', 'LockKeyhole', 'LogIn', 'LogOut', 'Mail', 'MailCheck', 'MessagesSquare', 'MoonStar', 'Palette', 'PenTool', 'Repeat', 'Rocket', 'ScrollText', 'Search', 'Send', 'Server', 'ShieldCheck', 'Split', 'Ticket', 'UserCheck', 'UserPlus', 'UserRoundCheck', 'Users', 'Workflow', 'Wrench', 'Zap');
  CREATE TYPE "public"."enum_pb_imgtxt_actions_icon_position" AS ENUM('start', 'end');
  CREATE TYPE "public"."enum_pb_imgtxt_actions_link_type" AS ENUM('page', 'url', 'email', 'project', 'requestAccess', 'apiSpec', 'status', 'mainSite');
  CREATE TYPE "public"."enum_pb_imgtxt_image_side" AS ENUM('left', 'right');
  CREATE TYPE "public"."enum_pb_btns_actions_style" AS ENUM('primary', 'secondary', 'accent', 'ghost');
  CREATE TYPE "public"."enum_pb_btns_actions_size" AS ENUM('default', 'sm', 'lg');
  CREATE TYPE "public"."enum_pb_btns_actions_icon" AS ENUM('Activity', 'ArrowDown', 'ArrowRight', 'ArrowUpRight', 'BellRing', 'Blocks', 'BookOpen', 'Braces', 'Code', 'Compass', 'Container', 'Database', 'Download', 'Eye', 'FileBraces', 'FileCode', 'Filter', 'FingerprintPattern', 'FlaskConical', 'FolderGit2', 'FolderKanban', 'Forward', 'Gauge', 'GitBranch', 'GitPullRequest', 'Globe', 'Inbox', 'KeyRound', 'Laptop', 'Link2', 'ListChecks', 'LockKeyhole', 'LogIn', 'LogOut', 'Mail', 'MailCheck', 'MessagesSquare', 'MoonStar', 'Palette', 'PenTool', 'Repeat', 'Rocket', 'ScrollText', 'Search', 'Send', 'Server', 'ShieldCheck', 'Split', 'Ticket', 'UserCheck', 'UserPlus', 'UserRoundCheck', 'Users', 'Workflow', 'Wrench', 'Zap');
  CREATE TYPE "public"."enum_pb_btns_actions_icon_position" AS ENUM('start', 'end');
  CREATE TYPE "public"."enum_pb_btns_actions_link_type" AS ENUM('page', 'url', 'email', 'project', 'requestAccess', 'apiSpec', 'status', 'mainSite');
  CREATE TYPE "public"."enum_pb_btns_align" AS ENUM('start', 'center');
  CREATE TYPE "public"."enum_pb_grid_items_icon" AS ENUM('Activity', 'ArrowDown', 'ArrowRight', 'ArrowUpRight', 'BellRing', 'Blocks', 'BookOpen', 'Braces', 'Code', 'Compass', 'Container', 'Database', 'Download', 'Eye', 'FileBraces', 'FileCode', 'Filter', 'FingerprintPattern', 'FlaskConical', 'FolderGit2', 'FolderKanban', 'Forward', 'Gauge', 'GitBranch', 'GitPullRequest', 'Globe', 'Inbox', 'KeyRound', 'Laptop', 'Link2', 'ListChecks', 'LockKeyhole', 'LogIn', 'LogOut', 'Mail', 'MailCheck', 'MessagesSquare', 'MoonStar', 'Palette', 'PenTool', 'Repeat', 'Rocket', 'ScrollText', 'Search', 'Send', 'Server', 'ShieldCheck', 'Split', 'Ticket', 'UserCheck', 'UserPlus', 'UserRoundCheck', 'Users', 'Workflow', 'Wrench', 'Zap');
  CREATE TYPE "public"."enum_pb_grid_columns" AS ENUM('2', '3');
  CREATE TYPE "public"."enum_pb_tl_steps_icon" AS ENUM('Activity', 'ArrowDown', 'ArrowRight', 'ArrowUpRight', 'BellRing', 'Blocks', 'BookOpen', 'Braces', 'Code', 'Compass', 'Container', 'Database', 'Download', 'Eye', 'FileBraces', 'FileCode', 'Filter', 'FingerprintPattern', 'FlaskConical', 'FolderGit2', 'FolderKanban', 'Forward', 'Gauge', 'GitBranch', 'GitPullRequest', 'Globe', 'Inbox', 'KeyRound', 'Laptop', 'Link2', 'ListChecks', 'LockKeyhole', 'LogIn', 'LogOut', 'Mail', 'MailCheck', 'MessagesSquare', 'MoonStar', 'Palette', 'PenTool', 'Repeat', 'Rocket', 'ScrollText', 'Search', 'Send', 'Server', 'ShieldCheck', 'Split', 'Ticket', 'UserCheck', 'UserPlus', 'UserRoundCheck', 'Users', 'Workflow', 'Wrench', 'Zap');
  CREATE TYPE "public"."enum_pb_tl_aside" AS ENUM('none', 'note', 'tryAccess');
  CREATE TYPE "public"."enum_pb_cta_actions_style" AS ENUM('primary', 'secondary', 'accent', 'ghost');
  CREATE TYPE "public"."enum_pb_cta_actions_size" AS ENUM('default', 'sm', 'lg');
  CREATE TYPE "public"."enum_pb_cta_actions_icon" AS ENUM('Activity', 'ArrowDown', 'ArrowRight', 'ArrowUpRight', 'BellRing', 'Blocks', 'BookOpen', 'Braces', 'Code', 'Compass', 'Container', 'Database', 'Download', 'Eye', 'FileBraces', 'FileCode', 'Filter', 'FingerprintPattern', 'FlaskConical', 'FolderGit2', 'FolderKanban', 'Forward', 'Gauge', 'GitBranch', 'GitPullRequest', 'Globe', 'Inbox', 'KeyRound', 'Laptop', 'Link2', 'ListChecks', 'LockKeyhole', 'LogIn', 'LogOut', 'Mail', 'MailCheck', 'MessagesSquare', 'MoonStar', 'Palette', 'PenTool', 'Repeat', 'Rocket', 'ScrollText', 'Search', 'Send', 'Server', 'ShieldCheck', 'Split', 'Ticket', 'UserCheck', 'UserPlus', 'UserRoundCheck', 'Users', 'Workflow', 'Wrench', 'Zap');
  CREATE TYPE "public"."enum_pb_cta_actions_icon_position" AS ENUM('start', 'end');
  CREATE TYPE "public"."enum_pb_cta_actions_link_type" AS ENUM('page', 'url', 'email', 'project', 'requestAccess', 'apiSpec', 'status', 'mainSite');
  CREATE TYPE "public"."enum_pb_hero_actions_style" AS ENUM('primary', 'secondary', 'accent', 'ghost');
  CREATE TYPE "public"."enum_pb_hero_actions_size" AS ENUM('default', 'sm', 'lg');
  CREATE TYPE "public"."enum_pb_hero_actions_icon" AS ENUM('Activity', 'ArrowDown', 'ArrowRight', 'ArrowUpRight', 'BellRing', 'Blocks', 'BookOpen', 'Braces', 'Code', 'Compass', 'Container', 'Database', 'Download', 'Eye', 'FileBraces', 'FileCode', 'Filter', 'FingerprintPattern', 'FlaskConical', 'FolderGit2', 'FolderKanban', 'Forward', 'Gauge', 'GitBranch', 'GitPullRequest', 'Globe', 'Inbox', 'KeyRound', 'Laptop', 'Link2', 'ListChecks', 'LockKeyhole', 'LogIn', 'LogOut', 'Mail', 'MailCheck', 'MessagesSquare', 'MoonStar', 'Palette', 'PenTool', 'Repeat', 'Rocket', 'ScrollText', 'Search', 'Send', 'Server', 'ShieldCheck', 'Split', 'Ticket', 'UserCheck', 'UserPlus', 'UserRoundCheck', 'Users', 'Workflow', 'Wrench', 'Zap');
  CREATE TYPE "public"."enum_pb_hero_actions_icon_position" AS ENUM('start', 'end');
  CREATE TYPE "public"."enum_pb_hero_actions_link_type" AS ENUM('page', 'url', 'email', 'project', 'requestAccess', 'apiSpec', 'status', 'mainSite');
  CREATE TYPE "public"."enum_pb_lcards_items_link_type" AS ENUM('page', 'url', 'email', 'project', 'requestAccess', 'apiSpec', 'status', 'mainSite');
  CREATE TYPE "public"."enum_pb_map_apps_address" AS ENUM('none', 'SITE_URL', 'USER_DIRECTORY_URL', 'API_URL', 'STORYBOOK_URL', 'page');
  CREATE TYPE "public"."enum_pb_stack_pipeline_icon" AS ENUM('Activity', 'ArrowDown', 'ArrowRight', 'ArrowUpRight', 'BellRing', 'Blocks', 'BookOpen', 'Braces', 'Code', 'Compass', 'Container', 'Database', 'Download', 'Eye', 'FileBraces', 'FileCode', 'Filter', 'FingerprintPattern', 'FlaskConical', 'FolderGit2', 'FolderKanban', 'Forward', 'Gauge', 'GitBranch', 'GitPullRequest', 'Globe', 'Inbox', 'KeyRound', 'Laptop', 'Link2', 'ListChecks', 'LockKeyhole', 'LogIn', 'LogOut', 'Mail', 'MailCheck', 'MessagesSquare', 'MoonStar', 'Palette', 'PenTool', 'Repeat', 'Rocket', 'ScrollText', 'Search', 'Send', 'Server', 'ShieldCheck', 'Split', 'Ticket', 'UserCheck', 'UserPlus', 'UserRoundCheck', 'Users', 'Workflow', 'Wrench', 'Zap');
  CREATE TYPE "public"."enum_pb_stack_pieces_icon" AS ENUM('Activity', 'ArrowDown', 'ArrowRight', 'ArrowUpRight', 'BellRing', 'Blocks', 'BookOpen', 'Braces', 'Code', 'Compass', 'Container', 'Database', 'Download', 'Eye', 'FileBraces', 'FileCode', 'Filter', 'FingerprintPattern', 'FlaskConical', 'FolderGit2', 'FolderKanban', 'Forward', 'Gauge', 'GitBranch', 'GitPullRequest', 'Globe', 'Inbox', 'KeyRound', 'Laptop', 'Link2', 'ListChecks', 'LockKeyhole', 'LogIn', 'LogOut', 'Mail', 'MailCheck', 'MessagesSquare', 'MoonStar', 'Palette', 'PenTool', 'Repeat', 'Rocket', 'ScrollText', 'Search', 'Send', 'Server', 'ShieldCheck', 'Split', 'Ticket', 'UserCheck', 'UserPlus', 'UserRoundCheck', 'Users', 'Workflow', 'Wrench', 'Zap');
  CREATE TYPE "public"."enum_pb_stack_tool_groups_tools_icon" AS ENUM('Activity', 'ArrowDown', 'ArrowRight', 'ArrowUpRight', 'BellRing', 'Blocks', 'BookOpen', 'Braces', 'Code', 'Compass', 'Container', 'Database', 'Download', 'Eye', 'FileBraces', 'FileCode', 'Filter', 'FingerprintPattern', 'FlaskConical', 'FolderGit2', 'FolderKanban', 'Forward', 'Gauge', 'GitBranch', 'GitPullRequest', 'Globe', 'Inbox', 'KeyRound', 'Laptop', 'Link2', 'ListChecks', 'LockKeyhole', 'LogIn', 'LogOut', 'Mail', 'MailCheck', 'MessagesSquare', 'MoonStar', 'Palette', 'PenTool', 'Repeat', 'Rocket', 'ScrollText', 'Search', 'Send', 'Server', 'ShieldCheck', 'Split', 'Ticket', 'UserCheck', 'UserPlus', 'UserRoundCheck', 'Users', 'Workflow', 'Wrench', 'Zap');
  CREATE TYPE "public"."enum_pb_flows_rows_steps_icon" AS ENUM('Activity', 'ArrowDown', 'ArrowRight', 'ArrowUpRight', 'BellRing', 'Blocks', 'BookOpen', 'Braces', 'Code', 'Compass', 'Container', 'Database', 'Download', 'Eye', 'FileBraces', 'FileCode', 'Filter', 'FingerprintPattern', 'FlaskConical', 'FolderGit2', 'FolderKanban', 'Forward', 'Gauge', 'GitBranch', 'GitPullRequest', 'Globe', 'Inbox', 'KeyRound', 'Laptop', 'Link2', 'ListChecks', 'LockKeyhole', 'LogIn', 'LogOut', 'Mail', 'MailCheck', 'MessagesSquare', 'MoonStar', 'Palette', 'PenTool', 'Repeat', 'Rocket', 'ScrollText', 'Search', 'Send', 'Server', 'ShieldCheck', 'Split', 'Ticket', 'UserCheck', 'UserPlus', 'UserRoundCheck', 'Users', 'Workflow', 'Wrench', 'Zap');
  CREATE TYPE "public"."enum_pb_senders_senders_icon" AS ENUM('Activity', 'ArrowDown', 'ArrowRight', 'ArrowUpRight', 'BellRing', 'Blocks', 'BookOpen', 'Braces', 'Code', 'Compass', 'Container', 'Database', 'Download', 'Eye', 'FileBraces', 'FileCode', 'Filter', 'FingerprintPattern', 'FlaskConical', 'FolderGit2', 'FolderKanban', 'Forward', 'Gauge', 'GitBranch', 'GitPullRequest', 'Globe', 'Inbox', 'KeyRound', 'Laptop', 'Link2', 'ListChecks', 'LockKeyhole', 'LogIn', 'LogOut', 'Mail', 'MailCheck', 'MessagesSquare', 'MoonStar', 'Palette', 'PenTool', 'Repeat', 'Rocket', 'ScrollText', 'Search', 'Send', 'Server', 'ShieldCheck', 'Split', 'Ticket', 'UserCheck', 'UserPlus', 'UserRoundCheck', 'Users', 'Workflow', 'Wrench', 'Zap');
  CREATE TYPE "public"."enum_pb_theme_preview_components_link_type" AS ENUM('page', 'url', 'email', 'project', 'requestAccess', 'apiSpec', 'status', 'mainSite');
  CREATE TYPE "public"."enum_pb_apiref_points_icon" AS ENUM('Activity', 'ArrowDown', 'ArrowRight', 'ArrowUpRight', 'BellRing', 'Blocks', 'BookOpen', 'Braces', 'Code', 'Compass', 'Container', 'Database', 'Download', 'Eye', 'FileBraces', 'FileCode', 'Filter', 'FingerprintPattern', 'FlaskConical', 'FolderGit2', 'FolderKanban', 'Forward', 'Gauge', 'GitBranch', 'GitPullRequest', 'Globe', 'Inbox', 'KeyRound', 'Laptop', 'Link2', 'ListChecks', 'LockKeyhole', 'LogIn', 'LogOut', 'Mail', 'MailCheck', 'MessagesSquare', 'MoonStar', 'Palette', 'PenTool', 'Repeat', 'Rocket', 'ScrollText', 'Search', 'Send', 'Server', 'ShieldCheck', 'Split', 'Ticket', 'UserCheck', 'UserPlus', 'UserRoundCheck', 'Users', 'Workflow', 'Wrench', 'Zap');
  CREATE TYPE "public"."enum_pb_dhero_actions_style" AS ENUM('primary', 'secondary', 'accent', 'ghost');
  CREATE TYPE "public"."enum_pb_dhero_actions_size" AS ENUM('default', 'sm', 'lg');
  CREATE TYPE "public"."enum_pb_dhero_actions_icon" AS ENUM('Activity', 'ArrowDown', 'ArrowRight', 'ArrowUpRight', 'BellRing', 'Blocks', 'BookOpen', 'Braces', 'Code', 'Compass', 'Container', 'Database', 'Download', 'Eye', 'FileBraces', 'FileCode', 'Filter', 'FingerprintPattern', 'FlaskConical', 'FolderGit2', 'FolderKanban', 'Forward', 'Gauge', 'GitBranch', 'GitPullRequest', 'Globe', 'Inbox', 'KeyRound', 'Laptop', 'Link2', 'ListChecks', 'LockKeyhole', 'LogIn', 'LogOut', 'Mail', 'MailCheck', 'MessagesSquare', 'MoonStar', 'Palette', 'PenTool', 'Repeat', 'Rocket', 'ScrollText', 'Search', 'Send', 'Server', 'ShieldCheck', 'Split', 'Ticket', 'UserCheck', 'UserPlus', 'UserRoundCheck', 'Users', 'Workflow', 'Wrench', 'Zap');
  CREATE TYPE "public"."enum_pb_dhero_actions_icon_position" AS ENUM('start', 'end');
  CREATE TYPE "public"."enum_pb_dhero_actions_link_type" AS ENUM('page', 'url', 'email', 'project', 'requestAccess', 'apiSpec', 'status', 'mainSite');
  CREATE TYPE "public"."enum_pb_dhero_tag_icon" AS ENUM('Activity', 'ArrowDown', 'ArrowRight', 'ArrowUpRight', 'BellRing', 'Blocks', 'BookOpen', 'Braces', 'Code', 'Compass', 'Container', 'Database', 'Download', 'Eye', 'FileBraces', 'FileCode', 'Filter', 'FingerprintPattern', 'FlaskConical', 'FolderGit2', 'FolderKanban', 'Forward', 'Gauge', 'GitBranch', 'GitPullRequest', 'Globe', 'Inbox', 'KeyRound', 'Laptop', 'Link2', 'ListChecks', 'LockKeyhole', 'LogIn', 'LogOut', 'Mail', 'MailCheck', 'MessagesSquare', 'MoonStar', 'Palette', 'PenTool', 'Repeat', 'Rocket', 'ScrollText', 'Search', 'Send', 'Server', 'ShieldCheck', 'Split', 'Ticket', 'UserCheck', 'UserPlus', 'UserRoundCheck', 'Users', 'Workflow', 'Wrench', 'Zap');
  CREATE TYPE "public"."enum_pages_icon" AS ENUM('Activity', 'ArrowDown', 'ArrowRight', 'ArrowUpRight', 'BellRing', 'Blocks', 'BookOpen', 'Braces', 'Code', 'Compass', 'Container', 'Database', 'Download', 'Eye', 'FileBraces', 'FileCode', 'Filter', 'FingerprintPattern', 'FlaskConical', 'FolderGit2', 'FolderKanban', 'Forward', 'Gauge', 'GitBranch', 'GitPullRequest', 'Globe', 'Inbox', 'KeyRound', 'Laptop', 'Link2', 'ListChecks', 'LockKeyhole', 'LogIn', 'LogOut', 'Mail', 'MailCheck', 'MessagesSquare', 'MoonStar', 'Palette', 'PenTool', 'Repeat', 'Rocket', 'ScrollText', 'Search', 'Send', 'Server', 'ShieldCheck', 'Split', 'Ticket', 'UserCheck', 'UserPlus', 'UserRoundCheck', 'Users', 'Workflow', 'Wrench', 'Zap');
  CREATE TYPE "public"."enum_pages_width" AS ENUM('wide', 'narrow', 'full');
  CREATE TYPE "public"."enum_pages_backdrop" AS ENUM('none', 'dotGrid');
  CREATE TYPE "public"."enum_pages_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__pb_phead_v_actions_style" AS ENUM('primary', 'secondary', 'accent', 'ghost');
  CREATE TYPE "public"."enum__pb_phead_v_actions_size" AS ENUM('default', 'sm', 'lg');
  CREATE TYPE "public"."enum__pb_phead_v_actions_icon" AS ENUM('Activity', 'ArrowDown', 'ArrowRight', 'ArrowUpRight', 'BellRing', 'Blocks', 'BookOpen', 'Braces', 'Code', 'Compass', 'Container', 'Database', 'Download', 'Eye', 'FileBraces', 'FileCode', 'Filter', 'FingerprintPattern', 'FlaskConical', 'FolderGit2', 'FolderKanban', 'Forward', 'Gauge', 'GitBranch', 'GitPullRequest', 'Globe', 'Inbox', 'KeyRound', 'Laptop', 'Link2', 'ListChecks', 'LockKeyhole', 'LogIn', 'LogOut', 'Mail', 'MailCheck', 'MessagesSquare', 'MoonStar', 'Palette', 'PenTool', 'Repeat', 'Rocket', 'ScrollText', 'Search', 'Send', 'Server', 'ShieldCheck', 'Split', 'Ticket', 'UserCheck', 'UserPlus', 'UserRoundCheck', 'Users', 'Workflow', 'Wrench', 'Zap');
  CREATE TYPE "public"."enum__pb_phead_v_actions_icon_position" AS ENUM('start', 'end');
  CREATE TYPE "public"."enum__pb_phead_v_actions_link_type" AS ENUM('page', 'url', 'email', 'project', 'requestAccess', 'apiSpec', 'status', 'mainSite');
  CREATE TYPE "public"."enum__pb_text_v_actions_style" AS ENUM('primary', 'secondary', 'accent', 'ghost');
  CREATE TYPE "public"."enum__pb_text_v_actions_size" AS ENUM('default', 'sm', 'lg');
  CREATE TYPE "public"."enum__pb_text_v_actions_icon" AS ENUM('Activity', 'ArrowDown', 'ArrowRight', 'ArrowUpRight', 'BellRing', 'Blocks', 'BookOpen', 'Braces', 'Code', 'Compass', 'Container', 'Database', 'Download', 'Eye', 'FileBraces', 'FileCode', 'Filter', 'FingerprintPattern', 'FlaskConical', 'FolderGit2', 'FolderKanban', 'Forward', 'Gauge', 'GitBranch', 'GitPullRequest', 'Globe', 'Inbox', 'KeyRound', 'Laptop', 'Link2', 'ListChecks', 'LockKeyhole', 'LogIn', 'LogOut', 'Mail', 'MailCheck', 'MessagesSquare', 'MoonStar', 'Palette', 'PenTool', 'Repeat', 'Rocket', 'ScrollText', 'Search', 'Send', 'Server', 'ShieldCheck', 'Split', 'Ticket', 'UserCheck', 'UserPlus', 'UserRoundCheck', 'Users', 'Workflow', 'Wrench', 'Zap');
  CREATE TYPE "public"."enum__pb_text_v_actions_icon_position" AS ENUM('start', 'end');
  CREATE TYPE "public"."enum__pb_text_v_actions_link_type" AS ENUM('page', 'url', 'email', 'project', 'requestAccess', 'apiSpec', 'status', 'mainSite');
  CREATE TYPE "public"."enum__pb_img_v_size" AS ENUM('column', 'small');
  CREATE TYPE "public"."enum__pb_imgtxt_v_actions_style" AS ENUM('primary', 'secondary', 'accent', 'ghost');
  CREATE TYPE "public"."enum__pb_imgtxt_v_actions_size" AS ENUM('default', 'sm', 'lg');
  CREATE TYPE "public"."enum__pb_imgtxt_v_actions_icon" AS ENUM('Activity', 'ArrowDown', 'ArrowRight', 'ArrowUpRight', 'BellRing', 'Blocks', 'BookOpen', 'Braces', 'Code', 'Compass', 'Container', 'Database', 'Download', 'Eye', 'FileBraces', 'FileCode', 'Filter', 'FingerprintPattern', 'FlaskConical', 'FolderGit2', 'FolderKanban', 'Forward', 'Gauge', 'GitBranch', 'GitPullRequest', 'Globe', 'Inbox', 'KeyRound', 'Laptop', 'Link2', 'ListChecks', 'LockKeyhole', 'LogIn', 'LogOut', 'Mail', 'MailCheck', 'MessagesSquare', 'MoonStar', 'Palette', 'PenTool', 'Repeat', 'Rocket', 'ScrollText', 'Search', 'Send', 'Server', 'ShieldCheck', 'Split', 'Ticket', 'UserCheck', 'UserPlus', 'UserRoundCheck', 'Users', 'Workflow', 'Wrench', 'Zap');
  CREATE TYPE "public"."enum__pb_imgtxt_v_actions_icon_position" AS ENUM('start', 'end');
  CREATE TYPE "public"."enum__pb_imgtxt_v_actions_link_type" AS ENUM('page', 'url', 'email', 'project', 'requestAccess', 'apiSpec', 'status', 'mainSite');
  CREATE TYPE "public"."enum__pb_imgtxt_v_image_side" AS ENUM('left', 'right');
  CREATE TYPE "public"."enum__pb_btns_v_actions_style" AS ENUM('primary', 'secondary', 'accent', 'ghost');
  CREATE TYPE "public"."enum__pb_btns_v_actions_size" AS ENUM('default', 'sm', 'lg');
  CREATE TYPE "public"."enum__pb_btns_v_actions_icon" AS ENUM('Activity', 'ArrowDown', 'ArrowRight', 'ArrowUpRight', 'BellRing', 'Blocks', 'BookOpen', 'Braces', 'Code', 'Compass', 'Container', 'Database', 'Download', 'Eye', 'FileBraces', 'FileCode', 'Filter', 'FingerprintPattern', 'FlaskConical', 'FolderGit2', 'FolderKanban', 'Forward', 'Gauge', 'GitBranch', 'GitPullRequest', 'Globe', 'Inbox', 'KeyRound', 'Laptop', 'Link2', 'ListChecks', 'LockKeyhole', 'LogIn', 'LogOut', 'Mail', 'MailCheck', 'MessagesSquare', 'MoonStar', 'Palette', 'PenTool', 'Repeat', 'Rocket', 'ScrollText', 'Search', 'Send', 'Server', 'ShieldCheck', 'Split', 'Ticket', 'UserCheck', 'UserPlus', 'UserRoundCheck', 'Users', 'Workflow', 'Wrench', 'Zap');
  CREATE TYPE "public"."enum__pb_btns_v_actions_icon_position" AS ENUM('start', 'end');
  CREATE TYPE "public"."enum__pb_btns_v_actions_link_type" AS ENUM('page', 'url', 'email', 'project', 'requestAccess', 'apiSpec', 'status', 'mainSite');
  CREATE TYPE "public"."enum__pb_btns_v_align" AS ENUM('start', 'center');
  CREATE TYPE "public"."enum__pb_grid_v_items_icon" AS ENUM('Activity', 'ArrowDown', 'ArrowRight', 'ArrowUpRight', 'BellRing', 'Blocks', 'BookOpen', 'Braces', 'Code', 'Compass', 'Container', 'Database', 'Download', 'Eye', 'FileBraces', 'FileCode', 'Filter', 'FingerprintPattern', 'FlaskConical', 'FolderGit2', 'FolderKanban', 'Forward', 'Gauge', 'GitBranch', 'GitPullRequest', 'Globe', 'Inbox', 'KeyRound', 'Laptop', 'Link2', 'ListChecks', 'LockKeyhole', 'LogIn', 'LogOut', 'Mail', 'MailCheck', 'MessagesSquare', 'MoonStar', 'Palette', 'PenTool', 'Repeat', 'Rocket', 'ScrollText', 'Search', 'Send', 'Server', 'ShieldCheck', 'Split', 'Ticket', 'UserCheck', 'UserPlus', 'UserRoundCheck', 'Users', 'Workflow', 'Wrench', 'Zap');
  CREATE TYPE "public"."enum__pb_grid_v_columns" AS ENUM('2', '3');
  CREATE TYPE "public"."enum__pb_tl_v_steps_icon" AS ENUM('Activity', 'ArrowDown', 'ArrowRight', 'ArrowUpRight', 'BellRing', 'Blocks', 'BookOpen', 'Braces', 'Code', 'Compass', 'Container', 'Database', 'Download', 'Eye', 'FileBraces', 'FileCode', 'Filter', 'FingerprintPattern', 'FlaskConical', 'FolderGit2', 'FolderKanban', 'Forward', 'Gauge', 'GitBranch', 'GitPullRequest', 'Globe', 'Inbox', 'KeyRound', 'Laptop', 'Link2', 'ListChecks', 'LockKeyhole', 'LogIn', 'LogOut', 'Mail', 'MailCheck', 'MessagesSquare', 'MoonStar', 'Palette', 'PenTool', 'Repeat', 'Rocket', 'ScrollText', 'Search', 'Send', 'Server', 'ShieldCheck', 'Split', 'Ticket', 'UserCheck', 'UserPlus', 'UserRoundCheck', 'Users', 'Workflow', 'Wrench', 'Zap');
  CREATE TYPE "public"."enum__pb_tl_v_aside" AS ENUM('none', 'note', 'tryAccess');
  CREATE TYPE "public"."enum__pb_cta_v_actions_style" AS ENUM('primary', 'secondary', 'accent', 'ghost');
  CREATE TYPE "public"."enum__pb_cta_v_actions_size" AS ENUM('default', 'sm', 'lg');
  CREATE TYPE "public"."enum__pb_cta_v_actions_icon" AS ENUM('Activity', 'ArrowDown', 'ArrowRight', 'ArrowUpRight', 'BellRing', 'Blocks', 'BookOpen', 'Braces', 'Code', 'Compass', 'Container', 'Database', 'Download', 'Eye', 'FileBraces', 'FileCode', 'Filter', 'FingerprintPattern', 'FlaskConical', 'FolderGit2', 'FolderKanban', 'Forward', 'Gauge', 'GitBranch', 'GitPullRequest', 'Globe', 'Inbox', 'KeyRound', 'Laptop', 'Link2', 'ListChecks', 'LockKeyhole', 'LogIn', 'LogOut', 'Mail', 'MailCheck', 'MessagesSquare', 'MoonStar', 'Palette', 'PenTool', 'Repeat', 'Rocket', 'ScrollText', 'Search', 'Send', 'Server', 'ShieldCheck', 'Split', 'Ticket', 'UserCheck', 'UserPlus', 'UserRoundCheck', 'Users', 'Workflow', 'Wrench', 'Zap');
  CREATE TYPE "public"."enum__pb_cta_v_actions_icon_position" AS ENUM('start', 'end');
  CREATE TYPE "public"."enum__pb_cta_v_actions_link_type" AS ENUM('page', 'url', 'email', 'project', 'requestAccess', 'apiSpec', 'status', 'mainSite');
  CREATE TYPE "public"."enum__pb_hero_v_actions_style" AS ENUM('primary', 'secondary', 'accent', 'ghost');
  CREATE TYPE "public"."enum__pb_hero_v_actions_size" AS ENUM('default', 'sm', 'lg');
  CREATE TYPE "public"."enum__pb_hero_v_actions_icon" AS ENUM('Activity', 'ArrowDown', 'ArrowRight', 'ArrowUpRight', 'BellRing', 'Blocks', 'BookOpen', 'Braces', 'Code', 'Compass', 'Container', 'Database', 'Download', 'Eye', 'FileBraces', 'FileCode', 'Filter', 'FingerprintPattern', 'FlaskConical', 'FolderGit2', 'FolderKanban', 'Forward', 'Gauge', 'GitBranch', 'GitPullRequest', 'Globe', 'Inbox', 'KeyRound', 'Laptop', 'Link2', 'ListChecks', 'LockKeyhole', 'LogIn', 'LogOut', 'Mail', 'MailCheck', 'MessagesSquare', 'MoonStar', 'Palette', 'PenTool', 'Repeat', 'Rocket', 'ScrollText', 'Search', 'Send', 'Server', 'ShieldCheck', 'Split', 'Ticket', 'UserCheck', 'UserPlus', 'UserRoundCheck', 'Users', 'Workflow', 'Wrench', 'Zap');
  CREATE TYPE "public"."enum__pb_hero_v_actions_icon_position" AS ENUM('start', 'end');
  CREATE TYPE "public"."enum__pb_hero_v_actions_link_type" AS ENUM('page', 'url', 'email', 'project', 'requestAccess', 'apiSpec', 'status', 'mainSite');
  CREATE TYPE "public"."enum__pb_lcards_v_items_link_type" AS ENUM('page', 'url', 'email', 'project', 'requestAccess', 'apiSpec', 'status', 'mainSite');
  CREATE TYPE "public"."enum__pb_map_v_apps_address" AS ENUM('none', 'SITE_URL', 'USER_DIRECTORY_URL', 'API_URL', 'STORYBOOK_URL', 'page');
  CREATE TYPE "public"."enum__pb_stack_v_pipeline_icon" AS ENUM('Activity', 'ArrowDown', 'ArrowRight', 'ArrowUpRight', 'BellRing', 'Blocks', 'BookOpen', 'Braces', 'Code', 'Compass', 'Container', 'Database', 'Download', 'Eye', 'FileBraces', 'FileCode', 'Filter', 'FingerprintPattern', 'FlaskConical', 'FolderGit2', 'FolderKanban', 'Forward', 'Gauge', 'GitBranch', 'GitPullRequest', 'Globe', 'Inbox', 'KeyRound', 'Laptop', 'Link2', 'ListChecks', 'LockKeyhole', 'LogIn', 'LogOut', 'Mail', 'MailCheck', 'MessagesSquare', 'MoonStar', 'Palette', 'PenTool', 'Repeat', 'Rocket', 'ScrollText', 'Search', 'Send', 'Server', 'ShieldCheck', 'Split', 'Ticket', 'UserCheck', 'UserPlus', 'UserRoundCheck', 'Users', 'Workflow', 'Wrench', 'Zap');
  CREATE TYPE "public"."enum__pb_stack_v_pieces_icon" AS ENUM('Activity', 'ArrowDown', 'ArrowRight', 'ArrowUpRight', 'BellRing', 'Blocks', 'BookOpen', 'Braces', 'Code', 'Compass', 'Container', 'Database', 'Download', 'Eye', 'FileBraces', 'FileCode', 'Filter', 'FingerprintPattern', 'FlaskConical', 'FolderGit2', 'FolderKanban', 'Forward', 'Gauge', 'GitBranch', 'GitPullRequest', 'Globe', 'Inbox', 'KeyRound', 'Laptop', 'Link2', 'ListChecks', 'LockKeyhole', 'LogIn', 'LogOut', 'Mail', 'MailCheck', 'MessagesSquare', 'MoonStar', 'Palette', 'PenTool', 'Repeat', 'Rocket', 'ScrollText', 'Search', 'Send', 'Server', 'ShieldCheck', 'Split', 'Ticket', 'UserCheck', 'UserPlus', 'UserRoundCheck', 'Users', 'Workflow', 'Wrench', 'Zap');
  CREATE TYPE "public"."enum__pb_stack_v_tool_groups_tools_icon" AS ENUM('Activity', 'ArrowDown', 'ArrowRight', 'ArrowUpRight', 'BellRing', 'Blocks', 'BookOpen', 'Braces', 'Code', 'Compass', 'Container', 'Database', 'Download', 'Eye', 'FileBraces', 'FileCode', 'Filter', 'FingerprintPattern', 'FlaskConical', 'FolderGit2', 'FolderKanban', 'Forward', 'Gauge', 'GitBranch', 'GitPullRequest', 'Globe', 'Inbox', 'KeyRound', 'Laptop', 'Link2', 'ListChecks', 'LockKeyhole', 'LogIn', 'LogOut', 'Mail', 'MailCheck', 'MessagesSquare', 'MoonStar', 'Palette', 'PenTool', 'Repeat', 'Rocket', 'ScrollText', 'Search', 'Send', 'Server', 'ShieldCheck', 'Split', 'Ticket', 'UserCheck', 'UserPlus', 'UserRoundCheck', 'Users', 'Workflow', 'Wrench', 'Zap');
  CREATE TYPE "public"."enum__pb_flows_v_rows_steps_icon" AS ENUM('Activity', 'ArrowDown', 'ArrowRight', 'ArrowUpRight', 'BellRing', 'Blocks', 'BookOpen', 'Braces', 'Code', 'Compass', 'Container', 'Database', 'Download', 'Eye', 'FileBraces', 'FileCode', 'Filter', 'FingerprintPattern', 'FlaskConical', 'FolderGit2', 'FolderKanban', 'Forward', 'Gauge', 'GitBranch', 'GitPullRequest', 'Globe', 'Inbox', 'KeyRound', 'Laptop', 'Link2', 'ListChecks', 'LockKeyhole', 'LogIn', 'LogOut', 'Mail', 'MailCheck', 'MessagesSquare', 'MoonStar', 'Palette', 'PenTool', 'Repeat', 'Rocket', 'ScrollText', 'Search', 'Send', 'Server', 'ShieldCheck', 'Split', 'Ticket', 'UserCheck', 'UserPlus', 'UserRoundCheck', 'Users', 'Workflow', 'Wrench', 'Zap');
  CREATE TYPE "public"."enum__pb_senders_v_senders_icon" AS ENUM('Activity', 'ArrowDown', 'ArrowRight', 'ArrowUpRight', 'BellRing', 'Blocks', 'BookOpen', 'Braces', 'Code', 'Compass', 'Container', 'Database', 'Download', 'Eye', 'FileBraces', 'FileCode', 'Filter', 'FingerprintPattern', 'FlaskConical', 'FolderGit2', 'FolderKanban', 'Forward', 'Gauge', 'GitBranch', 'GitPullRequest', 'Globe', 'Inbox', 'KeyRound', 'Laptop', 'Link2', 'ListChecks', 'LockKeyhole', 'LogIn', 'LogOut', 'Mail', 'MailCheck', 'MessagesSquare', 'MoonStar', 'Palette', 'PenTool', 'Repeat', 'Rocket', 'ScrollText', 'Search', 'Send', 'Server', 'ShieldCheck', 'Split', 'Ticket', 'UserCheck', 'UserPlus', 'UserRoundCheck', 'Users', 'Workflow', 'Wrench', 'Zap');
  CREATE TYPE "public"."enum__pb_theme_v_preview_components_link_type" AS ENUM('page', 'url', 'email', 'project', 'requestAccess', 'apiSpec', 'status', 'mainSite');
  CREATE TYPE "public"."enum__pb_apiref_v_points_icon" AS ENUM('Activity', 'ArrowDown', 'ArrowRight', 'ArrowUpRight', 'BellRing', 'Blocks', 'BookOpen', 'Braces', 'Code', 'Compass', 'Container', 'Database', 'Download', 'Eye', 'FileBraces', 'FileCode', 'Filter', 'FingerprintPattern', 'FlaskConical', 'FolderGit2', 'FolderKanban', 'Forward', 'Gauge', 'GitBranch', 'GitPullRequest', 'Globe', 'Inbox', 'KeyRound', 'Laptop', 'Link2', 'ListChecks', 'LockKeyhole', 'LogIn', 'LogOut', 'Mail', 'MailCheck', 'MessagesSquare', 'MoonStar', 'Palette', 'PenTool', 'Repeat', 'Rocket', 'ScrollText', 'Search', 'Send', 'Server', 'ShieldCheck', 'Split', 'Ticket', 'UserCheck', 'UserPlus', 'UserRoundCheck', 'Users', 'Workflow', 'Wrench', 'Zap');
  CREATE TYPE "public"."enum__pb_dhero_v_actions_style" AS ENUM('primary', 'secondary', 'accent', 'ghost');
  CREATE TYPE "public"."enum__pb_dhero_v_actions_size" AS ENUM('default', 'sm', 'lg');
  CREATE TYPE "public"."enum__pb_dhero_v_actions_icon" AS ENUM('Activity', 'ArrowDown', 'ArrowRight', 'ArrowUpRight', 'BellRing', 'Blocks', 'BookOpen', 'Braces', 'Code', 'Compass', 'Container', 'Database', 'Download', 'Eye', 'FileBraces', 'FileCode', 'Filter', 'FingerprintPattern', 'FlaskConical', 'FolderGit2', 'FolderKanban', 'Forward', 'Gauge', 'GitBranch', 'GitPullRequest', 'Globe', 'Inbox', 'KeyRound', 'Laptop', 'Link2', 'ListChecks', 'LockKeyhole', 'LogIn', 'LogOut', 'Mail', 'MailCheck', 'MessagesSquare', 'MoonStar', 'Palette', 'PenTool', 'Repeat', 'Rocket', 'ScrollText', 'Search', 'Send', 'Server', 'ShieldCheck', 'Split', 'Ticket', 'UserCheck', 'UserPlus', 'UserRoundCheck', 'Users', 'Workflow', 'Wrench', 'Zap');
  CREATE TYPE "public"."enum__pb_dhero_v_actions_icon_position" AS ENUM('start', 'end');
  CREATE TYPE "public"."enum__pb_dhero_v_actions_link_type" AS ENUM('page', 'url', 'email', 'project', 'requestAccess', 'apiSpec', 'status', 'mainSite');
  CREATE TYPE "public"."enum__pb_dhero_v_tag_icon" AS ENUM('Activity', 'ArrowDown', 'ArrowRight', 'ArrowUpRight', 'BellRing', 'Blocks', 'BookOpen', 'Braces', 'Code', 'Compass', 'Container', 'Database', 'Download', 'Eye', 'FileBraces', 'FileCode', 'Filter', 'FingerprintPattern', 'FlaskConical', 'FolderGit2', 'FolderKanban', 'Forward', 'Gauge', 'GitBranch', 'GitPullRequest', 'Globe', 'Inbox', 'KeyRound', 'Laptop', 'Link2', 'ListChecks', 'LockKeyhole', 'LogIn', 'LogOut', 'Mail', 'MailCheck', 'MessagesSquare', 'MoonStar', 'Palette', 'PenTool', 'Repeat', 'Rocket', 'ScrollText', 'Search', 'Send', 'Server', 'ShieldCheck', 'Split', 'Ticket', 'UserCheck', 'UserPlus', 'UserRoundCheck', 'Users', 'Workflow', 'Wrench', 'Zap');
  CREATE TYPE "public"."enum__pages_v_version_icon" AS ENUM('Activity', 'ArrowDown', 'ArrowRight', 'ArrowUpRight', 'BellRing', 'Blocks', 'BookOpen', 'Braces', 'Code', 'Compass', 'Container', 'Database', 'Download', 'Eye', 'FileBraces', 'FileCode', 'Filter', 'FingerprintPattern', 'FlaskConical', 'FolderGit2', 'FolderKanban', 'Forward', 'Gauge', 'GitBranch', 'GitPullRequest', 'Globe', 'Inbox', 'KeyRound', 'Laptop', 'Link2', 'ListChecks', 'LockKeyhole', 'LogIn', 'LogOut', 'Mail', 'MailCheck', 'MessagesSquare', 'MoonStar', 'Palette', 'PenTool', 'Repeat', 'Rocket', 'ScrollText', 'Search', 'Send', 'Server', 'ShieldCheck', 'Split', 'Ticket', 'UserCheck', 'UserPlus', 'UserRoundCheck', 'Users', 'Workflow', 'Wrench', 'Zap');
  CREATE TYPE "public"."enum__pages_v_version_width" AS ENUM('wide', 'narrow', 'full');
  CREATE TYPE "public"."enum__pages_v_version_backdrop" AS ENUM('none', 'dotGrid');
  CREATE TYPE "public"."enum__pages_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_projects_address" AS ENUM('USER_DIRECTORY_URL', 'API_URL', 'STORYBOOK_URL', 'CMS_PUBLIC_URL');
  CREATE TYPE "public"."enum__projects_v_version_address" AS ENUM('USER_DIRECTORY_URL', 'API_URL', 'STORYBOOK_URL', 'CMS_PUBLIC_URL');
  CREATE TYPE "public"."enum_users_role" AS ENUM('editor', 'viewer');
  CREATE TABLE "sites_header_nav" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"icon" "enum_sites_header_nav_icon",
  	"link_type" "enum_sites_header_nav_link_type" DEFAULT 'page' NOT NULL,
  	"link_new_tab" boolean,
  	"link_page_id" integer,
  	"link_url" varchar,
  	"link_project_id" integer,
  	"link_project_target" "target" DEFAULT 'default',
  	"link_request_app" "app",
  	"link_anchor" varchar,
  	"link_download" varchar,
  	"wide_only" boolean
  );
  
  CREATE TABLE "sites_footer_groups_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"icon" "enum_sites_footer_groups_links_icon",
  	"link_type" "enum_sites_footer_groups_links_link_type" DEFAULT 'page' NOT NULL,
  	"link_new_tab" boolean,
  	"link_page_id" integer,
  	"link_url" varchar,
  	"link_project_id" integer,
  	"link_project_target" "target" DEFAULT 'default',
  	"link_request_app" "app",
  	"link_anchor" varchar,
  	"link_download" varchar
  );
  
  CREATE TABLE "sites_footer_groups" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL
  );
  
  CREATE TABLE "sites_footer_legal" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"link_type" "enum_sites_footer_legal_link_type" DEFAULT 'page' NOT NULL,
  	"link_new_tab" boolean,
  	"link_page_id" integer,
  	"link_url" varchar,
  	"link_project_id" integer,
  	"link_project_target" "target" DEFAULT 'default',
  	"link_request_app" "app",
  	"link_anchor" varchar,
  	"link_download" varchar
  );
  
  CREATE TABLE "sites" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"name" varchar NOT NULL,
  	"slug" "enum_sites_slug" NOT NULL,
  	"role" varchar,
  	"email" varchar,
  	"headline" varchar,
  	"github_url" varchar,
  	"description" varchar,
  	"header_labels_sign_in" varchar,
  	"header_labels_sign_out" varchar,
  	"header_labels_account" varchar,
  	"header_labels_theme" varchar,
  	"footer_tagline" varchar NOT NULL,
  	"footer_owner" varchar,
  	"interface_header_menu" varchar DEFAULT 'Menu' NOT NULL,
  	"interface_header_nav" varchar DEFAULT 'Main' NOT NULL,
  	"interface_header_new_tab" varchar DEFAULT '(opens in a new tab)' NOT NULL,
  	"interface_header_light" varchar DEFAULT 'Light theme' NOT NULL,
  	"interface_header_system" varchar DEFAULT 'Match system theme' NOT NULL,
  	"interface_header_dark" varchar DEFAULT 'Dark theme' NOT NULL,
  	"interface_footer_nav" varchar DEFAULT 'Footer' NOT NULL,
  	"interface_footer_new_tab" varchar DEFAULT '(opens in a new tab)' NOT NULL,
  	"interface_footer_rights" varchar DEFAULT 'All rights reserved.' NOT NULL,
  	"interface_cookies_title" varchar DEFAULT 'Cookies' NOT NULL,
  	"interface_cookies_body" varchar DEFAULT 'This site uses only essential cookies, to keep you signed in and remember your preferences. It does not use analytics or tracking cookies.' NOT NULL,
  	"interface_cookies_dismiss" varchar DEFAULT 'Got it' NOT NULL,
  	"interface_cookies_details" varchar DEFAULT 'Cookie details' NOT NULL,
  	"interface_cookies_region" varchar DEFAULT 'Cookie notice' NOT NULL,
  	"directory_contact_email" varchar,
  	"directory_contact_subject" varchar DEFAULT 'User Directory access',
  	"directory_form_add_title" varchar DEFAULT 'Add new user',
  	"directory_form_edit_title" varchar DEFAULT 'Edit user',
  	"directory_form_add_intro" varchar DEFAULT 'Fields marked optional can be filled in later.',
  	"directory_form_edit_intro" varchar DEFAULT 'Update {name}''s details.',
  	"directory_form_try_it_out" varchar DEFAULT 'Try it out: every field is checked, but saving needs an account.',
  	"directory_form_close" varchar DEFAULT 'Close',
  	"directory_form_optional" varchar DEFAULT '(optional)',
  	"directory_form_full_name" varchar DEFAULT 'Full name',
  	"directory_form_full_name_placeholder" varchar DEFAULT 'e.g. Jane Doe',
  	"directory_form_email" varchar DEFAULT 'Email',
  	"directory_form_email_placeholder" varchar DEFAULT 'jane@example.com',
  	"directory_form_phone" varchar DEFAULT 'Phone',
  	"directory_form_phone_placeholder" varchar DEFAULT '+44 7700 900123',
  	"directory_form_age" varchar DEFAULT 'Age',
  	"directory_form_age_placeholder" varchar DEFAULT '18–120',
  	"directory_form_country" varchar DEFAULT 'Country',
  	"directory_form_select_country" varchar DEFAULT 'Select country',
  	"directory_form_common_countries" varchar DEFAULT 'Common',
  	"directory_form_all_countries" varchar DEFAULT 'All countries',
  	"directory_form_city" varchar DEFAULT 'City',
  	"directory_form_city_placeholder" varchar DEFAULT 'e.g. Manchester',
  	"directory_form_job_title" varchar DEFAULT 'Job title',
  	"directory_form_job_title_placeholder" varchar DEFAULT 'e.g. Product designer',
  	"directory_form_interests" varchar DEFAULT 'Interests',
  	"directory_form_interests_count" varchar DEFAULT '{selected} of {max} selected',
  	"directory_form_bio" varchar DEFAULT 'Bio',
  	"directory_form_bio_placeholder" varchar DEFAULT 'A sentence or two about them',
  	"directory_form_cancel" varchar DEFAULT 'Cancel',
  	"directory_form_save" varchar DEFAULT 'Save changes',
  	"directory_form_saving" varchar DEFAULT 'Saving…',
  	"directory_form_add" varchar DEFAULT 'Add user',
  	"directory_form_adding" varchar DEFAULT 'Adding…',
  	"directory_form_saved" varchar DEFAULT 'Saved changes to {name}',
  	"directory_form_added" varchar DEFAULT 'Added {name}',
  	"directory_delete_title" varchar DEFAULT 'Delete user?',
  	"directory_delete_body" varchar DEFAULT '{name} will be removed permanently. This can''t be undone.',
  	"directory_delete_confirm" varchar DEFAULT 'Delete',
  	"directory_delete_busy" varchar DEFAULT 'Deleting…',
  	"directory_delete_cancel" varchar DEFAULT 'Cancel',
  	"directory_delete_deleted" varchar DEFAULT 'Deleted {name}',
  	"directory_delete_failed" varchar DEFAULT 'Couldn''t delete {name}. Please try again.',
  	"directory_delete_refused" varchar DEFAULT '{name} is still here: only editors can delete users.',
  	"directory_delete_email_for_access" varchar DEFAULT 'Email me for access',
  	"directory_refusals_sign_in_required" varchar DEFAULT 'Please sign in to make changes.',
  	"directory_refusals_edit_access_required" varchar DEFAULT 'Your account can''t make changes yet.',
  	"directory_refusals_not_found" varchar DEFAULT 'That user no longer exists.',
  	"directory_refusals_fix_fields" varchar DEFAULT 'Please fix the highlighted fields.',
  	"directory_refusals_email_taken" varchar DEFAULT 'That email is already in use.',
  	"directory_refusals_email_taken_field" varchar DEFAULT 'Another user already has this email',
  	"directory_access_visitor_refused" varchar DEFAULT 'Everything you entered passed the checks, but visitors can''t save changes. I''m happy to give you temporary access to try the rest.',
  	"directory_access_member_refused" varchar DEFAULT 'Everything you entered passed the checks, but your account doesn''t have edit access yet. Ask for it and I''ll approve it.',
  	"directory_access_request_access" varchar DEFAULT 'Request access',
  	"directory_access_request_edit_access" varchar DEFAULT 'Request edit access',
  	"directory_access_email_for_access" varchar DEFAULT 'Email me for access',
  	"directory_access_sign_in" varchar DEFAULT 'Sign in',
  	"directory_access_visitor_lead" varchar DEFAULT 'You''re browsing as a visitor.',
  	"directory_access_visitor_body" varchar DEFAULT 'Try adding or editing someone to see the form checks at work; saving changes needs an account.',
  	"directory_access_visitor_with_request" varchar DEFAULT '{request} and I''ll approve it, or {email}.',
  	"directory_access_visitor_without_request" varchar DEFAULT 'I''m happy to create one and give you temporary access: {email}.',
  	"directory_access_email_me" varchar DEFAULT 'email me',
  	"directory_access_member_lead" varchar DEFAULT 'You''re signed in, but can''t edit yet.',
  	"directory_access_member_body" varchar DEFAULT 'Try adding or editing someone to see the form checks at work.',
  	"directory_access_member_request" varchar DEFAULT '{request} and I''ll approve it.',
  	"directory_access_member_refresh" varchar DEFAULT 'Already approved? {refresh}.',
  	"directory_access_refresh_link" varchar DEFAULT 'Refresh your sign-in',
  	"directory_request_sent_title" varchar DEFAULT 'Request sent',
  	"directory_request_sent_body" varchar DEFAULT 'Thanks for asking. I''ve been notified and will look at it soon. Your account already works across the site; once editing is approved you''ll get an email, and you can make changes here.',
  	"directory_request_sent_button" varchar DEFAULT 'Got it',
  	"directory_error_page_title" varchar DEFAULT 'Something went wrong',
  	"directory_error_page_body" varchar DEFAULT 'The page couldn''t be loaded. Check the server is running and try again.',
  	"directory_error_page_retry" varchar DEFAULT 'Try again',
  	"preview_label" varchar DEFAULT 'You''re previewing unpublished changes.' NOT NULL,
  	"preview_exit" varchar DEFAULT 'Back to the published site' NOT NULL,
  	"not_found_eyebrow" varchar,
  	"not_found_title" varchar NOT NULL,
  	"not_found_back" varchar NOT NULL,
  	"not_found_body" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "sites_texts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "_sites_v_version_header_nav" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"icon" "enum__sites_v_version_header_nav_icon",
  	"link_type" "enum__sites_v_version_header_nav_link_type" DEFAULT 'page' NOT NULL,
  	"link_new_tab" boolean,
  	"link_page_id" integer,
  	"link_url" varchar,
  	"link_project_id" integer,
  	"link_project_target" "target" DEFAULT 'default',
  	"link_request_app" "app",
  	"link_anchor" varchar,
  	"link_download" varchar,
  	"wide_only" boolean,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_sites_v_version_footer_groups_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"icon" "enum__sites_v_version_footer_groups_links_icon",
  	"link_type" "enum__sites_v_version_footer_groups_links_link_type" DEFAULT 'page' NOT NULL,
  	"link_new_tab" boolean,
  	"link_page_id" integer,
  	"link_url" varchar,
  	"link_project_id" integer,
  	"link_project_target" "target" DEFAULT 'default',
  	"link_request_app" "app",
  	"link_anchor" varchar,
  	"link_download" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_sites_v_version_footer_groups" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_sites_v_version_footer_legal" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"link_type" "enum__sites_v_version_footer_legal_link_type" DEFAULT 'page' NOT NULL,
  	"link_new_tab" boolean,
  	"link_page_id" integer,
  	"link_url" varchar,
  	"link_project_id" integer,
  	"link_project_target" "target" DEFAULT 'default',
  	"link_request_app" "app",
  	"link_anchor" varchar,
  	"link_download" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_sites_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_label" varchar NOT NULL,
  	"version_name" varchar NOT NULL,
  	"version_slug" "enum__sites_v_version_slug" NOT NULL,
  	"version_role" varchar,
  	"version_email" varchar,
  	"version_headline" varchar,
  	"version_github_url" varchar,
  	"version_description" varchar,
  	"version_header_labels_sign_in" varchar,
  	"version_header_labels_sign_out" varchar,
  	"version_header_labels_account" varchar,
  	"version_header_labels_theme" varchar,
  	"version_footer_tagline" varchar NOT NULL,
  	"version_footer_owner" varchar,
  	"version_interface_header_menu" varchar DEFAULT 'Menu' NOT NULL,
  	"version_interface_header_nav" varchar DEFAULT 'Main' NOT NULL,
  	"version_interface_header_new_tab" varchar DEFAULT '(opens in a new tab)' NOT NULL,
  	"version_interface_header_light" varchar DEFAULT 'Light theme' NOT NULL,
  	"version_interface_header_system" varchar DEFAULT 'Match system theme' NOT NULL,
  	"version_interface_header_dark" varchar DEFAULT 'Dark theme' NOT NULL,
  	"version_interface_footer_nav" varchar DEFAULT 'Footer' NOT NULL,
  	"version_interface_footer_new_tab" varchar DEFAULT '(opens in a new tab)' NOT NULL,
  	"version_interface_footer_rights" varchar DEFAULT 'All rights reserved.' NOT NULL,
  	"version_interface_cookies_title" varchar DEFAULT 'Cookies' NOT NULL,
  	"version_interface_cookies_body" varchar DEFAULT 'This site uses only essential cookies, to keep you signed in and remember your preferences. It does not use analytics or tracking cookies.' NOT NULL,
  	"version_interface_cookies_dismiss" varchar DEFAULT 'Got it' NOT NULL,
  	"version_interface_cookies_details" varchar DEFAULT 'Cookie details' NOT NULL,
  	"version_interface_cookies_region" varchar DEFAULT 'Cookie notice' NOT NULL,
  	"version_directory_contact_email" varchar,
  	"version_directory_contact_subject" varchar DEFAULT 'User Directory access',
  	"version_directory_form_add_title" varchar DEFAULT 'Add new user',
  	"version_directory_form_edit_title" varchar DEFAULT 'Edit user',
  	"version_directory_form_add_intro" varchar DEFAULT 'Fields marked optional can be filled in later.',
  	"version_directory_form_edit_intro" varchar DEFAULT 'Update {name}''s details.',
  	"version_directory_form_try_it_out" varchar DEFAULT 'Try it out: every field is checked, but saving needs an account.',
  	"version_directory_form_close" varchar DEFAULT 'Close',
  	"version_directory_form_optional" varchar DEFAULT '(optional)',
  	"version_directory_form_full_name" varchar DEFAULT 'Full name',
  	"version_directory_form_full_name_placeholder" varchar DEFAULT 'e.g. Jane Doe',
  	"version_directory_form_email" varchar DEFAULT 'Email',
  	"version_directory_form_email_placeholder" varchar DEFAULT 'jane@example.com',
  	"version_directory_form_phone" varchar DEFAULT 'Phone',
  	"version_directory_form_phone_placeholder" varchar DEFAULT '+44 7700 900123',
  	"version_directory_form_age" varchar DEFAULT 'Age',
  	"version_directory_form_age_placeholder" varchar DEFAULT '18–120',
  	"version_directory_form_country" varchar DEFAULT 'Country',
  	"version_directory_form_select_country" varchar DEFAULT 'Select country',
  	"version_directory_form_common_countries" varchar DEFAULT 'Common',
  	"version_directory_form_all_countries" varchar DEFAULT 'All countries',
  	"version_directory_form_city" varchar DEFAULT 'City',
  	"version_directory_form_city_placeholder" varchar DEFAULT 'e.g. Manchester',
  	"version_directory_form_job_title" varchar DEFAULT 'Job title',
  	"version_directory_form_job_title_placeholder" varchar DEFAULT 'e.g. Product designer',
  	"version_directory_form_interests" varchar DEFAULT 'Interests',
  	"version_directory_form_interests_count" varchar DEFAULT '{selected} of {max} selected',
  	"version_directory_form_bio" varchar DEFAULT 'Bio',
  	"version_directory_form_bio_placeholder" varchar DEFAULT 'A sentence or two about them',
  	"version_directory_form_cancel" varchar DEFAULT 'Cancel',
  	"version_directory_form_save" varchar DEFAULT 'Save changes',
  	"version_directory_form_saving" varchar DEFAULT 'Saving…',
  	"version_directory_form_add" varchar DEFAULT 'Add user',
  	"version_directory_form_adding" varchar DEFAULT 'Adding…',
  	"version_directory_form_saved" varchar DEFAULT 'Saved changes to {name}',
  	"version_directory_form_added" varchar DEFAULT 'Added {name}',
  	"version_directory_delete_title" varchar DEFAULT 'Delete user?',
  	"version_directory_delete_body" varchar DEFAULT '{name} will be removed permanently. This can''t be undone.',
  	"version_directory_delete_confirm" varchar DEFAULT 'Delete',
  	"version_directory_delete_busy" varchar DEFAULT 'Deleting…',
  	"version_directory_delete_cancel" varchar DEFAULT 'Cancel',
  	"version_directory_delete_deleted" varchar DEFAULT 'Deleted {name}',
  	"version_directory_delete_failed" varchar DEFAULT 'Couldn''t delete {name}. Please try again.',
  	"version_directory_delete_refused" varchar DEFAULT '{name} is still here: only editors can delete users.',
  	"version_directory_delete_email_for_access" varchar DEFAULT 'Email me for access',
  	"version_directory_refusals_sign_in_required" varchar DEFAULT 'Please sign in to make changes.',
  	"version_directory_refusals_edit_access_required" varchar DEFAULT 'Your account can''t make changes yet.',
  	"version_directory_refusals_not_found" varchar DEFAULT 'That user no longer exists.',
  	"version_directory_refusals_fix_fields" varchar DEFAULT 'Please fix the highlighted fields.',
  	"version_directory_refusals_email_taken" varchar DEFAULT 'That email is already in use.',
  	"version_directory_refusals_email_taken_field" varchar DEFAULT 'Another user already has this email',
  	"version_directory_access_visitor_refused" varchar DEFAULT 'Everything you entered passed the checks, but visitors can''t save changes. I''m happy to give you temporary access to try the rest.',
  	"version_directory_access_member_refused" varchar DEFAULT 'Everything you entered passed the checks, but your account doesn''t have edit access yet. Ask for it and I''ll approve it.',
  	"version_directory_access_request_access" varchar DEFAULT 'Request access',
  	"version_directory_access_request_edit_access" varchar DEFAULT 'Request edit access',
  	"version_directory_access_email_for_access" varchar DEFAULT 'Email me for access',
  	"version_directory_access_sign_in" varchar DEFAULT 'Sign in',
  	"version_directory_access_visitor_lead" varchar DEFAULT 'You''re browsing as a visitor.',
  	"version_directory_access_visitor_body" varchar DEFAULT 'Try adding or editing someone to see the form checks at work; saving changes needs an account.',
  	"version_directory_access_visitor_with_request" varchar DEFAULT '{request} and I''ll approve it, or {email}.',
  	"version_directory_access_visitor_without_request" varchar DEFAULT 'I''m happy to create one and give you temporary access: {email}.',
  	"version_directory_access_email_me" varchar DEFAULT 'email me',
  	"version_directory_access_member_lead" varchar DEFAULT 'You''re signed in, but can''t edit yet.',
  	"version_directory_access_member_body" varchar DEFAULT 'Try adding or editing someone to see the form checks at work.',
  	"version_directory_access_member_request" varchar DEFAULT '{request} and I''ll approve it.',
  	"version_directory_access_member_refresh" varchar DEFAULT 'Already approved? {refresh}.',
  	"version_directory_access_refresh_link" varchar DEFAULT 'Refresh your sign-in',
  	"version_directory_request_sent_title" varchar DEFAULT 'Request sent',
  	"version_directory_request_sent_body" varchar DEFAULT 'Thanks for asking. I''ve been notified and will look at it soon. Your account already works across the site; once editing is approved you''ll get an email, and you can make changes here.',
  	"version_directory_request_sent_button" varchar DEFAULT 'Got it',
  	"version_directory_error_page_title" varchar DEFAULT 'Something went wrong',
  	"version_directory_error_page_body" varchar DEFAULT 'The page couldn''t be loaded. Check the server is running and try again.',
  	"version_directory_error_page_retry" varchar DEFAULT 'Try again',
  	"version_preview_label" varchar DEFAULT 'You''re previewing unpublished changes.' NOT NULL,
  	"version_preview_exit" varchar DEFAULT 'Back to the published site' NOT NULL,
  	"version_not_found_eyebrow" varchar,
  	"version_not_found_title" varchar NOT NULL,
  	"version_not_found_back" varchar NOT NULL,
  	"version_not_found_body" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "_sites_v_texts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "pb_phead_actions" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"style" "enum_pb_phead_actions_style" DEFAULT 'primary',
  	"size" "enum_pb_phead_actions_size" DEFAULT 'default',
  	"icon" "enum_pb_phead_actions_icon",
  	"icon_position" "enum_pb_phead_actions_icon_position" DEFAULT 'end',
  	"link_type" "enum_pb_phead_actions_link_type" DEFAULT 'page',
  	"link_new_tab" boolean,
  	"link_page_id" integer,
  	"link_url" varchar,
  	"link_project_id" integer,
  	"link_project_target" "target" DEFAULT 'default',
  	"link_request_app" "app",
  	"link_anchor" varchar,
  	"link_download" varchar
  );
  
  CREATE TABLE "pb_phead" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"intro" varchar,
  	"breadcrumbs" boolean DEFAULT true,
  	"breadcrumbs_label" varchar DEFAULT 'Breadcrumb',
  	"block_name" varchar
  );
  
  CREATE TABLE "pb_lhead" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"updated_label" varchar DEFAULT 'Last updated',
  	"updated" timestamp(3) with time zone,
  	"heading" varchar,
  	"intro" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pb_text_actions" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"style" "enum_pb_text_actions_style" DEFAULT 'primary',
  	"size" "enum_pb_text_actions_size" DEFAULT 'default',
  	"icon" "enum_pb_text_actions_icon",
  	"icon_position" "enum_pb_text_actions_icon_position" DEFAULT 'end',
  	"link_type" "enum_pb_text_actions_link_type" DEFAULT 'page',
  	"link_new_tab" boolean,
  	"link_page_id" integer,
  	"link_url" varchar,
  	"link_project_id" integer,
  	"link_project_target" "target" DEFAULT 'default',
  	"link_request_app" "app",
  	"link_anchor" varchar,
  	"link_download" varchar
  );
  
  CREATE TABLE "pb_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"body" jsonb,
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pb_img" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"caption" varchar,
  	"size" "enum_pb_img_size" DEFAULT 'column',
  	"block_name" varchar
  );
  
  CREATE TABLE "pb_imgtxt_actions" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"style" "enum_pb_imgtxt_actions_style" DEFAULT 'primary',
  	"size" "enum_pb_imgtxt_actions_size" DEFAULT 'default',
  	"icon" "enum_pb_imgtxt_actions_icon",
  	"icon_position" "enum_pb_imgtxt_actions_icon_position" DEFAULT 'end',
  	"link_type" "enum_pb_imgtxt_actions_link_type" DEFAULT 'page',
  	"link_new_tab" boolean,
  	"link_page_id" integer,
  	"link_url" varchar,
  	"link_project_id" integer,
  	"link_project_target" "target" DEFAULT 'default',
  	"link_request_app" "app",
  	"link_anchor" varchar,
  	"link_download" varchar
  );
  
  CREATE TABLE "pb_imgtxt" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"image_side" "enum_pb_imgtxt_image_side" DEFAULT 'left',
  	"eyebrow" varchar,
  	"heading" varchar,
  	"body" jsonb,
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pb_cols_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"body" jsonb
  );
  
  CREATE TABLE "pb_cols" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"intro" varchar,
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pb_txt" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"anchor" varchar,
  	"body" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "pb_btns_actions" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"style" "enum_pb_btns_actions_style" DEFAULT 'primary',
  	"size" "enum_pb_btns_actions_size" DEFAULT 'default',
  	"icon" "enum_pb_btns_actions_icon",
  	"icon_position" "enum_pb_btns_actions_icon_position" DEFAULT 'end',
  	"link_type" "enum_pb_btns_actions_link_type" DEFAULT 'page',
  	"link_new_tab" boolean,
  	"link_page_id" integer,
  	"link_url" varchar,
  	"link_project_id" integer,
  	"link_project_target" "target" DEFAULT 'default',
  	"link_request_app" "app",
  	"link_anchor" varchar,
  	"link_download" varchar
  );
  
  CREATE TABLE "pb_btns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"align" "enum_pb_btns_align" DEFAULT 'start',
  	"block_name" varchar
  );
  
  CREATE TABLE "pb_grid_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_pb_grid_items_icon",
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "pb_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"anchor" varchar,
  	"title" varchar,
  	"intro" varchar,
  	"columns" "enum_pb_grid_columns" DEFAULT '3',
  	"tags_label" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pb_tl_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_pb_tl_steps_icon",
  	"actor" varchar,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "pb_tl" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"anchor" varchar,
  	"title" varchar,
  	"intro" varchar,
  	"show_count" boolean DEFAULT true,
  	"aside" "enum_pb_tl_aside" DEFAULT 'none',
  	"note_title" varchar,
  	"note_body" varchar,
  	"try_access_title" varchar,
  	"try_access_body" varchar,
  	"try_access_signed_in" varchar,
  	"try_access_request_access" varchar,
  	"try_access_sign_in" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pb_cta_actions" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"style" "enum_pb_cta_actions_style" DEFAULT 'primary',
  	"size" "enum_pb_cta_actions_size" DEFAULT 'default',
  	"icon" "enum_pb_cta_actions_icon",
  	"icon_position" "enum_pb_cta_actions_icon_position" DEFAULT 'end',
  	"link_type" "enum_pb_cta_actions_link_type" DEFAULT 'page',
  	"link_new_tab" boolean,
  	"link_page_id" integer,
  	"link_url" varchar,
  	"link_project_id" integer,
  	"link_project_target" "target" DEFAULT 'default',
  	"link_request_app" "app",
  	"link_anchor" varchar,
  	"link_download" varchar
  );
  
  CREATE TABLE "pb_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"body" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pb_hero_actions" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"style" "enum_pb_hero_actions_style" DEFAULT 'primary',
  	"size" "enum_pb_hero_actions_size" DEFAULT 'default',
  	"icon" "enum_pb_hero_actions_icon",
  	"icon_position" "enum_pb_hero_actions_icon_position" DEFAULT 'end',
  	"link_type" "enum_pb_hero_actions_link_type" DEFAULT 'page',
  	"link_new_tab" boolean,
  	"link_page_id" integer,
  	"link_url" varchar,
  	"link_project_id" integer,
  	"link_project_target" "target" DEFAULT 'default',
  	"link_request_app" "app",
  	"link_anchor" varchar,
  	"link_download" varchar
  );
  
  CREATE TABLE "pb_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"role" varchar,
  	"headline" varchar,
  	"highlight" varchar,
  	"intro" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pb_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"anchor" varchar,
  	"title" varchar,
  	"intro" varchar,
  	"read_more" varchar DEFAULT 'Read more',
  	"block_name" varchar
  );
  
  CREATE TABLE "pb_lcards_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"body" varchar,
  	"link_label" varchar,
  	"link_type" "enum_pb_lcards_items_link_type" DEFAULT 'page',
  	"link_new_tab" boolean,
  	"link_page_id" integer,
  	"link_url" varchar,
  	"link_project_id" integer,
  	"link_project_target" "target" DEFAULT 'default',
  	"link_request_app" "app",
  	"link_anchor" varchar,
  	"link_download" varchar
  );
  
  CREATE TABLE "pb_lcards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"anchor" varchar,
  	"title" varchar,
  	"intro" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pb_teaser" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"anchor" varchar,
  	"eyebrow" varchar,
  	"title" varchar,
  	"intro" varchar,
  	"page_id" integer,
  	"link_label" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pb_projects_coming_next_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"detail" varchar
  );
  
  CREATE TABLE "pb_projects" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"anchor" varchar DEFAULT 'projects',
  	"eyebrow" varchar,
  	"title" varchar,
  	"coming_next_title" varchar,
  	"labels_live" varchar DEFAULT 'Live',
  	"labels_open" varchar DEFAULT 'Open the app',
  	"labels_source" varchar DEFAULT 'Source code',
  	"labels_built_with" varchar DEFAULT 'Built with',
  	"labels_source_on" varchar DEFAULT 'of {project} on GitHub',
  	"block_name" varchar
  );
  
  CREATE TABLE "pb_pteaser_highlights" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar
  );
  
  CREATE TABLE "pb_pteaser" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"anchor" varchar DEFAULT 'platform',
  	"eyebrow" varchar,
  	"title" varchar,
  	"intro" varchar,
  	"read_more" varchar DEFAULT 'Read more',
  	"link_label" varchar,
  	"link_page_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "pb_map_apps" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"host" varchar,
  	"name" varchar,
  	"detail" varchar,
  	"address" "enum_pb_map_apps_address" DEFAULT 'none',
  	"page_id" integer
  );
  
  CREATE TABLE "pb_map" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"anchor" varchar DEFAULT 'map',
  	"title" varchar,
  	"intro" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pb_stack_pipeline" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_pb_stack_pipeline_icon",
  	"title" varchar,
  	"detail" varchar
  );
  
  CREATE TABLE "pb_stack_pieces" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_pb_stack_pieces_icon",
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "pb_stack_tool_groups_tools" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"url" varchar,
  	"logo" varchar,
  	"logo_path" varchar,
  	"icon" "enum_pb_stack_tool_groups_tools_icon"
  );
  
  CREATE TABLE "pb_stack_tool_groups" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"group" varchar
  );
  
  CREATE TABLE "pb_stack" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"anchor" varchar DEFAULT 'stack',
  	"eyebrow" varchar,
  	"title" varchar,
  	"intro" varchar,
  	"pipeline_label" varchar,
  	"tools_title" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pb_flows_rows_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_pb_flows_rows_steps_icon",
  	"title" varchar,
  	"detail" varchar
  );
  
  CREATE TABLE "pb_flows_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar
  );
  
  CREATE TABLE "pb_flows" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"anchor" varchar,
  	"title" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pb_access_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"app" varchar,
  	"group" varchar,
  	"unlocks" varchar
  );
  
  CREATE TABLE "pb_access" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"anchor" varchar DEFAULT 'access',
  	"title" varchar,
  	"intro" varchar,
  	"columns_app" varchar,
  	"columns_group" varchar,
  	"columns_unlocks" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pb_addr_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"address" varchar,
  	"job" varchar
  );
  
  CREATE TABLE "pb_addr" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"anchor" varchar DEFAULT 'addresses',
  	"title" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pb_senders_senders" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_pb_senders_senders_icon",
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "pb_senders" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"anchor" varchar DEFAULT 'senders',
  	"title" varchar,
  	"preview_title" varchar,
  	"preview_from_label" varchar DEFAULT 'From',
  	"preview_from" varchar,
  	"preview_subject" varchar,
  	"preview_heading" varchar,
  	"preview_greeting" varchar,
  	"preview_body" varchar,
  	"preview_button" varchar,
  	"preview_caption" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pb_theme" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"anchor" varchar DEFAULT 'theme',
  	"eyebrow" varchar,
  	"title" varchar,
  	"intro" varchar,
  	"note" varchar,
  	"presets_label" varchar,
  	"theme_label" varchar,
  	"locked_title" varchar,
  	"locked_body" varchar,
  	"locked_sign_in" varchar,
  	"locked_member_title" varchar,
  	"locked_member_body" varchar,
  	"locked_request_access" varchar,
  	"locked_refresh" varchar,
  	"roles_primary_label" varchar,
  	"roles_primary_hint" varchar,
  	"roles_secondary_label" varchar,
  	"roles_secondary_hint" varchar,
  	"roles_accent_label" varchar,
  	"roles_accent_hint" varchar,
  	"preview_title" varchar,
  	"preview_heading" varchar,
  	"preview_primary_button" varchar,
  	"preview_primary_link" varchar,
  	"preview_primary_progress" varchar,
  	"preview_secondary_tile" varchar,
  	"preview_secondary_tag" varchar,
  	"preview_secondary_body" varchar,
  	"preview_accent_button" varchar,
  	"preview_accent_text" varchar,
  	"preview_accent_match" varchar,
  	"preview_all" varchar,
  	"preview_link" varchar,
  	"preview_components_link_type" "enum_pb_theme_preview_components_link_type" DEFAULT 'page',
  	"preview_components_link_new_tab" boolean,
  	"preview_components_link_page_id" integer,
  	"preview_components_link_url" varchar,
  	"preview_components_link_project_id" integer,
  	"preview_components_link_project_target" "target" DEFAULT 'default',
  	"preview_components_link_request_app" "app",
  	"preview_components_link_anchor" varchar,
  	"preview_components_link_download" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pb_apiref_points" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_pb_apiref_points_icon",
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "pb_apiref" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"project_id" integer,
  	"spec_path" varchar DEFAULT '/openapi/v1.json',
  	"loading" varchar DEFAULT 'Loading the reference…',
  	"unavailable_title" varchar,
  	"unavailable_description" varchar,
  	"facts_version" varchar DEFAULT 'Version',
  	"facts_endpoints" varchar DEFAULT 'Endpoints',
  	"facts_groups" varchar DEFAULT 'Groups',
  	"facts_authentication" varchar DEFAULT 'Authentication',
  	"auth_names_bearer" varchar DEFAULT 'Bearer token',
  	"auth_names_http" varchar DEFAULT 'HTTP {scheme}',
  	"auth_names_oauth2" varchar DEFAULT 'OAuth 2.0',
  	"auth_names_open_id_connect" varchar DEFAULT 'OpenID Connect',
  	"auth_names_api_key" varchar DEFAULT 'API key',
  	"auth_names_mutual_t_l_s" varchar DEFAULT 'Mutual TLS',
  	"block_name" varchar
  );
  
  CREATE TABLE "pb_dhero_actions" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"style" "enum_pb_dhero_actions_style" DEFAULT 'primary',
  	"size" "enum_pb_dhero_actions_size" DEFAULT 'default',
  	"icon" "enum_pb_dhero_actions_icon",
  	"icon_position" "enum_pb_dhero_actions_icon_position" DEFAULT 'end',
  	"link_type" "enum_pb_dhero_actions_link_type" DEFAULT 'page',
  	"link_new_tab" boolean,
  	"link_page_id" integer,
  	"link_url" varchar,
  	"link_project_id" integer,
  	"link_project_target" "target" DEFAULT 'default',
  	"link_request_app" "app",
  	"link_anchor" varchar,
  	"link_download" varchar
  );
  
  CREATE TABLE "pb_dhero_preview_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"job" varchar,
  	"country" varchar,
  	"match" boolean
  );
  
  CREATE TABLE "pb_dhero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tag" varchar,
  	"tag_icon" "enum_pb_dhero_tag_icon",
  	"headline" varchar,
  	"highlight" varchar,
  	"intro" varchar,
  	"summary_show" boolean DEFAULT true,
  	"summary_users" varchar DEFAULT 'users',
  	"summary_countries" varchar DEFAULT 'countries',
  	"summary_interests" varchar DEFAULT 'interests',
  	"preview_query" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pb_udir" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading_title" varchar DEFAULT 'Users',
  	"heading_intro" varchar DEFAULT 'Browse, add and manage everyone in one place.',
  	"heading_add" varchar DEFAULT 'Add user',
  	"heading_add_hint" varchar DEFAULT 'Add user (N)',
  	"stats_users" varchar DEFAULT 'Users',
  	"stats_average_age" varchar DEFAULT 'Average age',
  	"stats_countries" varchar DEFAULT 'Countries',
  	"stats_top_interest" varchar DEFAULT 'Top interest',
  	"toolbar_search_placeholder" varchar DEFAULT 'Search by name, email, job, city, interest…',
  	"toolbar_search" varchar DEFAULT 'Search',
  	"toolbar_clear_search" varchar DEFAULT 'Clear search',
  	"toolbar_sort" varchar DEFAULT 'Sort users',
  	"toolbar_best_match" varchar DEFAULT 'Best match',
  	"toolbar_layout" varchar DEFAULT 'Layout',
  	"toolbar_cards" varchar DEFAULT 'Cards view',
  	"toolbar_table" varchar DEFAULT 'Table view',
  	"sorts_id_desc" varchar DEFAULT 'Recently added',
  	"sorts_id_asc" varchar DEFAULT 'First added',
  	"sorts_name_asc" varchar DEFAULT 'Name (A–Z)',
  	"sorts_name_desc" varchar DEFAULT 'Name (Z–A)',
  	"sorts_age_asc" varchar DEFAULT 'Age (youngest)',
  	"sorts_age_desc" varchar DEFAULT 'Age (oldest)',
  	"sorts_country_asc" varchar DEFAULT 'Country (A–Z)',
  	"sorts_country_desc" varchar DEFAULT 'Country (Z–A)',
  	"filters_button" varchar DEFAULT 'Filters',
  	"filters_title" varchar DEFAULT 'Filters',
  	"filters_clear_all" varchar DEFAULT 'Clear all',
  	"filters_country" varchar DEFAULT 'Country',
  	"filters_any_country" varchar DEFAULT 'Any country',
  	"filters_age" varchar DEFAULT 'Age',
  	"filters_any_age" varchar DEFAULT 'Any',
  	"filters_interests" varchar DEFAULT 'Interests',
  	"filters_match_all" varchar DEFAULT 'Match all selected',
  	"filters_show_one" varchar DEFAULT 'Show {count} user',
  	"filters_show_many" varchar DEFAULT 'Show {count} users',
  	"filters_active_country" varchar DEFAULT 'Country: {value}',
  	"filters_active_age" varchar DEFAULT 'Age: {value}',
  	"filters_remove" varchar DEFAULT 'Remove filter {label}',
  	"results_name" varchar DEFAULT 'Name',
  	"results_age" varchar DEFAULT 'Age',
  	"results_country" varchar DEFAULT 'Country',
  	"results_interests" varchar DEFAULT 'Interests',
  	"results_actions" varchar DEFAULT 'Actions',
  	"results_years_old" varchar DEFAULT '{age} years old',
  	"results_edit" varchar DEFAULT 'Edit',
  	"results_delete" varchar DEFAULT 'Delete',
  	"results_edit_user" varchar DEFAULT 'Edit {name}',
  	"results_delete_user" varchar DEFAULT 'Delete {name}',
  	"empty_no_users_title" varchar DEFAULT 'No users yet',
  	"empty_no_users_body" varchar DEFAULT 'Add your first user to get started.',
  	"empty_no_match_search" varchar DEFAULT 'No one matches “{search}”',
  	"empty_no_match_filters" varchar DEFAULT 'No one matches these filters',
  	"empty_no_match_body" varchar DEFAULT 'Try fewer words, a different spelling, or removing a filter.',
  	"empty_clear" varchar DEFAULT 'Clear search and filters',
  	"pagination_nav" varchar DEFAULT 'Pagination',
  	"pagination_showing" varchar DEFAULT 'Showing',
  	"pagination_of" varchar DEFAULT 'of',
  	"pagination_previous" varchar DEFAULT 'Previous page',
  	"pagination_next" varchar DEFAULT 'Next page',
  	"pagination_page" varchar DEFAULT 'Page {page}',
  	"pagination_per_page" varchar DEFAULT 'Per page',
  	"block_name" varchar
  );
  
  CREATE TABLE "pb_uprof" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"labels_back" varchar DEFAULT 'All users',
  	"labels_years_old" varchar DEFAULT '{age} years old',
  	"labels_email" varchar DEFAULT 'Email',
  	"labels_phone" varchar DEFAULT 'Phone',
  	"labels_location" varchar DEFAULT 'Location',
  	"labels_job_title" varchar DEFAULT 'Job title',
  	"labels_member_since" varchar DEFAULT 'Member since',
  	"labels_last_updated" varchar DEFAULT 'Last updated',
  	"labels_not_provided" varchar DEFAULT 'Not provided',
  	"labels_interests" varchar DEFAULT 'Interests',
  	"labels_edit" varchar DEFAULT 'Edit',
  	"labels_delete" varchar DEFAULT 'Delete',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_breadcrumbs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"doc_id" integer,
  	"url" varchar,
  	"label" varchar
  );
  
  CREATE TABLE "pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"site_id" integer,
  	"title" varchar,
  	"nav_label" varchar,
  	"icon" "enum_pages_icon",
  	"card_label" varchar,
  	"summary" varchar,
  	"path" varchar,
  	"width" "enum_pages_width" DEFAULT 'wide',
  	"backdrop" "enum_pages_backdrop" DEFAULT 'none',
  	"in_sitemap" boolean DEFAULT true,
  	"parent_id" integer,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_pages_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "pages_texts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "pages_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer
  );
  
  CREATE TABLE "_pb_phead_v_actions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"style" "enum__pb_phead_v_actions_style" DEFAULT 'primary',
  	"size" "enum__pb_phead_v_actions_size" DEFAULT 'default',
  	"icon" "enum__pb_phead_v_actions_icon",
  	"icon_position" "enum__pb_phead_v_actions_icon_position" DEFAULT 'end',
  	"link_type" "enum__pb_phead_v_actions_link_type" DEFAULT 'page',
  	"link_new_tab" boolean,
  	"link_page_id" integer,
  	"link_url" varchar,
  	"link_project_id" integer,
  	"link_project_target" "target" DEFAULT 'default',
  	"link_request_app" "app",
  	"link_anchor" varchar,
  	"link_download" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pb_phead_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"intro" varchar,
  	"breadcrumbs" boolean DEFAULT true,
  	"breadcrumbs_label" varchar DEFAULT 'Breadcrumb',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pb_lhead_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_label" varchar DEFAULT 'Last updated',
  	"updated" timestamp(3) with time zone,
  	"heading" varchar,
  	"intro" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pb_text_v_actions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"style" "enum__pb_text_v_actions_style" DEFAULT 'primary',
  	"size" "enum__pb_text_v_actions_size" DEFAULT 'default',
  	"icon" "enum__pb_text_v_actions_icon",
  	"icon_position" "enum__pb_text_v_actions_icon_position" DEFAULT 'end',
  	"link_type" "enum__pb_text_v_actions_link_type" DEFAULT 'page',
  	"link_new_tab" boolean,
  	"link_page_id" integer,
  	"link_url" varchar,
  	"link_project_id" integer,
  	"link_project_target" "target" DEFAULT 'default',
  	"link_request_app" "app",
  	"link_anchor" varchar,
  	"link_download" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pb_text_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"body" jsonb,
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pb_img_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"caption" varchar,
  	"size" "enum__pb_img_v_size" DEFAULT 'column',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pb_imgtxt_v_actions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"style" "enum__pb_imgtxt_v_actions_style" DEFAULT 'primary',
  	"size" "enum__pb_imgtxt_v_actions_size" DEFAULT 'default',
  	"icon" "enum__pb_imgtxt_v_actions_icon",
  	"icon_position" "enum__pb_imgtxt_v_actions_icon_position" DEFAULT 'end',
  	"link_type" "enum__pb_imgtxt_v_actions_link_type" DEFAULT 'page',
  	"link_new_tab" boolean,
  	"link_page_id" integer,
  	"link_url" varchar,
  	"link_project_id" integer,
  	"link_project_target" "target" DEFAULT 'default',
  	"link_request_app" "app",
  	"link_anchor" varchar,
  	"link_download" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pb_imgtxt_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"image_side" "enum__pb_imgtxt_v_image_side" DEFAULT 'left',
  	"eyebrow" varchar,
  	"heading" varchar,
  	"body" jsonb,
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pb_cols_v_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"body" jsonb,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pb_cols_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"intro" varchar,
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pb_txt_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"anchor" varchar,
  	"body" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pb_btns_v_actions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"style" "enum__pb_btns_v_actions_style" DEFAULT 'primary',
  	"size" "enum__pb_btns_v_actions_size" DEFAULT 'default',
  	"icon" "enum__pb_btns_v_actions_icon",
  	"icon_position" "enum__pb_btns_v_actions_icon_position" DEFAULT 'end',
  	"link_type" "enum__pb_btns_v_actions_link_type" DEFAULT 'page',
  	"link_new_tab" boolean,
  	"link_page_id" integer,
  	"link_url" varchar,
  	"link_project_id" integer,
  	"link_project_target" "target" DEFAULT 'default',
  	"link_request_app" "app",
  	"link_anchor" varchar,
  	"link_download" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pb_btns_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"align" "enum__pb_btns_v_align" DEFAULT 'start',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pb_grid_v_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum__pb_grid_v_items_icon",
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pb_grid_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"anchor" varchar,
  	"title" varchar,
  	"intro" varchar,
  	"columns" "enum__pb_grid_v_columns" DEFAULT '3',
  	"tags_label" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pb_tl_v_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum__pb_tl_v_steps_icon",
  	"actor" varchar,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pb_tl_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"anchor" varchar,
  	"title" varchar,
  	"intro" varchar,
  	"show_count" boolean DEFAULT true,
  	"aside" "enum__pb_tl_v_aside" DEFAULT 'none',
  	"note_title" varchar,
  	"note_body" varchar,
  	"try_access_title" varchar,
  	"try_access_body" varchar,
  	"try_access_signed_in" varchar,
  	"try_access_request_access" varchar,
  	"try_access_sign_in" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pb_cta_v_actions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"style" "enum__pb_cta_v_actions_style" DEFAULT 'primary',
  	"size" "enum__pb_cta_v_actions_size" DEFAULT 'default',
  	"icon" "enum__pb_cta_v_actions_icon",
  	"icon_position" "enum__pb_cta_v_actions_icon_position" DEFAULT 'end',
  	"link_type" "enum__pb_cta_v_actions_link_type" DEFAULT 'page',
  	"link_new_tab" boolean,
  	"link_page_id" integer,
  	"link_url" varchar,
  	"link_project_id" integer,
  	"link_project_target" "target" DEFAULT 'default',
  	"link_request_app" "app",
  	"link_anchor" varchar,
  	"link_download" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pb_cta_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"body" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pb_hero_v_actions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"style" "enum__pb_hero_v_actions_style" DEFAULT 'primary',
  	"size" "enum__pb_hero_v_actions_size" DEFAULT 'default',
  	"icon" "enum__pb_hero_v_actions_icon",
  	"icon_position" "enum__pb_hero_v_actions_icon_position" DEFAULT 'end',
  	"link_type" "enum__pb_hero_v_actions_link_type" DEFAULT 'page',
  	"link_new_tab" boolean,
  	"link_page_id" integer,
  	"link_url" varchar,
  	"link_project_id" integer,
  	"link_project_target" "target" DEFAULT 'default',
  	"link_request_app" "app",
  	"link_anchor" varchar,
  	"link_download" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pb_hero_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"role" varchar,
  	"headline" varchar,
  	"highlight" varchar,
  	"intro" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pb_cards_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"anchor" varchar,
  	"title" varchar,
  	"intro" varchar,
  	"read_more" varchar DEFAULT 'Read more',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pb_lcards_v_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"body" varchar,
  	"link_label" varchar,
  	"link_type" "enum__pb_lcards_v_items_link_type" DEFAULT 'page',
  	"link_new_tab" boolean,
  	"link_page_id" integer,
  	"link_url" varchar,
  	"link_project_id" integer,
  	"link_project_target" "target" DEFAULT 'default',
  	"link_request_app" "app",
  	"link_anchor" varchar,
  	"link_download" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pb_lcards_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"anchor" varchar,
  	"title" varchar,
  	"intro" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pb_teaser_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"anchor" varchar,
  	"eyebrow" varchar,
  	"title" varchar,
  	"intro" varchar,
  	"page_id" integer,
  	"link_label" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pb_projects_v_coming_next_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"detail" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pb_projects_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"anchor" varchar DEFAULT 'projects',
  	"eyebrow" varchar,
  	"title" varchar,
  	"coming_next_title" varchar,
  	"labels_live" varchar DEFAULT 'Live',
  	"labels_open" varchar DEFAULT 'Open the app',
  	"labels_source" varchar DEFAULT 'Source code',
  	"labels_built_with" varchar DEFAULT 'Built with',
  	"labels_source_on" varchar DEFAULT 'of {project} on GitHub',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pb_pteaser_v_highlights" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pb_pteaser_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"anchor" varchar DEFAULT 'platform',
  	"eyebrow" varchar,
  	"title" varchar,
  	"intro" varchar,
  	"read_more" varchar DEFAULT 'Read more',
  	"link_label" varchar,
  	"link_page_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pb_map_v_apps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"host" varchar,
  	"name" varchar,
  	"detail" varchar,
  	"address" "enum__pb_map_v_apps_address" DEFAULT 'none',
  	"page_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pb_map_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"anchor" varchar DEFAULT 'map',
  	"title" varchar,
  	"intro" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pb_stack_v_pipeline" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum__pb_stack_v_pipeline_icon",
  	"title" varchar,
  	"detail" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pb_stack_v_pieces" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum__pb_stack_v_pieces_icon",
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pb_stack_v_tool_groups_tools" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"url" varchar,
  	"logo" varchar,
  	"logo_path" varchar,
  	"icon" "enum__pb_stack_v_tool_groups_tools_icon",
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pb_stack_v_tool_groups" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"group" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pb_stack_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"anchor" varchar DEFAULT 'stack',
  	"eyebrow" varchar,
  	"title" varchar,
  	"intro" varchar,
  	"pipeline_label" varchar,
  	"tools_title" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pb_flows_v_rows_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum__pb_flows_v_rows_steps_icon",
  	"title" varchar,
  	"detail" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pb_flows_v_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pb_flows_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"anchor" varchar,
  	"title" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pb_access_v_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"app" varchar,
  	"group" varchar,
  	"unlocks" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pb_access_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"anchor" varchar DEFAULT 'access',
  	"title" varchar,
  	"intro" varchar,
  	"columns_app" varchar,
  	"columns_group" varchar,
  	"columns_unlocks" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pb_addr_v_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"address" varchar,
  	"job" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pb_addr_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"anchor" varchar DEFAULT 'addresses',
  	"title" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pb_senders_v_senders" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum__pb_senders_v_senders_icon",
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pb_senders_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"anchor" varchar DEFAULT 'senders',
  	"title" varchar,
  	"preview_title" varchar,
  	"preview_from_label" varchar DEFAULT 'From',
  	"preview_from" varchar,
  	"preview_subject" varchar,
  	"preview_heading" varchar,
  	"preview_greeting" varchar,
  	"preview_body" varchar,
  	"preview_button" varchar,
  	"preview_caption" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pb_theme_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"anchor" varchar DEFAULT 'theme',
  	"eyebrow" varchar,
  	"title" varchar,
  	"intro" varchar,
  	"note" varchar,
  	"presets_label" varchar,
  	"theme_label" varchar,
  	"locked_title" varchar,
  	"locked_body" varchar,
  	"locked_sign_in" varchar,
  	"locked_member_title" varchar,
  	"locked_member_body" varchar,
  	"locked_request_access" varchar,
  	"locked_refresh" varchar,
  	"roles_primary_label" varchar,
  	"roles_primary_hint" varchar,
  	"roles_secondary_label" varchar,
  	"roles_secondary_hint" varchar,
  	"roles_accent_label" varchar,
  	"roles_accent_hint" varchar,
  	"preview_title" varchar,
  	"preview_heading" varchar,
  	"preview_primary_button" varchar,
  	"preview_primary_link" varchar,
  	"preview_primary_progress" varchar,
  	"preview_secondary_tile" varchar,
  	"preview_secondary_tag" varchar,
  	"preview_secondary_body" varchar,
  	"preview_accent_button" varchar,
  	"preview_accent_text" varchar,
  	"preview_accent_match" varchar,
  	"preview_all" varchar,
  	"preview_link" varchar,
  	"preview_components_link_type" "enum__pb_theme_v_preview_components_link_type" DEFAULT 'page',
  	"preview_components_link_new_tab" boolean,
  	"preview_components_link_page_id" integer,
  	"preview_components_link_url" varchar,
  	"preview_components_link_project_id" integer,
  	"preview_components_link_project_target" "target" DEFAULT 'default',
  	"preview_components_link_request_app" "app",
  	"preview_components_link_anchor" varchar,
  	"preview_components_link_download" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pb_apiref_v_points" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum__pb_apiref_v_points_icon",
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pb_apiref_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"project_id" integer,
  	"spec_path" varchar DEFAULT '/openapi/v1.json',
  	"loading" varchar DEFAULT 'Loading the reference…',
  	"unavailable_title" varchar,
  	"unavailable_description" varchar,
  	"facts_version" varchar DEFAULT 'Version',
  	"facts_endpoints" varchar DEFAULT 'Endpoints',
  	"facts_groups" varchar DEFAULT 'Groups',
  	"facts_authentication" varchar DEFAULT 'Authentication',
  	"auth_names_bearer" varchar DEFAULT 'Bearer token',
  	"auth_names_http" varchar DEFAULT 'HTTP {scheme}',
  	"auth_names_oauth2" varchar DEFAULT 'OAuth 2.0',
  	"auth_names_open_id_connect" varchar DEFAULT 'OpenID Connect',
  	"auth_names_api_key" varchar DEFAULT 'API key',
  	"auth_names_mutual_t_l_s" varchar DEFAULT 'Mutual TLS',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pb_dhero_v_actions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"style" "enum__pb_dhero_v_actions_style" DEFAULT 'primary',
  	"size" "enum__pb_dhero_v_actions_size" DEFAULT 'default',
  	"icon" "enum__pb_dhero_v_actions_icon",
  	"icon_position" "enum__pb_dhero_v_actions_icon_position" DEFAULT 'end',
  	"link_type" "enum__pb_dhero_v_actions_link_type" DEFAULT 'page',
  	"link_new_tab" boolean,
  	"link_page_id" integer,
  	"link_url" varchar,
  	"link_project_id" integer,
  	"link_project_target" "target" DEFAULT 'default',
  	"link_request_app" "app",
  	"link_anchor" varchar,
  	"link_download" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pb_dhero_v_preview_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"job" varchar,
  	"country" varchar,
  	"match" boolean,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pb_dhero_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"tag" varchar,
  	"tag_icon" "enum__pb_dhero_v_tag_icon",
  	"headline" varchar,
  	"highlight" varchar,
  	"intro" varchar,
  	"summary_show" boolean DEFAULT true,
  	"summary_users" varchar DEFAULT 'users',
  	"summary_countries" varchar DEFAULT 'countries',
  	"summary_interests" varchar DEFAULT 'interests',
  	"preview_query" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pb_udir_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading_title" varchar DEFAULT 'Users',
  	"heading_intro" varchar DEFAULT 'Browse, add and manage everyone in one place.',
  	"heading_add" varchar DEFAULT 'Add user',
  	"heading_add_hint" varchar DEFAULT 'Add user (N)',
  	"stats_users" varchar DEFAULT 'Users',
  	"stats_average_age" varchar DEFAULT 'Average age',
  	"stats_countries" varchar DEFAULT 'Countries',
  	"stats_top_interest" varchar DEFAULT 'Top interest',
  	"toolbar_search_placeholder" varchar DEFAULT 'Search by name, email, job, city, interest…',
  	"toolbar_search" varchar DEFAULT 'Search',
  	"toolbar_clear_search" varchar DEFAULT 'Clear search',
  	"toolbar_sort" varchar DEFAULT 'Sort users',
  	"toolbar_best_match" varchar DEFAULT 'Best match',
  	"toolbar_layout" varchar DEFAULT 'Layout',
  	"toolbar_cards" varchar DEFAULT 'Cards view',
  	"toolbar_table" varchar DEFAULT 'Table view',
  	"sorts_id_desc" varchar DEFAULT 'Recently added',
  	"sorts_id_asc" varchar DEFAULT 'First added',
  	"sorts_name_asc" varchar DEFAULT 'Name (A–Z)',
  	"sorts_name_desc" varchar DEFAULT 'Name (Z–A)',
  	"sorts_age_asc" varchar DEFAULT 'Age (youngest)',
  	"sorts_age_desc" varchar DEFAULT 'Age (oldest)',
  	"sorts_country_asc" varchar DEFAULT 'Country (A–Z)',
  	"sorts_country_desc" varchar DEFAULT 'Country (Z–A)',
  	"filters_button" varchar DEFAULT 'Filters',
  	"filters_title" varchar DEFAULT 'Filters',
  	"filters_clear_all" varchar DEFAULT 'Clear all',
  	"filters_country" varchar DEFAULT 'Country',
  	"filters_any_country" varchar DEFAULT 'Any country',
  	"filters_age" varchar DEFAULT 'Age',
  	"filters_any_age" varchar DEFAULT 'Any',
  	"filters_interests" varchar DEFAULT 'Interests',
  	"filters_match_all" varchar DEFAULT 'Match all selected',
  	"filters_show_one" varchar DEFAULT 'Show {count} user',
  	"filters_show_many" varchar DEFAULT 'Show {count} users',
  	"filters_active_country" varchar DEFAULT 'Country: {value}',
  	"filters_active_age" varchar DEFAULT 'Age: {value}',
  	"filters_remove" varchar DEFAULT 'Remove filter {label}',
  	"results_name" varchar DEFAULT 'Name',
  	"results_age" varchar DEFAULT 'Age',
  	"results_country" varchar DEFAULT 'Country',
  	"results_interests" varchar DEFAULT 'Interests',
  	"results_actions" varchar DEFAULT 'Actions',
  	"results_years_old" varchar DEFAULT '{age} years old',
  	"results_edit" varchar DEFAULT 'Edit',
  	"results_delete" varchar DEFAULT 'Delete',
  	"results_edit_user" varchar DEFAULT 'Edit {name}',
  	"results_delete_user" varchar DEFAULT 'Delete {name}',
  	"empty_no_users_title" varchar DEFAULT 'No users yet',
  	"empty_no_users_body" varchar DEFAULT 'Add your first user to get started.',
  	"empty_no_match_search" varchar DEFAULT 'No one matches “{search}”',
  	"empty_no_match_filters" varchar DEFAULT 'No one matches these filters',
  	"empty_no_match_body" varchar DEFAULT 'Try fewer words, a different spelling, or removing a filter.',
  	"empty_clear" varchar DEFAULT 'Clear search and filters',
  	"pagination_nav" varchar DEFAULT 'Pagination',
  	"pagination_showing" varchar DEFAULT 'Showing',
  	"pagination_of" varchar DEFAULT 'of',
  	"pagination_previous" varchar DEFAULT 'Previous page',
  	"pagination_next" varchar DEFAULT 'Next page',
  	"pagination_page" varchar DEFAULT 'Page {page}',
  	"pagination_per_page" varchar DEFAULT 'Per page',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pb_uprof_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"labels_back" varchar DEFAULT 'All users',
  	"labels_years_old" varchar DEFAULT '{age} years old',
  	"labels_email" varchar DEFAULT 'Email',
  	"labels_phone" varchar DEFAULT 'Phone',
  	"labels_location" varchar DEFAULT 'Location',
  	"labels_job_title" varchar DEFAULT 'Job title',
  	"labels_member_since" varchar DEFAULT 'Member since',
  	"labels_last_updated" varchar DEFAULT 'Last updated',
  	"labels_not_provided" varchar DEFAULT 'Not provided',
  	"labels_interests" varchar DEFAULT 'Interests',
  	"labels_edit" varchar DEFAULT 'Edit',
  	"labels_delete" varchar DEFAULT 'Delete',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_version_breadcrumbs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"doc_id" integer,
  	"url" varchar,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_site_id" integer,
  	"version_title" varchar,
  	"version_nav_label" varchar,
  	"version_icon" "enum__pages_v_version_icon",
  	"version_card_label" varchar,
  	"version_summary" varchar,
  	"version_path" varchar,
  	"version_width" "enum__pages_v_version_width" DEFAULT 'wide',
  	"version_backdrop" "enum__pages_v_version_backdrop" DEFAULT 'none',
  	"version_in_sitemap" boolean DEFAULT true,
  	"version_parent_id" integer,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__pages_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_pages_v_texts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "_pages_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric
  );
  
  CREATE TABLE "projects" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"_order" varchar,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"address" "enum_projects_address" NOT NULL,
  	"fallback_url" varchar NOT NULL,
  	"cta" varchar,
  	"source" varchar NOT NULL,
  	"page_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "projects_texts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "_projects_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version__order" varchar,
  	"version_title" varchar NOT NULL,
  	"version_description" varchar NOT NULL,
  	"version_address" "enum__projects_v_version_address" NOT NULL,
  	"version_fallback_url" varchar NOT NULL,
  	"version_cta" varchar,
  	"version_source" varchar NOT NULL,
  	"version_page_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "_projects_v_texts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"email" varchar NOT NULL,
  	"role" "enum_users_role" DEFAULT 'viewer' NOT NULL,
  	"sub" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"sites_id" integer,
  	"pages_id" integer,
  	"media_id" integer,
  	"projects_id" integer,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "sites_header_nav" ADD CONSTRAINT "sites_header_nav_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "sites_header_nav" ADD CONSTRAINT "sites_header_nav_link_project_id_projects_id_fk" FOREIGN KEY ("link_project_id") REFERENCES "public"."projects"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "sites_header_nav" ADD CONSTRAINT "sites_header_nav_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sites"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sites_footer_groups_links" ADD CONSTRAINT "sites_footer_groups_links_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "sites_footer_groups_links" ADD CONSTRAINT "sites_footer_groups_links_link_project_id_projects_id_fk" FOREIGN KEY ("link_project_id") REFERENCES "public"."projects"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "sites_footer_groups_links" ADD CONSTRAINT "sites_footer_groups_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sites_footer_groups"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sites_footer_groups" ADD CONSTRAINT "sites_footer_groups_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sites"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sites_footer_legal" ADD CONSTRAINT "sites_footer_legal_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "sites_footer_legal" ADD CONSTRAINT "sites_footer_legal_link_project_id_projects_id_fk" FOREIGN KEY ("link_project_id") REFERENCES "public"."projects"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "sites_footer_legal" ADD CONSTRAINT "sites_footer_legal_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sites"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sites_texts" ADD CONSTRAINT "sites_texts_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."sites"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_sites_v_version_header_nav" ADD CONSTRAINT "_sites_v_version_header_nav_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_sites_v_version_header_nav" ADD CONSTRAINT "_sites_v_version_header_nav_link_project_id_projects_id_fk" FOREIGN KEY ("link_project_id") REFERENCES "public"."projects"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_sites_v_version_header_nav" ADD CONSTRAINT "_sites_v_version_header_nav_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_sites_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_sites_v_version_footer_groups_links" ADD CONSTRAINT "_sites_v_version_footer_groups_links_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_sites_v_version_footer_groups_links" ADD CONSTRAINT "_sites_v_version_footer_groups_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_sites_v_version_footer_groups"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_sites_v_version_footer_groups_links" ADD CONSTRAINT "_sites_v_version_footer_groups_links_link_project_i_b112b635_fk" FOREIGN KEY ("link_project_id") REFERENCES "public"."projects"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_sites_v_version_footer_groups" ADD CONSTRAINT "_sites_v_version_footer_groups_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_sites_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_sites_v_version_footer_legal" ADD CONSTRAINT "_sites_v_version_footer_legal_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_sites_v_version_footer_legal" ADD CONSTRAINT "_sites_v_version_footer_legal_link_project_id_projects_id_fk" FOREIGN KEY ("link_project_id") REFERENCES "public"."projects"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_sites_v_version_footer_legal" ADD CONSTRAINT "_sites_v_version_footer_legal_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_sites_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_sites_v" ADD CONSTRAINT "_sites_v_parent_id_sites_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."sites"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_sites_v_texts" ADD CONSTRAINT "_sites_v_texts_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_sites_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pb_phead_actions" ADD CONSTRAINT "pb_phead_actions_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pb_phead_actions" ADD CONSTRAINT "pb_phead_actions_link_project_id_projects_id_fk" FOREIGN KEY ("link_project_id") REFERENCES "public"."projects"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pb_phead_actions" ADD CONSTRAINT "pb_phead_actions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pb_phead"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pb_phead" ADD CONSTRAINT "pb_phead_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pb_lhead" ADD CONSTRAINT "pb_lhead_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pb_text_actions" ADD CONSTRAINT "pb_text_actions_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pb_text_actions" ADD CONSTRAINT "pb_text_actions_link_project_id_projects_id_fk" FOREIGN KEY ("link_project_id") REFERENCES "public"."projects"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pb_text_actions" ADD CONSTRAINT "pb_text_actions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pb_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pb_text" ADD CONSTRAINT "pb_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pb_img" ADD CONSTRAINT "pb_img_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pb_img" ADD CONSTRAINT "pb_img_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pb_imgtxt_actions" ADD CONSTRAINT "pb_imgtxt_actions_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pb_imgtxt_actions" ADD CONSTRAINT "pb_imgtxt_actions_link_project_id_projects_id_fk" FOREIGN KEY ("link_project_id") REFERENCES "public"."projects"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pb_imgtxt_actions" ADD CONSTRAINT "pb_imgtxt_actions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pb_imgtxt"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pb_imgtxt" ADD CONSTRAINT "pb_imgtxt_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pb_imgtxt" ADD CONSTRAINT "pb_imgtxt_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pb_cols_columns" ADD CONSTRAINT "pb_cols_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pb_cols"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pb_cols" ADD CONSTRAINT "pb_cols_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pb_txt" ADD CONSTRAINT "pb_txt_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pb_btns_actions" ADD CONSTRAINT "pb_btns_actions_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pb_btns_actions" ADD CONSTRAINT "pb_btns_actions_link_project_id_projects_id_fk" FOREIGN KEY ("link_project_id") REFERENCES "public"."projects"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pb_btns_actions" ADD CONSTRAINT "pb_btns_actions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pb_btns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pb_btns" ADD CONSTRAINT "pb_btns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pb_grid_items" ADD CONSTRAINT "pb_grid_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pb_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pb_grid" ADD CONSTRAINT "pb_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pb_tl_steps" ADD CONSTRAINT "pb_tl_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pb_tl"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pb_tl" ADD CONSTRAINT "pb_tl_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pb_cta_actions" ADD CONSTRAINT "pb_cta_actions_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pb_cta_actions" ADD CONSTRAINT "pb_cta_actions_link_project_id_projects_id_fk" FOREIGN KEY ("link_project_id") REFERENCES "public"."projects"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pb_cta_actions" ADD CONSTRAINT "pb_cta_actions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pb_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pb_cta" ADD CONSTRAINT "pb_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pb_hero_actions" ADD CONSTRAINT "pb_hero_actions_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pb_hero_actions" ADD CONSTRAINT "pb_hero_actions_link_project_id_projects_id_fk" FOREIGN KEY ("link_project_id") REFERENCES "public"."projects"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pb_hero_actions" ADD CONSTRAINT "pb_hero_actions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pb_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pb_hero" ADD CONSTRAINT "pb_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pb_cards" ADD CONSTRAINT "pb_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pb_lcards_items" ADD CONSTRAINT "pb_lcards_items_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pb_lcards_items" ADD CONSTRAINT "pb_lcards_items_link_project_id_projects_id_fk" FOREIGN KEY ("link_project_id") REFERENCES "public"."projects"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pb_lcards_items" ADD CONSTRAINT "pb_lcards_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pb_lcards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pb_lcards" ADD CONSTRAINT "pb_lcards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pb_teaser" ADD CONSTRAINT "pb_teaser_page_id_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pb_teaser" ADD CONSTRAINT "pb_teaser_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pb_projects_coming_next_items" ADD CONSTRAINT "pb_projects_coming_next_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pb_projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pb_projects" ADD CONSTRAINT "pb_projects_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pb_pteaser_highlights" ADD CONSTRAINT "pb_pteaser_highlights_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pb_pteaser"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pb_pteaser" ADD CONSTRAINT "pb_pteaser_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pb_pteaser" ADD CONSTRAINT "pb_pteaser_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pb_map_apps" ADD CONSTRAINT "pb_map_apps_page_id_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pb_map_apps" ADD CONSTRAINT "pb_map_apps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pb_map"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pb_map" ADD CONSTRAINT "pb_map_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pb_stack_pipeline" ADD CONSTRAINT "pb_stack_pipeline_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pb_stack"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pb_stack_pieces" ADD CONSTRAINT "pb_stack_pieces_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pb_stack"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pb_stack_tool_groups_tools" ADD CONSTRAINT "pb_stack_tool_groups_tools_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pb_stack_tool_groups"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pb_stack_tool_groups" ADD CONSTRAINT "pb_stack_tool_groups_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pb_stack"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pb_stack" ADD CONSTRAINT "pb_stack_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pb_flows_rows_steps" ADD CONSTRAINT "pb_flows_rows_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pb_flows_rows"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pb_flows_rows" ADD CONSTRAINT "pb_flows_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pb_flows"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pb_flows" ADD CONSTRAINT "pb_flows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pb_access_rows" ADD CONSTRAINT "pb_access_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pb_access"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pb_access" ADD CONSTRAINT "pb_access_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pb_addr_items" ADD CONSTRAINT "pb_addr_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pb_addr"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pb_addr" ADD CONSTRAINT "pb_addr_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pb_senders_senders" ADD CONSTRAINT "pb_senders_senders_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pb_senders"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pb_senders" ADD CONSTRAINT "pb_senders_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pb_theme" ADD CONSTRAINT "pb_theme_preview_components_link_page_id_pages_id_fk" FOREIGN KEY ("preview_components_link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pb_theme" ADD CONSTRAINT "pb_theme_preview_components_link_project_id_projects_id_fk" FOREIGN KEY ("preview_components_link_project_id") REFERENCES "public"."projects"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pb_theme" ADD CONSTRAINT "pb_theme_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pb_apiref_points" ADD CONSTRAINT "pb_apiref_points_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pb_apiref"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pb_apiref" ADD CONSTRAINT "pb_apiref_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pb_apiref" ADD CONSTRAINT "pb_apiref_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pb_dhero_actions" ADD CONSTRAINT "pb_dhero_actions_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pb_dhero_actions" ADD CONSTRAINT "pb_dhero_actions_link_project_id_projects_id_fk" FOREIGN KEY ("link_project_id") REFERENCES "public"."projects"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pb_dhero_actions" ADD CONSTRAINT "pb_dhero_actions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pb_dhero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pb_dhero_preview_rows" ADD CONSTRAINT "pb_dhero_preview_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pb_dhero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pb_dhero" ADD CONSTRAINT "pb_dhero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pb_udir" ADD CONSTRAINT "pb_udir_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pb_uprof" ADD CONSTRAINT "pb_uprof_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_breadcrumbs" ADD CONSTRAINT "pages_breadcrumbs_doc_id_pages_id_fk" FOREIGN KEY ("doc_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_breadcrumbs" ADD CONSTRAINT "pages_breadcrumbs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_site_id_sites_id_fk" FOREIGN KEY ("site_id") REFERENCES "public"."sites"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_parent_id_pages_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_texts" ADD CONSTRAINT "pages_texts_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pb_phead_v_actions" ADD CONSTRAINT "_pb_phead_v_actions_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pb_phead_v_actions" ADD CONSTRAINT "_pb_phead_v_actions_link_project_id_projects_id_fk" FOREIGN KEY ("link_project_id") REFERENCES "public"."projects"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pb_phead_v_actions" ADD CONSTRAINT "_pb_phead_v_actions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pb_phead_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pb_phead_v" ADD CONSTRAINT "_pb_phead_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pb_lhead_v" ADD CONSTRAINT "_pb_lhead_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pb_text_v_actions" ADD CONSTRAINT "_pb_text_v_actions_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pb_text_v_actions" ADD CONSTRAINT "_pb_text_v_actions_link_project_id_projects_id_fk" FOREIGN KEY ("link_project_id") REFERENCES "public"."projects"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pb_text_v_actions" ADD CONSTRAINT "_pb_text_v_actions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pb_text_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pb_text_v" ADD CONSTRAINT "_pb_text_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pb_img_v" ADD CONSTRAINT "_pb_img_v_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pb_img_v" ADD CONSTRAINT "_pb_img_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pb_imgtxt_v_actions" ADD CONSTRAINT "_pb_imgtxt_v_actions_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pb_imgtxt_v_actions" ADD CONSTRAINT "_pb_imgtxt_v_actions_link_project_id_projects_id_fk" FOREIGN KEY ("link_project_id") REFERENCES "public"."projects"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pb_imgtxt_v_actions" ADD CONSTRAINT "_pb_imgtxt_v_actions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pb_imgtxt_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pb_imgtxt_v" ADD CONSTRAINT "_pb_imgtxt_v_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pb_imgtxt_v" ADD CONSTRAINT "_pb_imgtxt_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pb_cols_v_columns" ADD CONSTRAINT "_pb_cols_v_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pb_cols_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pb_cols_v" ADD CONSTRAINT "_pb_cols_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pb_txt_v" ADD CONSTRAINT "_pb_txt_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pb_btns_v_actions" ADD CONSTRAINT "_pb_btns_v_actions_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pb_btns_v_actions" ADD CONSTRAINT "_pb_btns_v_actions_link_project_id_projects_id_fk" FOREIGN KEY ("link_project_id") REFERENCES "public"."projects"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pb_btns_v_actions" ADD CONSTRAINT "_pb_btns_v_actions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pb_btns_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pb_btns_v" ADD CONSTRAINT "_pb_btns_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pb_grid_v_items" ADD CONSTRAINT "_pb_grid_v_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pb_grid_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pb_grid_v" ADD CONSTRAINT "_pb_grid_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pb_tl_v_steps" ADD CONSTRAINT "_pb_tl_v_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pb_tl_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pb_tl_v" ADD CONSTRAINT "_pb_tl_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pb_cta_v_actions" ADD CONSTRAINT "_pb_cta_v_actions_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pb_cta_v_actions" ADD CONSTRAINT "_pb_cta_v_actions_link_project_id_projects_id_fk" FOREIGN KEY ("link_project_id") REFERENCES "public"."projects"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pb_cta_v_actions" ADD CONSTRAINT "_pb_cta_v_actions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pb_cta_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pb_cta_v" ADD CONSTRAINT "_pb_cta_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pb_hero_v_actions" ADD CONSTRAINT "_pb_hero_v_actions_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pb_hero_v_actions" ADD CONSTRAINT "_pb_hero_v_actions_link_project_id_projects_id_fk" FOREIGN KEY ("link_project_id") REFERENCES "public"."projects"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pb_hero_v_actions" ADD CONSTRAINT "_pb_hero_v_actions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pb_hero_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pb_hero_v" ADD CONSTRAINT "_pb_hero_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pb_cards_v" ADD CONSTRAINT "_pb_cards_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pb_lcards_v_items" ADD CONSTRAINT "_pb_lcards_v_items_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pb_lcards_v_items" ADD CONSTRAINT "_pb_lcards_v_items_link_project_id_projects_id_fk" FOREIGN KEY ("link_project_id") REFERENCES "public"."projects"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pb_lcards_v_items" ADD CONSTRAINT "_pb_lcards_v_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pb_lcards_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pb_lcards_v" ADD CONSTRAINT "_pb_lcards_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pb_teaser_v" ADD CONSTRAINT "_pb_teaser_v_page_id_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pb_teaser_v" ADD CONSTRAINT "_pb_teaser_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pb_projects_v_coming_next_items" ADD CONSTRAINT "_pb_projects_v_coming_next_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pb_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pb_projects_v" ADD CONSTRAINT "_pb_projects_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pb_pteaser_v_highlights" ADD CONSTRAINT "_pb_pteaser_v_highlights_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pb_pteaser_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pb_pteaser_v" ADD CONSTRAINT "_pb_pteaser_v_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pb_pteaser_v" ADD CONSTRAINT "_pb_pteaser_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pb_map_v_apps" ADD CONSTRAINT "_pb_map_v_apps_page_id_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pb_map_v_apps" ADD CONSTRAINT "_pb_map_v_apps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pb_map_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pb_map_v" ADD CONSTRAINT "_pb_map_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pb_stack_v_pipeline" ADD CONSTRAINT "_pb_stack_v_pipeline_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pb_stack_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pb_stack_v_pieces" ADD CONSTRAINT "_pb_stack_v_pieces_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pb_stack_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pb_stack_v_tool_groups_tools" ADD CONSTRAINT "_pb_stack_v_tool_groups_tools_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pb_stack_v_tool_groups"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pb_stack_v_tool_groups" ADD CONSTRAINT "_pb_stack_v_tool_groups_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pb_stack_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pb_stack_v" ADD CONSTRAINT "_pb_stack_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pb_flows_v_rows_steps" ADD CONSTRAINT "_pb_flows_v_rows_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pb_flows_v_rows"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pb_flows_v_rows" ADD CONSTRAINT "_pb_flows_v_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pb_flows_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pb_flows_v" ADD CONSTRAINT "_pb_flows_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pb_access_v_rows" ADD CONSTRAINT "_pb_access_v_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pb_access_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pb_access_v" ADD CONSTRAINT "_pb_access_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pb_addr_v_items" ADD CONSTRAINT "_pb_addr_v_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pb_addr_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pb_addr_v" ADD CONSTRAINT "_pb_addr_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pb_senders_v_senders" ADD CONSTRAINT "_pb_senders_v_senders_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pb_senders_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pb_senders_v" ADD CONSTRAINT "_pb_senders_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pb_theme_v" ADD CONSTRAINT "_pb_theme_v_preview_components_link_page_id_pages_id_fk" FOREIGN KEY ("preview_components_link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pb_theme_v" ADD CONSTRAINT "_pb_theme_v_preview_components_link_project_id_projects_id_fk" FOREIGN KEY ("preview_components_link_project_id") REFERENCES "public"."projects"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pb_theme_v" ADD CONSTRAINT "_pb_theme_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pb_apiref_v_points" ADD CONSTRAINT "_pb_apiref_v_points_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pb_apiref_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pb_apiref_v" ADD CONSTRAINT "_pb_apiref_v_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pb_apiref_v" ADD CONSTRAINT "_pb_apiref_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pb_dhero_v_actions" ADD CONSTRAINT "_pb_dhero_v_actions_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pb_dhero_v_actions" ADD CONSTRAINT "_pb_dhero_v_actions_link_project_id_projects_id_fk" FOREIGN KEY ("link_project_id") REFERENCES "public"."projects"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pb_dhero_v_actions" ADD CONSTRAINT "_pb_dhero_v_actions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pb_dhero_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pb_dhero_v_preview_rows" ADD CONSTRAINT "_pb_dhero_v_preview_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pb_dhero_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pb_dhero_v" ADD CONSTRAINT "_pb_dhero_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pb_udir_v" ADD CONSTRAINT "_pb_udir_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pb_uprof_v" ADD CONSTRAINT "_pb_uprof_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_version_breadcrumbs" ADD CONSTRAINT "_pages_v_version_breadcrumbs_doc_id_pages_id_fk" FOREIGN KEY ("doc_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_version_breadcrumbs" ADD CONSTRAINT "_pages_v_version_breadcrumbs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_parent_id_pages_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_site_id_sites_id_fk" FOREIGN KEY ("version_site_id") REFERENCES "public"."sites"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_parent_id_pages_id_fk" FOREIGN KEY ("version_parent_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_texts" ADD CONSTRAINT "_pages_v_texts_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects" ADD CONSTRAINT "projects_page_id_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_texts" ADD CONSTRAINT "projects_texts_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v" ADD CONSTRAINT "_projects_v_parent_id_projects_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."projects"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v" ADD CONSTRAINT "_projects_v_version_page_id_pages_id_fk" FOREIGN KEY ("version_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v_texts" ADD CONSTRAINT "_projects_v_texts_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_sites_fk" FOREIGN KEY ("sites_id") REFERENCES "public"."sites"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_projects_fk" FOREIGN KEY ("projects_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "sites_header_nav_order_idx" ON "sites_header_nav" USING btree ("_order");
  CREATE INDEX "sites_header_nav_parent_id_idx" ON "sites_header_nav" USING btree ("_parent_id");
  CREATE INDEX "sites_header_nav_link_link_page_idx" ON "sites_header_nav" USING btree ("link_page_id");
  CREATE INDEX "sites_header_nav_link_link_project_idx" ON "sites_header_nav" USING btree ("link_project_id");
  CREATE INDEX "sites_footer_groups_links_order_idx" ON "sites_footer_groups_links" USING btree ("_order");
  CREATE INDEX "sites_footer_groups_links_parent_id_idx" ON "sites_footer_groups_links" USING btree ("_parent_id");
  CREATE INDEX "sites_footer_groups_links_link_link_page_idx" ON "sites_footer_groups_links" USING btree ("link_page_id");
  CREATE INDEX "sites_footer_groups_links_link_link_project_idx" ON "sites_footer_groups_links" USING btree ("link_project_id");
  CREATE INDEX "sites_footer_groups_order_idx" ON "sites_footer_groups" USING btree ("_order");
  CREATE INDEX "sites_footer_groups_parent_id_idx" ON "sites_footer_groups" USING btree ("_parent_id");
  CREATE INDEX "sites_footer_legal_order_idx" ON "sites_footer_legal" USING btree ("_order");
  CREATE INDEX "sites_footer_legal_parent_id_idx" ON "sites_footer_legal" USING btree ("_parent_id");
  CREATE INDEX "sites_footer_legal_link_link_page_idx" ON "sites_footer_legal" USING btree ("link_page_id");
  CREATE INDEX "sites_footer_legal_link_link_project_idx" ON "sites_footer_legal" USING btree ("link_project_id");
  CREATE UNIQUE INDEX "sites_slug_idx" ON "sites" USING btree ("slug");
  CREATE INDEX "sites_updated_at_idx" ON "sites" USING btree ("updated_at");
  CREATE INDEX "sites_created_at_idx" ON "sites" USING btree ("created_at");
  CREATE INDEX "sites_texts_order_parent" ON "sites_texts" USING btree ("order","parent_id");
  CREATE INDEX "_sites_v_version_header_nav_order_idx" ON "_sites_v_version_header_nav" USING btree ("_order");
  CREATE INDEX "_sites_v_version_header_nav_parent_id_idx" ON "_sites_v_version_header_nav" USING btree ("_parent_id");
  CREATE INDEX "_sites_v_version_header_nav_link_link_page_idx" ON "_sites_v_version_header_nav" USING btree ("link_page_id");
  CREATE INDEX "_sites_v_version_header_nav_link_link_project_idx" ON "_sites_v_version_header_nav" USING btree ("link_project_id");
  CREATE INDEX "_sites_v_version_footer_groups_links_order_idx" ON "_sites_v_version_footer_groups_links" USING btree ("_order");
  CREATE INDEX "_sites_v_version_footer_groups_links_parent_id_idx" ON "_sites_v_version_footer_groups_links" USING btree ("_parent_id");
  CREATE INDEX "_sites_v_version_footer_groups_links_link_link_page_idx" ON "_sites_v_version_footer_groups_links" USING btree ("link_page_id");
  CREATE INDEX "_sites_v_version_footer_groups_links_link_link_project_idx" ON "_sites_v_version_footer_groups_links" USING btree ("link_project_id");
  CREATE INDEX "_sites_v_version_footer_groups_order_idx" ON "_sites_v_version_footer_groups" USING btree ("_order");
  CREATE INDEX "_sites_v_version_footer_groups_parent_id_idx" ON "_sites_v_version_footer_groups" USING btree ("_parent_id");
  CREATE INDEX "_sites_v_version_footer_legal_order_idx" ON "_sites_v_version_footer_legal" USING btree ("_order");
  CREATE INDEX "_sites_v_version_footer_legal_parent_id_idx" ON "_sites_v_version_footer_legal" USING btree ("_parent_id");
  CREATE INDEX "_sites_v_version_footer_legal_link_link_page_idx" ON "_sites_v_version_footer_legal" USING btree ("link_page_id");
  CREATE INDEX "_sites_v_version_footer_legal_link_link_project_idx" ON "_sites_v_version_footer_legal" USING btree ("link_project_id");
  CREATE INDEX "_sites_v_parent_idx" ON "_sites_v" USING btree ("parent_id");
  CREATE INDEX "_sites_v_version_version_slug_idx" ON "_sites_v" USING btree ("version_slug");
  CREATE INDEX "_sites_v_version_version_updated_at_idx" ON "_sites_v" USING btree ("version_updated_at");
  CREATE INDEX "_sites_v_version_version_created_at_idx" ON "_sites_v" USING btree ("version_created_at");
  CREATE INDEX "_sites_v_created_at_idx" ON "_sites_v" USING btree ("created_at");
  CREATE INDEX "_sites_v_updated_at_idx" ON "_sites_v" USING btree ("updated_at");
  CREATE INDEX "_sites_v_texts_order_parent" ON "_sites_v_texts" USING btree ("order","parent_id");
  CREATE INDEX "pb_phead_actions_order_idx" ON "pb_phead_actions" USING btree ("_order");
  CREATE INDEX "pb_phead_actions_parent_id_idx" ON "pb_phead_actions" USING btree ("_parent_id");
  CREATE INDEX "pb_phead_actions_link_link_page_idx" ON "pb_phead_actions" USING btree ("link_page_id");
  CREATE INDEX "pb_phead_actions_link_link_project_idx" ON "pb_phead_actions" USING btree ("link_project_id");
  CREATE INDEX "pb_phead_order_idx" ON "pb_phead" USING btree ("_order");
  CREATE INDEX "pb_phead_parent_id_idx" ON "pb_phead" USING btree ("_parent_id");
  CREATE INDEX "pb_phead_path_idx" ON "pb_phead" USING btree ("_path");
  CREATE INDEX "pb_lhead_order_idx" ON "pb_lhead" USING btree ("_order");
  CREATE INDEX "pb_lhead_parent_id_idx" ON "pb_lhead" USING btree ("_parent_id");
  CREATE INDEX "pb_lhead_path_idx" ON "pb_lhead" USING btree ("_path");
  CREATE INDEX "pb_text_actions_order_idx" ON "pb_text_actions" USING btree ("_order");
  CREATE INDEX "pb_text_actions_parent_id_idx" ON "pb_text_actions" USING btree ("_parent_id");
  CREATE INDEX "pb_text_actions_link_link_page_idx" ON "pb_text_actions" USING btree ("link_page_id");
  CREATE INDEX "pb_text_actions_link_link_project_idx" ON "pb_text_actions" USING btree ("link_project_id");
  CREATE INDEX "pb_text_order_idx" ON "pb_text" USING btree ("_order");
  CREATE INDEX "pb_text_parent_id_idx" ON "pb_text" USING btree ("_parent_id");
  CREATE INDEX "pb_text_path_idx" ON "pb_text" USING btree ("_path");
  CREATE INDEX "pb_img_order_idx" ON "pb_img" USING btree ("_order");
  CREATE INDEX "pb_img_parent_id_idx" ON "pb_img" USING btree ("_parent_id");
  CREATE INDEX "pb_img_path_idx" ON "pb_img" USING btree ("_path");
  CREATE INDEX "pb_img_image_idx" ON "pb_img" USING btree ("image_id");
  CREATE INDEX "pb_imgtxt_actions_order_idx" ON "pb_imgtxt_actions" USING btree ("_order");
  CREATE INDEX "pb_imgtxt_actions_parent_id_idx" ON "pb_imgtxt_actions" USING btree ("_parent_id");
  CREATE INDEX "pb_imgtxt_actions_link_link_page_idx" ON "pb_imgtxt_actions" USING btree ("link_page_id");
  CREATE INDEX "pb_imgtxt_actions_link_link_project_idx" ON "pb_imgtxt_actions" USING btree ("link_project_id");
  CREATE INDEX "pb_imgtxt_order_idx" ON "pb_imgtxt" USING btree ("_order");
  CREATE INDEX "pb_imgtxt_parent_id_idx" ON "pb_imgtxt" USING btree ("_parent_id");
  CREATE INDEX "pb_imgtxt_path_idx" ON "pb_imgtxt" USING btree ("_path");
  CREATE INDEX "pb_imgtxt_image_idx" ON "pb_imgtxt" USING btree ("image_id");
  CREATE INDEX "pb_cols_columns_order_idx" ON "pb_cols_columns" USING btree ("_order");
  CREATE INDEX "pb_cols_columns_parent_id_idx" ON "pb_cols_columns" USING btree ("_parent_id");
  CREATE INDEX "pb_cols_order_idx" ON "pb_cols" USING btree ("_order");
  CREATE INDEX "pb_cols_parent_id_idx" ON "pb_cols" USING btree ("_parent_id");
  CREATE INDEX "pb_cols_path_idx" ON "pb_cols" USING btree ("_path");
  CREATE INDEX "pb_txt_order_idx" ON "pb_txt" USING btree ("_order");
  CREATE INDEX "pb_txt_parent_id_idx" ON "pb_txt" USING btree ("_parent_id");
  CREATE INDEX "pb_txt_path_idx" ON "pb_txt" USING btree ("_path");
  CREATE INDEX "pb_btns_actions_order_idx" ON "pb_btns_actions" USING btree ("_order");
  CREATE INDEX "pb_btns_actions_parent_id_idx" ON "pb_btns_actions" USING btree ("_parent_id");
  CREATE INDEX "pb_btns_actions_link_link_page_idx" ON "pb_btns_actions" USING btree ("link_page_id");
  CREATE INDEX "pb_btns_actions_link_link_project_idx" ON "pb_btns_actions" USING btree ("link_project_id");
  CREATE INDEX "pb_btns_order_idx" ON "pb_btns" USING btree ("_order");
  CREATE INDEX "pb_btns_parent_id_idx" ON "pb_btns" USING btree ("_parent_id");
  CREATE INDEX "pb_btns_path_idx" ON "pb_btns" USING btree ("_path");
  CREATE INDEX "pb_grid_items_order_idx" ON "pb_grid_items" USING btree ("_order");
  CREATE INDEX "pb_grid_items_parent_id_idx" ON "pb_grid_items" USING btree ("_parent_id");
  CREATE INDEX "pb_grid_order_idx" ON "pb_grid" USING btree ("_order");
  CREATE INDEX "pb_grid_parent_id_idx" ON "pb_grid" USING btree ("_parent_id");
  CREATE INDEX "pb_grid_path_idx" ON "pb_grid" USING btree ("_path");
  CREATE INDEX "pb_tl_steps_order_idx" ON "pb_tl_steps" USING btree ("_order");
  CREATE INDEX "pb_tl_steps_parent_id_idx" ON "pb_tl_steps" USING btree ("_parent_id");
  CREATE INDEX "pb_tl_order_idx" ON "pb_tl" USING btree ("_order");
  CREATE INDEX "pb_tl_parent_id_idx" ON "pb_tl" USING btree ("_parent_id");
  CREATE INDEX "pb_tl_path_idx" ON "pb_tl" USING btree ("_path");
  CREATE INDEX "pb_cta_actions_order_idx" ON "pb_cta_actions" USING btree ("_order");
  CREATE INDEX "pb_cta_actions_parent_id_idx" ON "pb_cta_actions" USING btree ("_parent_id");
  CREATE INDEX "pb_cta_actions_link_link_page_idx" ON "pb_cta_actions" USING btree ("link_page_id");
  CREATE INDEX "pb_cta_actions_link_link_project_idx" ON "pb_cta_actions" USING btree ("link_project_id");
  CREATE INDEX "pb_cta_order_idx" ON "pb_cta" USING btree ("_order");
  CREATE INDEX "pb_cta_parent_id_idx" ON "pb_cta" USING btree ("_parent_id");
  CREATE INDEX "pb_cta_path_idx" ON "pb_cta" USING btree ("_path");
  CREATE INDEX "pb_hero_actions_order_idx" ON "pb_hero_actions" USING btree ("_order");
  CREATE INDEX "pb_hero_actions_parent_id_idx" ON "pb_hero_actions" USING btree ("_parent_id");
  CREATE INDEX "pb_hero_actions_link_link_page_idx" ON "pb_hero_actions" USING btree ("link_page_id");
  CREATE INDEX "pb_hero_actions_link_link_project_idx" ON "pb_hero_actions" USING btree ("link_project_id");
  CREATE INDEX "pb_hero_order_idx" ON "pb_hero" USING btree ("_order");
  CREATE INDEX "pb_hero_parent_id_idx" ON "pb_hero" USING btree ("_parent_id");
  CREATE INDEX "pb_hero_path_idx" ON "pb_hero" USING btree ("_path");
  CREATE INDEX "pb_cards_order_idx" ON "pb_cards" USING btree ("_order");
  CREATE INDEX "pb_cards_parent_id_idx" ON "pb_cards" USING btree ("_parent_id");
  CREATE INDEX "pb_cards_path_idx" ON "pb_cards" USING btree ("_path");
  CREATE INDEX "pb_lcards_items_order_idx" ON "pb_lcards_items" USING btree ("_order");
  CREATE INDEX "pb_lcards_items_parent_id_idx" ON "pb_lcards_items" USING btree ("_parent_id");
  CREATE INDEX "pb_lcards_items_link_link_page_idx" ON "pb_lcards_items" USING btree ("link_page_id");
  CREATE INDEX "pb_lcards_items_link_link_project_idx" ON "pb_lcards_items" USING btree ("link_project_id");
  CREATE INDEX "pb_lcards_order_idx" ON "pb_lcards" USING btree ("_order");
  CREATE INDEX "pb_lcards_parent_id_idx" ON "pb_lcards" USING btree ("_parent_id");
  CREATE INDEX "pb_lcards_path_idx" ON "pb_lcards" USING btree ("_path");
  CREATE INDEX "pb_teaser_order_idx" ON "pb_teaser" USING btree ("_order");
  CREATE INDEX "pb_teaser_parent_id_idx" ON "pb_teaser" USING btree ("_parent_id");
  CREATE INDEX "pb_teaser_path_idx" ON "pb_teaser" USING btree ("_path");
  CREATE INDEX "pb_teaser_page_idx" ON "pb_teaser" USING btree ("page_id");
  CREATE INDEX "pb_projects_coming_next_items_order_idx" ON "pb_projects_coming_next_items" USING btree ("_order");
  CREATE INDEX "pb_projects_coming_next_items_parent_id_idx" ON "pb_projects_coming_next_items" USING btree ("_parent_id");
  CREATE INDEX "pb_projects_order_idx" ON "pb_projects" USING btree ("_order");
  CREATE INDEX "pb_projects_parent_id_idx" ON "pb_projects" USING btree ("_parent_id");
  CREATE INDEX "pb_projects_path_idx" ON "pb_projects" USING btree ("_path");
  CREATE INDEX "pb_pteaser_highlights_order_idx" ON "pb_pteaser_highlights" USING btree ("_order");
  CREATE INDEX "pb_pteaser_highlights_parent_id_idx" ON "pb_pteaser_highlights" USING btree ("_parent_id");
  CREATE INDEX "pb_pteaser_order_idx" ON "pb_pteaser" USING btree ("_order");
  CREATE INDEX "pb_pteaser_parent_id_idx" ON "pb_pteaser" USING btree ("_parent_id");
  CREATE INDEX "pb_pteaser_path_idx" ON "pb_pteaser" USING btree ("_path");
  CREATE INDEX "pb_pteaser_link_page_idx" ON "pb_pteaser" USING btree ("link_page_id");
  CREATE INDEX "pb_map_apps_order_idx" ON "pb_map_apps" USING btree ("_order");
  CREATE INDEX "pb_map_apps_parent_id_idx" ON "pb_map_apps" USING btree ("_parent_id");
  CREATE INDEX "pb_map_apps_page_idx" ON "pb_map_apps" USING btree ("page_id");
  CREATE INDEX "pb_map_order_idx" ON "pb_map" USING btree ("_order");
  CREATE INDEX "pb_map_parent_id_idx" ON "pb_map" USING btree ("_parent_id");
  CREATE INDEX "pb_map_path_idx" ON "pb_map" USING btree ("_path");
  CREATE INDEX "pb_stack_pipeline_order_idx" ON "pb_stack_pipeline" USING btree ("_order");
  CREATE INDEX "pb_stack_pipeline_parent_id_idx" ON "pb_stack_pipeline" USING btree ("_parent_id");
  CREATE INDEX "pb_stack_pieces_order_idx" ON "pb_stack_pieces" USING btree ("_order");
  CREATE INDEX "pb_stack_pieces_parent_id_idx" ON "pb_stack_pieces" USING btree ("_parent_id");
  CREATE INDEX "pb_stack_tool_groups_tools_order_idx" ON "pb_stack_tool_groups_tools" USING btree ("_order");
  CREATE INDEX "pb_stack_tool_groups_tools_parent_id_idx" ON "pb_stack_tool_groups_tools" USING btree ("_parent_id");
  CREATE INDEX "pb_stack_tool_groups_order_idx" ON "pb_stack_tool_groups" USING btree ("_order");
  CREATE INDEX "pb_stack_tool_groups_parent_id_idx" ON "pb_stack_tool_groups" USING btree ("_parent_id");
  CREATE INDEX "pb_stack_order_idx" ON "pb_stack" USING btree ("_order");
  CREATE INDEX "pb_stack_parent_id_idx" ON "pb_stack" USING btree ("_parent_id");
  CREATE INDEX "pb_stack_path_idx" ON "pb_stack" USING btree ("_path");
  CREATE INDEX "pb_flows_rows_steps_order_idx" ON "pb_flows_rows_steps" USING btree ("_order");
  CREATE INDEX "pb_flows_rows_steps_parent_id_idx" ON "pb_flows_rows_steps" USING btree ("_parent_id");
  CREATE INDEX "pb_flows_rows_order_idx" ON "pb_flows_rows" USING btree ("_order");
  CREATE INDEX "pb_flows_rows_parent_id_idx" ON "pb_flows_rows" USING btree ("_parent_id");
  CREATE INDEX "pb_flows_order_idx" ON "pb_flows" USING btree ("_order");
  CREATE INDEX "pb_flows_parent_id_idx" ON "pb_flows" USING btree ("_parent_id");
  CREATE INDEX "pb_flows_path_idx" ON "pb_flows" USING btree ("_path");
  CREATE INDEX "pb_access_rows_order_idx" ON "pb_access_rows" USING btree ("_order");
  CREATE INDEX "pb_access_rows_parent_id_idx" ON "pb_access_rows" USING btree ("_parent_id");
  CREATE INDEX "pb_access_order_idx" ON "pb_access" USING btree ("_order");
  CREATE INDEX "pb_access_parent_id_idx" ON "pb_access" USING btree ("_parent_id");
  CREATE INDEX "pb_access_path_idx" ON "pb_access" USING btree ("_path");
  CREATE INDEX "pb_addr_items_order_idx" ON "pb_addr_items" USING btree ("_order");
  CREATE INDEX "pb_addr_items_parent_id_idx" ON "pb_addr_items" USING btree ("_parent_id");
  CREATE INDEX "pb_addr_order_idx" ON "pb_addr" USING btree ("_order");
  CREATE INDEX "pb_addr_parent_id_idx" ON "pb_addr" USING btree ("_parent_id");
  CREATE INDEX "pb_addr_path_idx" ON "pb_addr" USING btree ("_path");
  CREATE INDEX "pb_senders_senders_order_idx" ON "pb_senders_senders" USING btree ("_order");
  CREATE INDEX "pb_senders_senders_parent_id_idx" ON "pb_senders_senders" USING btree ("_parent_id");
  CREATE INDEX "pb_senders_order_idx" ON "pb_senders" USING btree ("_order");
  CREATE INDEX "pb_senders_parent_id_idx" ON "pb_senders" USING btree ("_parent_id");
  CREATE INDEX "pb_senders_path_idx" ON "pb_senders" USING btree ("_path");
  CREATE INDEX "pb_theme_order_idx" ON "pb_theme" USING btree ("_order");
  CREATE INDEX "pb_theme_parent_id_idx" ON "pb_theme" USING btree ("_parent_id");
  CREATE INDEX "pb_theme_path_idx" ON "pb_theme" USING btree ("_path");
  CREATE INDEX "pb_theme_preview_components_link_preview_components_link_idx" ON "pb_theme" USING btree ("preview_components_link_page_id");
  CREATE INDEX "pb_theme_preview_components_link_preview_components_li_1_idx" ON "pb_theme" USING btree ("preview_components_link_project_id");
  CREATE INDEX "pb_apiref_points_order_idx" ON "pb_apiref_points" USING btree ("_order");
  CREATE INDEX "pb_apiref_points_parent_id_idx" ON "pb_apiref_points" USING btree ("_parent_id");
  CREATE INDEX "pb_apiref_order_idx" ON "pb_apiref" USING btree ("_order");
  CREATE INDEX "pb_apiref_parent_id_idx" ON "pb_apiref" USING btree ("_parent_id");
  CREATE INDEX "pb_apiref_path_idx" ON "pb_apiref" USING btree ("_path");
  CREATE INDEX "pb_apiref_project_idx" ON "pb_apiref" USING btree ("project_id");
  CREATE INDEX "pb_dhero_actions_order_idx" ON "pb_dhero_actions" USING btree ("_order");
  CREATE INDEX "pb_dhero_actions_parent_id_idx" ON "pb_dhero_actions" USING btree ("_parent_id");
  CREATE INDEX "pb_dhero_actions_link_link_page_idx" ON "pb_dhero_actions" USING btree ("link_page_id");
  CREATE INDEX "pb_dhero_actions_link_link_project_idx" ON "pb_dhero_actions" USING btree ("link_project_id");
  CREATE INDEX "pb_dhero_preview_rows_order_idx" ON "pb_dhero_preview_rows" USING btree ("_order");
  CREATE INDEX "pb_dhero_preview_rows_parent_id_idx" ON "pb_dhero_preview_rows" USING btree ("_parent_id");
  CREATE INDEX "pb_dhero_order_idx" ON "pb_dhero" USING btree ("_order");
  CREATE INDEX "pb_dhero_parent_id_idx" ON "pb_dhero" USING btree ("_parent_id");
  CREATE INDEX "pb_dhero_path_idx" ON "pb_dhero" USING btree ("_path");
  CREATE INDEX "pb_udir_order_idx" ON "pb_udir" USING btree ("_order");
  CREATE INDEX "pb_udir_parent_id_idx" ON "pb_udir" USING btree ("_parent_id");
  CREATE INDEX "pb_udir_path_idx" ON "pb_udir" USING btree ("_path");
  CREATE INDEX "pb_uprof_order_idx" ON "pb_uprof" USING btree ("_order");
  CREATE INDEX "pb_uprof_parent_id_idx" ON "pb_uprof" USING btree ("_parent_id");
  CREATE INDEX "pb_uprof_path_idx" ON "pb_uprof" USING btree ("_path");
  CREATE INDEX "pages_breadcrumbs_order_idx" ON "pages_breadcrumbs" USING btree ("_order");
  CREATE INDEX "pages_breadcrumbs_parent_id_idx" ON "pages_breadcrumbs" USING btree ("_parent_id");
  CREATE INDEX "pages_breadcrumbs_doc_idx" ON "pages_breadcrumbs" USING btree ("doc_id");
  CREATE INDEX "pages_site_idx" ON "pages" USING btree ("site_id");
  CREATE INDEX "pages_path_idx" ON "pages" USING btree ("path");
  CREATE INDEX "pages_parent_idx" ON "pages" USING btree ("parent_id");
  CREATE INDEX "pages_updated_at_idx" ON "pages" USING btree ("updated_at");
  CREATE INDEX "pages_created_at_idx" ON "pages" USING btree ("created_at");
  CREATE INDEX "pages__status_idx" ON "pages" USING btree ("_status");
  CREATE UNIQUE INDEX "site_path_idx" ON "pages" USING btree ("site_id","path");
  CREATE INDEX "pages_texts_order_parent" ON "pages_texts" USING btree ("order","parent_id");
  CREATE INDEX "pages_rels_order_idx" ON "pages_rels" USING btree ("order");
  CREATE INDEX "pages_rels_parent_idx" ON "pages_rels" USING btree ("parent_id");
  CREATE INDEX "pages_rels_path_idx" ON "pages_rels" USING btree ("path");
  CREATE INDEX "pages_rels_pages_id_idx" ON "pages_rels" USING btree ("pages_id");
  CREATE INDEX "_pb_phead_v_actions_order_idx" ON "_pb_phead_v_actions" USING btree ("_order");
  CREATE INDEX "_pb_phead_v_actions_parent_id_idx" ON "_pb_phead_v_actions" USING btree ("_parent_id");
  CREATE INDEX "_pb_phead_v_actions_link_link_page_idx" ON "_pb_phead_v_actions" USING btree ("link_page_id");
  CREATE INDEX "_pb_phead_v_actions_link_link_project_idx" ON "_pb_phead_v_actions" USING btree ("link_project_id");
  CREATE INDEX "_pb_phead_v_order_idx" ON "_pb_phead_v" USING btree ("_order");
  CREATE INDEX "_pb_phead_v_parent_id_idx" ON "_pb_phead_v" USING btree ("_parent_id");
  CREATE INDEX "_pb_phead_v_path_idx" ON "_pb_phead_v" USING btree ("_path");
  CREATE INDEX "_pb_lhead_v_order_idx" ON "_pb_lhead_v" USING btree ("_order");
  CREATE INDEX "_pb_lhead_v_parent_id_idx" ON "_pb_lhead_v" USING btree ("_parent_id");
  CREATE INDEX "_pb_lhead_v_path_idx" ON "_pb_lhead_v" USING btree ("_path");
  CREATE INDEX "_pb_text_v_actions_order_idx" ON "_pb_text_v_actions" USING btree ("_order");
  CREATE INDEX "_pb_text_v_actions_parent_id_idx" ON "_pb_text_v_actions" USING btree ("_parent_id");
  CREATE INDEX "_pb_text_v_actions_link_link_page_idx" ON "_pb_text_v_actions" USING btree ("link_page_id");
  CREATE INDEX "_pb_text_v_actions_link_link_project_idx" ON "_pb_text_v_actions" USING btree ("link_project_id");
  CREATE INDEX "_pb_text_v_order_idx" ON "_pb_text_v" USING btree ("_order");
  CREATE INDEX "_pb_text_v_parent_id_idx" ON "_pb_text_v" USING btree ("_parent_id");
  CREATE INDEX "_pb_text_v_path_idx" ON "_pb_text_v" USING btree ("_path");
  CREATE INDEX "_pb_img_v_order_idx" ON "_pb_img_v" USING btree ("_order");
  CREATE INDEX "_pb_img_v_parent_id_idx" ON "_pb_img_v" USING btree ("_parent_id");
  CREATE INDEX "_pb_img_v_path_idx" ON "_pb_img_v" USING btree ("_path");
  CREATE INDEX "_pb_img_v_image_idx" ON "_pb_img_v" USING btree ("image_id");
  CREATE INDEX "_pb_imgtxt_v_actions_order_idx" ON "_pb_imgtxt_v_actions" USING btree ("_order");
  CREATE INDEX "_pb_imgtxt_v_actions_parent_id_idx" ON "_pb_imgtxt_v_actions" USING btree ("_parent_id");
  CREATE INDEX "_pb_imgtxt_v_actions_link_link_page_idx" ON "_pb_imgtxt_v_actions" USING btree ("link_page_id");
  CREATE INDEX "_pb_imgtxt_v_actions_link_link_project_idx" ON "_pb_imgtxt_v_actions" USING btree ("link_project_id");
  CREATE INDEX "_pb_imgtxt_v_order_idx" ON "_pb_imgtxt_v" USING btree ("_order");
  CREATE INDEX "_pb_imgtxt_v_parent_id_idx" ON "_pb_imgtxt_v" USING btree ("_parent_id");
  CREATE INDEX "_pb_imgtxt_v_path_idx" ON "_pb_imgtxt_v" USING btree ("_path");
  CREATE INDEX "_pb_imgtxt_v_image_idx" ON "_pb_imgtxt_v" USING btree ("image_id");
  CREATE INDEX "_pb_cols_v_columns_order_idx" ON "_pb_cols_v_columns" USING btree ("_order");
  CREATE INDEX "_pb_cols_v_columns_parent_id_idx" ON "_pb_cols_v_columns" USING btree ("_parent_id");
  CREATE INDEX "_pb_cols_v_order_idx" ON "_pb_cols_v" USING btree ("_order");
  CREATE INDEX "_pb_cols_v_parent_id_idx" ON "_pb_cols_v" USING btree ("_parent_id");
  CREATE INDEX "_pb_cols_v_path_idx" ON "_pb_cols_v" USING btree ("_path");
  CREATE INDEX "_pb_txt_v_order_idx" ON "_pb_txt_v" USING btree ("_order");
  CREATE INDEX "_pb_txt_v_parent_id_idx" ON "_pb_txt_v" USING btree ("_parent_id");
  CREATE INDEX "_pb_txt_v_path_idx" ON "_pb_txt_v" USING btree ("_path");
  CREATE INDEX "_pb_btns_v_actions_order_idx" ON "_pb_btns_v_actions" USING btree ("_order");
  CREATE INDEX "_pb_btns_v_actions_parent_id_idx" ON "_pb_btns_v_actions" USING btree ("_parent_id");
  CREATE INDEX "_pb_btns_v_actions_link_link_page_idx" ON "_pb_btns_v_actions" USING btree ("link_page_id");
  CREATE INDEX "_pb_btns_v_actions_link_link_project_idx" ON "_pb_btns_v_actions" USING btree ("link_project_id");
  CREATE INDEX "_pb_btns_v_order_idx" ON "_pb_btns_v" USING btree ("_order");
  CREATE INDEX "_pb_btns_v_parent_id_idx" ON "_pb_btns_v" USING btree ("_parent_id");
  CREATE INDEX "_pb_btns_v_path_idx" ON "_pb_btns_v" USING btree ("_path");
  CREATE INDEX "_pb_grid_v_items_order_idx" ON "_pb_grid_v_items" USING btree ("_order");
  CREATE INDEX "_pb_grid_v_items_parent_id_idx" ON "_pb_grid_v_items" USING btree ("_parent_id");
  CREATE INDEX "_pb_grid_v_order_idx" ON "_pb_grid_v" USING btree ("_order");
  CREATE INDEX "_pb_grid_v_parent_id_idx" ON "_pb_grid_v" USING btree ("_parent_id");
  CREATE INDEX "_pb_grid_v_path_idx" ON "_pb_grid_v" USING btree ("_path");
  CREATE INDEX "_pb_tl_v_steps_order_idx" ON "_pb_tl_v_steps" USING btree ("_order");
  CREATE INDEX "_pb_tl_v_steps_parent_id_idx" ON "_pb_tl_v_steps" USING btree ("_parent_id");
  CREATE INDEX "_pb_tl_v_order_idx" ON "_pb_tl_v" USING btree ("_order");
  CREATE INDEX "_pb_tl_v_parent_id_idx" ON "_pb_tl_v" USING btree ("_parent_id");
  CREATE INDEX "_pb_tl_v_path_idx" ON "_pb_tl_v" USING btree ("_path");
  CREATE INDEX "_pb_cta_v_actions_order_idx" ON "_pb_cta_v_actions" USING btree ("_order");
  CREATE INDEX "_pb_cta_v_actions_parent_id_idx" ON "_pb_cta_v_actions" USING btree ("_parent_id");
  CREATE INDEX "_pb_cta_v_actions_link_link_page_idx" ON "_pb_cta_v_actions" USING btree ("link_page_id");
  CREATE INDEX "_pb_cta_v_actions_link_link_project_idx" ON "_pb_cta_v_actions" USING btree ("link_project_id");
  CREATE INDEX "_pb_cta_v_order_idx" ON "_pb_cta_v" USING btree ("_order");
  CREATE INDEX "_pb_cta_v_parent_id_idx" ON "_pb_cta_v" USING btree ("_parent_id");
  CREATE INDEX "_pb_cta_v_path_idx" ON "_pb_cta_v" USING btree ("_path");
  CREATE INDEX "_pb_hero_v_actions_order_idx" ON "_pb_hero_v_actions" USING btree ("_order");
  CREATE INDEX "_pb_hero_v_actions_parent_id_idx" ON "_pb_hero_v_actions" USING btree ("_parent_id");
  CREATE INDEX "_pb_hero_v_actions_link_link_page_idx" ON "_pb_hero_v_actions" USING btree ("link_page_id");
  CREATE INDEX "_pb_hero_v_actions_link_link_project_idx" ON "_pb_hero_v_actions" USING btree ("link_project_id");
  CREATE INDEX "_pb_hero_v_order_idx" ON "_pb_hero_v" USING btree ("_order");
  CREATE INDEX "_pb_hero_v_parent_id_idx" ON "_pb_hero_v" USING btree ("_parent_id");
  CREATE INDEX "_pb_hero_v_path_idx" ON "_pb_hero_v" USING btree ("_path");
  CREATE INDEX "_pb_cards_v_order_idx" ON "_pb_cards_v" USING btree ("_order");
  CREATE INDEX "_pb_cards_v_parent_id_idx" ON "_pb_cards_v" USING btree ("_parent_id");
  CREATE INDEX "_pb_cards_v_path_idx" ON "_pb_cards_v" USING btree ("_path");
  CREATE INDEX "_pb_lcards_v_items_order_idx" ON "_pb_lcards_v_items" USING btree ("_order");
  CREATE INDEX "_pb_lcards_v_items_parent_id_idx" ON "_pb_lcards_v_items" USING btree ("_parent_id");
  CREATE INDEX "_pb_lcards_v_items_link_link_page_idx" ON "_pb_lcards_v_items" USING btree ("link_page_id");
  CREATE INDEX "_pb_lcards_v_items_link_link_project_idx" ON "_pb_lcards_v_items" USING btree ("link_project_id");
  CREATE INDEX "_pb_lcards_v_order_idx" ON "_pb_lcards_v" USING btree ("_order");
  CREATE INDEX "_pb_lcards_v_parent_id_idx" ON "_pb_lcards_v" USING btree ("_parent_id");
  CREATE INDEX "_pb_lcards_v_path_idx" ON "_pb_lcards_v" USING btree ("_path");
  CREATE INDEX "_pb_teaser_v_order_idx" ON "_pb_teaser_v" USING btree ("_order");
  CREATE INDEX "_pb_teaser_v_parent_id_idx" ON "_pb_teaser_v" USING btree ("_parent_id");
  CREATE INDEX "_pb_teaser_v_path_idx" ON "_pb_teaser_v" USING btree ("_path");
  CREATE INDEX "_pb_teaser_v_page_idx" ON "_pb_teaser_v" USING btree ("page_id");
  CREATE INDEX "_pb_projects_v_coming_next_items_order_idx" ON "_pb_projects_v_coming_next_items" USING btree ("_order");
  CREATE INDEX "_pb_projects_v_coming_next_items_parent_id_idx" ON "_pb_projects_v_coming_next_items" USING btree ("_parent_id");
  CREATE INDEX "_pb_projects_v_order_idx" ON "_pb_projects_v" USING btree ("_order");
  CREATE INDEX "_pb_projects_v_parent_id_idx" ON "_pb_projects_v" USING btree ("_parent_id");
  CREATE INDEX "_pb_projects_v_path_idx" ON "_pb_projects_v" USING btree ("_path");
  CREATE INDEX "_pb_pteaser_v_highlights_order_idx" ON "_pb_pteaser_v_highlights" USING btree ("_order");
  CREATE INDEX "_pb_pteaser_v_highlights_parent_id_idx" ON "_pb_pteaser_v_highlights" USING btree ("_parent_id");
  CREATE INDEX "_pb_pteaser_v_order_idx" ON "_pb_pteaser_v" USING btree ("_order");
  CREATE INDEX "_pb_pteaser_v_parent_id_idx" ON "_pb_pteaser_v" USING btree ("_parent_id");
  CREATE INDEX "_pb_pteaser_v_path_idx" ON "_pb_pteaser_v" USING btree ("_path");
  CREATE INDEX "_pb_pteaser_v_link_page_idx" ON "_pb_pteaser_v" USING btree ("link_page_id");
  CREATE INDEX "_pb_map_v_apps_order_idx" ON "_pb_map_v_apps" USING btree ("_order");
  CREATE INDEX "_pb_map_v_apps_parent_id_idx" ON "_pb_map_v_apps" USING btree ("_parent_id");
  CREATE INDEX "_pb_map_v_apps_page_idx" ON "_pb_map_v_apps" USING btree ("page_id");
  CREATE INDEX "_pb_map_v_order_idx" ON "_pb_map_v" USING btree ("_order");
  CREATE INDEX "_pb_map_v_parent_id_idx" ON "_pb_map_v" USING btree ("_parent_id");
  CREATE INDEX "_pb_map_v_path_idx" ON "_pb_map_v" USING btree ("_path");
  CREATE INDEX "_pb_stack_v_pipeline_order_idx" ON "_pb_stack_v_pipeline" USING btree ("_order");
  CREATE INDEX "_pb_stack_v_pipeline_parent_id_idx" ON "_pb_stack_v_pipeline" USING btree ("_parent_id");
  CREATE INDEX "_pb_stack_v_pieces_order_idx" ON "_pb_stack_v_pieces" USING btree ("_order");
  CREATE INDEX "_pb_stack_v_pieces_parent_id_idx" ON "_pb_stack_v_pieces" USING btree ("_parent_id");
  CREATE INDEX "_pb_stack_v_tool_groups_tools_order_idx" ON "_pb_stack_v_tool_groups_tools" USING btree ("_order");
  CREATE INDEX "_pb_stack_v_tool_groups_tools_parent_id_idx" ON "_pb_stack_v_tool_groups_tools" USING btree ("_parent_id");
  CREATE INDEX "_pb_stack_v_tool_groups_order_idx" ON "_pb_stack_v_tool_groups" USING btree ("_order");
  CREATE INDEX "_pb_stack_v_tool_groups_parent_id_idx" ON "_pb_stack_v_tool_groups" USING btree ("_parent_id");
  CREATE INDEX "_pb_stack_v_order_idx" ON "_pb_stack_v" USING btree ("_order");
  CREATE INDEX "_pb_stack_v_parent_id_idx" ON "_pb_stack_v" USING btree ("_parent_id");
  CREATE INDEX "_pb_stack_v_path_idx" ON "_pb_stack_v" USING btree ("_path");
  CREATE INDEX "_pb_flows_v_rows_steps_order_idx" ON "_pb_flows_v_rows_steps" USING btree ("_order");
  CREATE INDEX "_pb_flows_v_rows_steps_parent_id_idx" ON "_pb_flows_v_rows_steps" USING btree ("_parent_id");
  CREATE INDEX "_pb_flows_v_rows_order_idx" ON "_pb_flows_v_rows" USING btree ("_order");
  CREATE INDEX "_pb_flows_v_rows_parent_id_idx" ON "_pb_flows_v_rows" USING btree ("_parent_id");
  CREATE INDEX "_pb_flows_v_order_idx" ON "_pb_flows_v" USING btree ("_order");
  CREATE INDEX "_pb_flows_v_parent_id_idx" ON "_pb_flows_v" USING btree ("_parent_id");
  CREATE INDEX "_pb_flows_v_path_idx" ON "_pb_flows_v" USING btree ("_path");
  CREATE INDEX "_pb_access_v_rows_order_idx" ON "_pb_access_v_rows" USING btree ("_order");
  CREATE INDEX "_pb_access_v_rows_parent_id_idx" ON "_pb_access_v_rows" USING btree ("_parent_id");
  CREATE INDEX "_pb_access_v_order_idx" ON "_pb_access_v" USING btree ("_order");
  CREATE INDEX "_pb_access_v_parent_id_idx" ON "_pb_access_v" USING btree ("_parent_id");
  CREATE INDEX "_pb_access_v_path_idx" ON "_pb_access_v" USING btree ("_path");
  CREATE INDEX "_pb_addr_v_items_order_idx" ON "_pb_addr_v_items" USING btree ("_order");
  CREATE INDEX "_pb_addr_v_items_parent_id_idx" ON "_pb_addr_v_items" USING btree ("_parent_id");
  CREATE INDEX "_pb_addr_v_order_idx" ON "_pb_addr_v" USING btree ("_order");
  CREATE INDEX "_pb_addr_v_parent_id_idx" ON "_pb_addr_v" USING btree ("_parent_id");
  CREATE INDEX "_pb_addr_v_path_idx" ON "_pb_addr_v" USING btree ("_path");
  CREATE INDEX "_pb_senders_v_senders_order_idx" ON "_pb_senders_v_senders" USING btree ("_order");
  CREATE INDEX "_pb_senders_v_senders_parent_id_idx" ON "_pb_senders_v_senders" USING btree ("_parent_id");
  CREATE INDEX "_pb_senders_v_order_idx" ON "_pb_senders_v" USING btree ("_order");
  CREATE INDEX "_pb_senders_v_parent_id_idx" ON "_pb_senders_v" USING btree ("_parent_id");
  CREATE INDEX "_pb_senders_v_path_idx" ON "_pb_senders_v" USING btree ("_path");
  CREATE INDEX "_pb_theme_v_order_idx" ON "_pb_theme_v" USING btree ("_order");
  CREATE INDEX "_pb_theme_v_parent_id_idx" ON "_pb_theme_v" USING btree ("_parent_id");
  CREATE INDEX "_pb_theme_v_path_idx" ON "_pb_theme_v" USING btree ("_path");
  CREATE INDEX "_pb_theme_v_preview_components_link_preview_components_l_idx" ON "_pb_theme_v" USING btree ("preview_components_link_page_id");
  CREATE INDEX "_pb_theme_v_preview_components_link_preview_components_1_idx" ON "_pb_theme_v" USING btree ("preview_components_link_project_id");
  CREATE INDEX "_pb_apiref_v_points_order_idx" ON "_pb_apiref_v_points" USING btree ("_order");
  CREATE INDEX "_pb_apiref_v_points_parent_id_idx" ON "_pb_apiref_v_points" USING btree ("_parent_id");
  CREATE INDEX "_pb_apiref_v_order_idx" ON "_pb_apiref_v" USING btree ("_order");
  CREATE INDEX "_pb_apiref_v_parent_id_idx" ON "_pb_apiref_v" USING btree ("_parent_id");
  CREATE INDEX "_pb_apiref_v_path_idx" ON "_pb_apiref_v" USING btree ("_path");
  CREATE INDEX "_pb_apiref_v_project_idx" ON "_pb_apiref_v" USING btree ("project_id");
  CREATE INDEX "_pb_dhero_v_actions_order_idx" ON "_pb_dhero_v_actions" USING btree ("_order");
  CREATE INDEX "_pb_dhero_v_actions_parent_id_idx" ON "_pb_dhero_v_actions" USING btree ("_parent_id");
  CREATE INDEX "_pb_dhero_v_actions_link_link_page_idx" ON "_pb_dhero_v_actions" USING btree ("link_page_id");
  CREATE INDEX "_pb_dhero_v_actions_link_link_project_idx" ON "_pb_dhero_v_actions" USING btree ("link_project_id");
  CREATE INDEX "_pb_dhero_v_preview_rows_order_idx" ON "_pb_dhero_v_preview_rows" USING btree ("_order");
  CREATE INDEX "_pb_dhero_v_preview_rows_parent_id_idx" ON "_pb_dhero_v_preview_rows" USING btree ("_parent_id");
  CREATE INDEX "_pb_dhero_v_order_idx" ON "_pb_dhero_v" USING btree ("_order");
  CREATE INDEX "_pb_dhero_v_parent_id_idx" ON "_pb_dhero_v" USING btree ("_parent_id");
  CREATE INDEX "_pb_dhero_v_path_idx" ON "_pb_dhero_v" USING btree ("_path");
  CREATE INDEX "_pb_udir_v_order_idx" ON "_pb_udir_v" USING btree ("_order");
  CREATE INDEX "_pb_udir_v_parent_id_idx" ON "_pb_udir_v" USING btree ("_parent_id");
  CREATE INDEX "_pb_udir_v_path_idx" ON "_pb_udir_v" USING btree ("_path");
  CREATE INDEX "_pb_uprof_v_order_idx" ON "_pb_uprof_v" USING btree ("_order");
  CREATE INDEX "_pb_uprof_v_parent_id_idx" ON "_pb_uprof_v" USING btree ("_parent_id");
  CREATE INDEX "_pb_uprof_v_path_idx" ON "_pb_uprof_v" USING btree ("_path");
  CREATE INDEX "_pages_v_version_breadcrumbs_order_idx" ON "_pages_v_version_breadcrumbs" USING btree ("_order");
  CREATE INDEX "_pages_v_version_breadcrumbs_parent_id_idx" ON "_pages_v_version_breadcrumbs" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_version_breadcrumbs_doc_idx" ON "_pages_v_version_breadcrumbs" USING btree ("doc_id");
  CREATE INDEX "_pages_v_parent_idx" ON "_pages_v" USING btree ("parent_id");
  CREATE INDEX "_pages_v_version_version_site_idx" ON "_pages_v" USING btree ("version_site_id");
  CREATE INDEX "_pages_v_version_version_path_idx" ON "_pages_v" USING btree ("version_path");
  CREATE INDEX "_pages_v_version_version_parent_idx" ON "_pages_v" USING btree ("version_parent_id");
  CREATE INDEX "_pages_v_version_version_updated_at_idx" ON "_pages_v" USING btree ("version_updated_at");
  CREATE INDEX "_pages_v_version_version_created_at_idx" ON "_pages_v" USING btree ("version_created_at");
  CREATE INDEX "_pages_v_version_version__status_idx" ON "_pages_v" USING btree ("version__status");
  CREATE INDEX "_pages_v_created_at_idx" ON "_pages_v" USING btree ("created_at");
  CREATE INDEX "_pages_v_updated_at_idx" ON "_pages_v" USING btree ("updated_at");
  CREATE INDEX "_pages_v_latest_idx" ON "_pages_v" USING btree ("latest");
  CREATE INDEX "_pages_v_autosave_idx" ON "_pages_v" USING btree ("autosave");
  CREATE INDEX "version_site_version_path_idx" ON "_pages_v" USING btree ("version_site_id","version_path");
  CREATE INDEX "_pages_v_texts_order_parent" ON "_pages_v_texts" USING btree ("order","parent_id");
  CREATE INDEX "_pages_v_rels_order_idx" ON "_pages_v_rels" USING btree ("order");
  CREATE INDEX "_pages_v_rels_parent_idx" ON "_pages_v_rels" USING btree ("parent_id");
  CREATE INDEX "_pages_v_rels_path_idx" ON "_pages_v_rels" USING btree ("path");
  CREATE INDEX "_pages_v_rels_pages_id_idx" ON "_pages_v_rels" USING btree ("pages_id");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "projects__order_idx" ON "projects" USING btree ("_order");
  CREATE INDEX "projects_page_idx" ON "projects" USING btree ("page_id");
  CREATE INDEX "projects_updated_at_idx" ON "projects" USING btree ("updated_at");
  CREATE INDEX "projects_created_at_idx" ON "projects" USING btree ("created_at");
  CREATE INDEX "projects_texts_order_parent" ON "projects_texts" USING btree ("order","parent_id");
  CREATE INDEX "_projects_v_parent_idx" ON "_projects_v" USING btree ("parent_id");
  CREATE INDEX "_projects_v_version_version__order_idx" ON "_projects_v" USING btree ("version__order");
  CREATE INDEX "_projects_v_version_version_page_idx" ON "_projects_v" USING btree ("version_page_id");
  CREATE INDEX "_projects_v_version_version_updated_at_idx" ON "_projects_v" USING btree ("version_updated_at");
  CREATE INDEX "_projects_v_version_version_created_at_idx" ON "_projects_v" USING btree ("version_created_at");
  CREATE INDEX "_projects_v_created_at_idx" ON "_projects_v" USING btree ("created_at");
  CREATE INDEX "_projects_v_updated_at_idx" ON "_projects_v" USING btree ("updated_at");
  CREATE INDEX "_projects_v_texts_order_parent" ON "_projects_v_texts" USING btree ("order","parent_id");
  CREATE UNIQUE INDEX "users_sub_idx" ON "users" USING btree ("sub");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_sites_id_idx" ON "payload_locked_documents_rels" USING btree ("sites_id");
  CREATE INDEX "payload_locked_documents_rels_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("pages_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_projects_id_idx" ON "payload_locked_documents_rels" USING btree ("projects_id");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");`);
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "sites_header_nav" CASCADE;
  DROP TABLE "sites_footer_groups_links" CASCADE;
  DROP TABLE "sites_footer_groups" CASCADE;
  DROP TABLE "sites_footer_legal" CASCADE;
  DROP TABLE "sites" CASCADE;
  DROP TABLE "sites_texts" CASCADE;
  DROP TABLE "_sites_v_version_header_nav" CASCADE;
  DROP TABLE "_sites_v_version_footer_groups_links" CASCADE;
  DROP TABLE "_sites_v_version_footer_groups" CASCADE;
  DROP TABLE "_sites_v_version_footer_legal" CASCADE;
  DROP TABLE "_sites_v" CASCADE;
  DROP TABLE "_sites_v_texts" CASCADE;
  DROP TABLE "pb_phead_actions" CASCADE;
  DROP TABLE "pb_phead" CASCADE;
  DROP TABLE "pb_lhead" CASCADE;
  DROP TABLE "pb_text_actions" CASCADE;
  DROP TABLE "pb_text" CASCADE;
  DROP TABLE "pb_img" CASCADE;
  DROP TABLE "pb_imgtxt_actions" CASCADE;
  DROP TABLE "pb_imgtxt" CASCADE;
  DROP TABLE "pb_cols_columns" CASCADE;
  DROP TABLE "pb_cols" CASCADE;
  DROP TABLE "pb_txt" CASCADE;
  DROP TABLE "pb_btns_actions" CASCADE;
  DROP TABLE "pb_btns" CASCADE;
  DROP TABLE "pb_grid_items" CASCADE;
  DROP TABLE "pb_grid" CASCADE;
  DROP TABLE "pb_tl_steps" CASCADE;
  DROP TABLE "pb_tl" CASCADE;
  DROP TABLE "pb_cta_actions" CASCADE;
  DROP TABLE "pb_cta" CASCADE;
  DROP TABLE "pb_hero_actions" CASCADE;
  DROP TABLE "pb_hero" CASCADE;
  DROP TABLE "pb_cards" CASCADE;
  DROP TABLE "pb_lcards_items" CASCADE;
  DROP TABLE "pb_lcards" CASCADE;
  DROP TABLE "pb_teaser" CASCADE;
  DROP TABLE "pb_projects_coming_next_items" CASCADE;
  DROP TABLE "pb_projects" CASCADE;
  DROP TABLE "pb_pteaser_highlights" CASCADE;
  DROP TABLE "pb_pteaser" CASCADE;
  DROP TABLE "pb_map_apps" CASCADE;
  DROP TABLE "pb_map" CASCADE;
  DROP TABLE "pb_stack_pipeline" CASCADE;
  DROP TABLE "pb_stack_pieces" CASCADE;
  DROP TABLE "pb_stack_tool_groups_tools" CASCADE;
  DROP TABLE "pb_stack_tool_groups" CASCADE;
  DROP TABLE "pb_stack" CASCADE;
  DROP TABLE "pb_flows_rows_steps" CASCADE;
  DROP TABLE "pb_flows_rows" CASCADE;
  DROP TABLE "pb_flows" CASCADE;
  DROP TABLE "pb_access_rows" CASCADE;
  DROP TABLE "pb_access" CASCADE;
  DROP TABLE "pb_addr_items" CASCADE;
  DROP TABLE "pb_addr" CASCADE;
  DROP TABLE "pb_senders_senders" CASCADE;
  DROP TABLE "pb_senders" CASCADE;
  DROP TABLE "pb_theme" CASCADE;
  DROP TABLE "pb_apiref_points" CASCADE;
  DROP TABLE "pb_apiref" CASCADE;
  DROP TABLE "pb_dhero_actions" CASCADE;
  DROP TABLE "pb_dhero_preview_rows" CASCADE;
  DROP TABLE "pb_dhero" CASCADE;
  DROP TABLE "pb_udir" CASCADE;
  DROP TABLE "pb_uprof" CASCADE;
  DROP TABLE "pages_breadcrumbs" CASCADE;
  DROP TABLE "pages" CASCADE;
  DROP TABLE "pages_texts" CASCADE;
  DROP TABLE "pages_rels" CASCADE;
  DROP TABLE "_pb_phead_v_actions" CASCADE;
  DROP TABLE "_pb_phead_v" CASCADE;
  DROP TABLE "_pb_lhead_v" CASCADE;
  DROP TABLE "_pb_text_v_actions" CASCADE;
  DROP TABLE "_pb_text_v" CASCADE;
  DROP TABLE "_pb_img_v" CASCADE;
  DROP TABLE "_pb_imgtxt_v_actions" CASCADE;
  DROP TABLE "_pb_imgtxt_v" CASCADE;
  DROP TABLE "_pb_cols_v_columns" CASCADE;
  DROP TABLE "_pb_cols_v" CASCADE;
  DROP TABLE "_pb_txt_v" CASCADE;
  DROP TABLE "_pb_btns_v_actions" CASCADE;
  DROP TABLE "_pb_btns_v" CASCADE;
  DROP TABLE "_pb_grid_v_items" CASCADE;
  DROP TABLE "_pb_grid_v" CASCADE;
  DROP TABLE "_pb_tl_v_steps" CASCADE;
  DROP TABLE "_pb_tl_v" CASCADE;
  DROP TABLE "_pb_cta_v_actions" CASCADE;
  DROP TABLE "_pb_cta_v" CASCADE;
  DROP TABLE "_pb_hero_v_actions" CASCADE;
  DROP TABLE "_pb_hero_v" CASCADE;
  DROP TABLE "_pb_cards_v" CASCADE;
  DROP TABLE "_pb_lcards_v_items" CASCADE;
  DROP TABLE "_pb_lcards_v" CASCADE;
  DROP TABLE "_pb_teaser_v" CASCADE;
  DROP TABLE "_pb_projects_v_coming_next_items" CASCADE;
  DROP TABLE "_pb_projects_v" CASCADE;
  DROP TABLE "_pb_pteaser_v_highlights" CASCADE;
  DROP TABLE "_pb_pteaser_v" CASCADE;
  DROP TABLE "_pb_map_v_apps" CASCADE;
  DROP TABLE "_pb_map_v" CASCADE;
  DROP TABLE "_pb_stack_v_pipeline" CASCADE;
  DROP TABLE "_pb_stack_v_pieces" CASCADE;
  DROP TABLE "_pb_stack_v_tool_groups_tools" CASCADE;
  DROP TABLE "_pb_stack_v_tool_groups" CASCADE;
  DROP TABLE "_pb_stack_v" CASCADE;
  DROP TABLE "_pb_flows_v_rows_steps" CASCADE;
  DROP TABLE "_pb_flows_v_rows" CASCADE;
  DROP TABLE "_pb_flows_v" CASCADE;
  DROP TABLE "_pb_access_v_rows" CASCADE;
  DROP TABLE "_pb_access_v" CASCADE;
  DROP TABLE "_pb_addr_v_items" CASCADE;
  DROP TABLE "_pb_addr_v" CASCADE;
  DROP TABLE "_pb_senders_v_senders" CASCADE;
  DROP TABLE "_pb_senders_v" CASCADE;
  DROP TABLE "_pb_theme_v" CASCADE;
  DROP TABLE "_pb_apiref_v_points" CASCADE;
  DROP TABLE "_pb_apiref_v" CASCADE;
  DROP TABLE "_pb_dhero_v_actions" CASCADE;
  DROP TABLE "_pb_dhero_v_preview_rows" CASCADE;
  DROP TABLE "_pb_dhero_v" CASCADE;
  DROP TABLE "_pb_udir_v" CASCADE;
  DROP TABLE "_pb_uprof_v" CASCADE;
  DROP TABLE "_pages_v_version_breadcrumbs" CASCADE;
  DROP TABLE "_pages_v" CASCADE;
  DROP TABLE "_pages_v_texts" CASCADE;
  DROP TABLE "_pages_v_rels" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "projects" CASCADE;
  DROP TABLE "projects_texts" CASCADE;
  DROP TABLE "_projects_v" CASCADE;
  DROP TABLE "_projects_v_texts" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TYPE "public"."enum_sites_header_nav_icon";
  DROP TYPE "public"."enum_sites_header_nav_link_type";
  DROP TYPE "public"."target";
  DROP TYPE "public"."app";
  DROP TYPE "public"."enum_sites_footer_groups_links_icon";
  DROP TYPE "public"."enum_sites_footer_groups_links_link_type";
  DROP TYPE "public"."enum_sites_footer_legal_link_type";
  DROP TYPE "public"."enum_sites_slug";
  DROP TYPE "public"."enum__sites_v_version_header_nav_icon";
  DROP TYPE "public"."enum__sites_v_version_header_nav_link_type";
  DROP TYPE "public"."enum__sites_v_version_footer_groups_links_icon";
  DROP TYPE "public"."enum__sites_v_version_footer_groups_links_link_type";
  DROP TYPE "public"."enum__sites_v_version_footer_legal_link_type";
  DROP TYPE "public"."enum__sites_v_version_slug";
  DROP TYPE "public"."enum_pb_phead_actions_style";
  DROP TYPE "public"."enum_pb_phead_actions_size";
  DROP TYPE "public"."enum_pb_phead_actions_icon";
  DROP TYPE "public"."enum_pb_phead_actions_icon_position";
  DROP TYPE "public"."enum_pb_phead_actions_link_type";
  DROP TYPE "public"."enum_pb_text_actions_style";
  DROP TYPE "public"."enum_pb_text_actions_size";
  DROP TYPE "public"."enum_pb_text_actions_icon";
  DROP TYPE "public"."enum_pb_text_actions_icon_position";
  DROP TYPE "public"."enum_pb_text_actions_link_type";
  DROP TYPE "public"."enum_pb_img_size";
  DROP TYPE "public"."enum_pb_imgtxt_actions_style";
  DROP TYPE "public"."enum_pb_imgtxt_actions_size";
  DROP TYPE "public"."enum_pb_imgtxt_actions_icon";
  DROP TYPE "public"."enum_pb_imgtxt_actions_icon_position";
  DROP TYPE "public"."enum_pb_imgtxt_actions_link_type";
  DROP TYPE "public"."enum_pb_imgtxt_image_side";
  DROP TYPE "public"."enum_pb_btns_actions_style";
  DROP TYPE "public"."enum_pb_btns_actions_size";
  DROP TYPE "public"."enum_pb_btns_actions_icon";
  DROP TYPE "public"."enum_pb_btns_actions_icon_position";
  DROP TYPE "public"."enum_pb_btns_actions_link_type";
  DROP TYPE "public"."enum_pb_btns_align";
  DROP TYPE "public"."enum_pb_grid_items_icon";
  DROP TYPE "public"."enum_pb_grid_columns";
  DROP TYPE "public"."enum_pb_tl_steps_icon";
  DROP TYPE "public"."enum_pb_tl_aside";
  DROP TYPE "public"."enum_pb_cta_actions_style";
  DROP TYPE "public"."enum_pb_cta_actions_size";
  DROP TYPE "public"."enum_pb_cta_actions_icon";
  DROP TYPE "public"."enum_pb_cta_actions_icon_position";
  DROP TYPE "public"."enum_pb_cta_actions_link_type";
  DROP TYPE "public"."enum_pb_hero_actions_style";
  DROP TYPE "public"."enum_pb_hero_actions_size";
  DROP TYPE "public"."enum_pb_hero_actions_icon";
  DROP TYPE "public"."enum_pb_hero_actions_icon_position";
  DROP TYPE "public"."enum_pb_hero_actions_link_type";
  DROP TYPE "public"."enum_pb_lcards_items_link_type";
  DROP TYPE "public"."enum_pb_map_apps_address";
  DROP TYPE "public"."enum_pb_stack_pipeline_icon";
  DROP TYPE "public"."enum_pb_stack_pieces_icon";
  DROP TYPE "public"."enum_pb_stack_tool_groups_tools_icon";
  DROP TYPE "public"."enum_pb_flows_rows_steps_icon";
  DROP TYPE "public"."enum_pb_senders_senders_icon";
  DROP TYPE "public"."enum_pb_theme_preview_components_link_type";
  DROP TYPE "public"."enum_pb_apiref_points_icon";
  DROP TYPE "public"."enum_pb_dhero_actions_style";
  DROP TYPE "public"."enum_pb_dhero_actions_size";
  DROP TYPE "public"."enum_pb_dhero_actions_icon";
  DROP TYPE "public"."enum_pb_dhero_actions_icon_position";
  DROP TYPE "public"."enum_pb_dhero_actions_link_type";
  DROP TYPE "public"."enum_pb_dhero_tag_icon";
  DROP TYPE "public"."enum_pages_icon";
  DROP TYPE "public"."enum_pages_width";
  DROP TYPE "public"."enum_pages_backdrop";
  DROP TYPE "public"."enum_pages_status";
  DROP TYPE "public"."enum__pb_phead_v_actions_style";
  DROP TYPE "public"."enum__pb_phead_v_actions_size";
  DROP TYPE "public"."enum__pb_phead_v_actions_icon";
  DROP TYPE "public"."enum__pb_phead_v_actions_icon_position";
  DROP TYPE "public"."enum__pb_phead_v_actions_link_type";
  DROP TYPE "public"."enum__pb_text_v_actions_style";
  DROP TYPE "public"."enum__pb_text_v_actions_size";
  DROP TYPE "public"."enum__pb_text_v_actions_icon";
  DROP TYPE "public"."enum__pb_text_v_actions_icon_position";
  DROP TYPE "public"."enum__pb_text_v_actions_link_type";
  DROP TYPE "public"."enum__pb_img_v_size";
  DROP TYPE "public"."enum__pb_imgtxt_v_actions_style";
  DROP TYPE "public"."enum__pb_imgtxt_v_actions_size";
  DROP TYPE "public"."enum__pb_imgtxt_v_actions_icon";
  DROP TYPE "public"."enum__pb_imgtxt_v_actions_icon_position";
  DROP TYPE "public"."enum__pb_imgtxt_v_actions_link_type";
  DROP TYPE "public"."enum__pb_imgtxt_v_image_side";
  DROP TYPE "public"."enum__pb_btns_v_actions_style";
  DROP TYPE "public"."enum__pb_btns_v_actions_size";
  DROP TYPE "public"."enum__pb_btns_v_actions_icon";
  DROP TYPE "public"."enum__pb_btns_v_actions_icon_position";
  DROP TYPE "public"."enum__pb_btns_v_actions_link_type";
  DROP TYPE "public"."enum__pb_btns_v_align";
  DROP TYPE "public"."enum__pb_grid_v_items_icon";
  DROP TYPE "public"."enum__pb_grid_v_columns";
  DROP TYPE "public"."enum__pb_tl_v_steps_icon";
  DROP TYPE "public"."enum__pb_tl_v_aside";
  DROP TYPE "public"."enum__pb_cta_v_actions_style";
  DROP TYPE "public"."enum__pb_cta_v_actions_size";
  DROP TYPE "public"."enum__pb_cta_v_actions_icon";
  DROP TYPE "public"."enum__pb_cta_v_actions_icon_position";
  DROP TYPE "public"."enum__pb_cta_v_actions_link_type";
  DROP TYPE "public"."enum__pb_hero_v_actions_style";
  DROP TYPE "public"."enum__pb_hero_v_actions_size";
  DROP TYPE "public"."enum__pb_hero_v_actions_icon";
  DROP TYPE "public"."enum__pb_hero_v_actions_icon_position";
  DROP TYPE "public"."enum__pb_hero_v_actions_link_type";
  DROP TYPE "public"."enum__pb_lcards_v_items_link_type";
  DROP TYPE "public"."enum__pb_map_v_apps_address";
  DROP TYPE "public"."enum__pb_stack_v_pipeline_icon";
  DROP TYPE "public"."enum__pb_stack_v_pieces_icon";
  DROP TYPE "public"."enum__pb_stack_v_tool_groups_tools_icon";
  DROP TYPE "public"."enum__pb_flows_v_rows_steps_icon";
  DROP TYPE "public"."enum__pb_senders_v_senders_icon";
  DROP TYPE "public"."enum__pb_theme_v_preview_components_link_type";
  DROP TYPE "public"."enum__pb_apiref_v_points_icon";
  DROP TYPE "public"."enum__pb_dhero_v_actions_style";
  DROP TYPE "public"."enum__pb_dhero_v_actions_size";
  DROP TYPE "public"."enum__pb_dhero_v_actions_icon";
  DROP TYPE "public"."enum__pb_dhero_v_actions_icon_position";
  DROP TYPE "public"."enum__pb_dhero_v_actions_link_type";
  DROP TYPE "public"."enum__pb_dhero_v_tag_icon";
  DROP TYPE "public"."enum__pages_v_version_icon";
  DROP TYPE "public"."enum__pages_v_version_width";
  DROP TYPE "public"."enum__pages_v_version_backdrop";
  DROP TYPE "public"."enum__pages_v_version_status";
  DROP TYPE "public"."enum_projects_address";
  DROP TYPE "public"."enum__projects_v_version_address";
  DROP TYPE "public"."enum_users_role";`);
}
