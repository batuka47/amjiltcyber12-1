begin;

-- =========================================================
-- Extensions
-- =========================================================
create extension if not exists pgcrypto;

-- =========================================================
-- updated_at trigger function
-- =========================================================
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- =========================================================
-- PROFILES
-- Final shape:
-- - id
-- - role
-- - authority_level
-- - full_name
-- - gender
-- - avatar_url
-- - best_title
-- - quote
-- - login_name
-- - password_hash
-- - auth_user_id
-- - created_at
-- - updated_at
-- =========================================================
create table if not exists public.profiles (
  id uuid primary key default gen_random_uuid(),
  role text not null,
  authority_level integer not null default 1,
  full_name text not null,
  gender text,
  avatar_url text,
  best_title text,
  quote text,
  login_name text,
  password_hash text,
  auth_user_id uuid,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- rename bio -> quote if needed
do $$
begin
  if exists (
    select 1
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'profiles'
      and column_name = 'bio'
  ) and not exists (
    select 1
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'profiles'
      and column_name = 'quote'
  ) then
    alter table public.profiles rename column bio to quote;
  end if;
end $$;

-- add missing columns if they do not exist
alter table public.profiles
  add column if not exists authority_level integer not null default 1,
  add column if not exists quote text,
  add column if not exists login_name text,
  add column if not exists password_hash text,
  add column if not exists auth_user_id uuid,
  add column if not exists created_at timestamptz not null default now(),
  add column if not exists updated_at timestamptz not null default now();

-- constraints
do $$
begin
  if not exists (
    select 1 from pg_constraint
    where conname = 'profiles_role_check'
  ) then
    alter table public.profiles
      add constraint profiles_role_check
      check (role in ('student', 'teacher', 'admin'));
  end if;

  if not exists (
    select 1 from pg_constraint
    where conname = 'profiles_authority_level_check'
  ) then
    alter table public.profiles
      add constraint profiles_authority_level_check
      check (authority_level in (1, 2, 3));
  end if;
end $$;

-- unique indexes for login/auth binding
create unique index if not exists profiles_login_name_key
  on public.profiles (login_name)
  where login_name is not null;

create unique index if not exists profiles_auth_user_id_key
  on public.profiles (auth_user_id)
  where auth_user_id is not null;

create index if not exists idx_profiles_role on public.profiles(role);
create index if not exists idx_profiles_authority_level on public.profiles(authority_level);
create index if not exists idx_profiles_full_name on public.profiles(full_name);

drop trigger if exists trg_profiles_set_updated_at on public.profiles;
create trigger trg_profiles_set_updated_at
before update on public.profiles
for each row
execute function public.set_updated_at();

-- =========================================================
-- ACHIEVEMENTS
-- Final shape:
-- - id
-- - profile_id
-- - title
-- - description
-- - achieved_on
-- - created_at
-- =========================================================
create table if not exists public.achievements (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles(id) on delete cascade,
  title text not null,
  description text,
  achieved_on date,
  created_at timestamptz not null default now()
);

alter table public.achievements
  add column if not exists profile_id uuid,
  add column if not exists title text,
  add column if not exists description text,
  add column if not exists achieved_on date,
  add column if not exists created_at timestamptz not null default now();

-- remove image_url if it exists
alter table public.achievements
  drop column if exists image_url;

-- add FK if missing
do $$
begin
  if not exists (
    select 1 from pg_constraint
    where conname = 'achievements_profile_id_fkey'
  ) then
    alter table public.achievements
      add constraint achievements_profile_id_fkey
      foreign key (profile_id) references public.profiles(id) on delete cascade;
  end if;
end $$;

create index if not exists idx_achievements_profile_id on public.achievements(profile_id);
create index if not exists idx_achievements_achieved_on on public.achievements(achieved_on desc);

-- =========================================================
-- HOME HERO SLIDES
-- Final shape:
-- - id
-- - badge
-- - title
-- - highlight
-- - description
-- - image_url
-- - stat_left_label
-- - stat_right_label
-- - cta_primary_text
-- - cta_primary_href
-- - cta_secondary_text
-- - cta_secondary_href
-- - sort_order
-- - is_active
-- - created_at
-- - updated_at
-- =========================================================
create table if not exists public.home_hero_slides (
  id uuid primary key default gen_random_uuid(),
  badge text,
  title text not null,
  highlight text,
  description text,
  image_url text,
  stat_left_label text,
  stat_right_label text,
  cta_primary_text text,
  cta_primary_href text,
  cta_secondary_text text,
  cta_secondary_href text,
  sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.home_hero_slides
  add column if not exists badge text,
  add column if not exists title text,
  add column if not exists highlight text,
  add column if not exists description text,
  add column if not exists image_url text,
  add column if not exists stat_left_label text,
  add column if not exists stat_right_label text,
  add column if not exists cta_primary_text text,
  add column if not exists cta_primary_href text,
  add column if not exists cta_secondary_text text,
  add column if not exists cta_secondary_href text,
  add column if not exists sort_order integer not null default 0,
  add column if not exists is_active boolean not null default true,
  add column if not exists created_at timestamptz not null default now(),
  add column if not exists updated_at timestamptz not null default now();

create index if not exists idx_home_hero_slides_sort_order
  on public.home_hero_slides(sort_order);

create index if not exists idx_home_hero_slides_is_active
  on public.home_hero_slides(is_active);

drop trigger if exists trg_home_hero_slides_set_updated_at on public.home_hero_slides;
create trigger trg_home_hero_slides_set_updated_at
before update on public.home_hero_slides
for each row
execute function public.set_updated_at();

-- =========================================================
-- MEMORIES
-- Final shape:
-- - id
-- - type
-- - title
-- - description
-- - taken_at
-- - asset_url
-- - thumbnail_url
-- - is_public
-- - created_by
-- - created_at
-- - updated_at
-- - tag
-- - group_tag
-- =========================================================
create table if not exists public.memories (
  id uuid primary key default gen_random_uuid(),
  type text not null,
  title text not null,
  description text,
  taken_at timestamptz,
  asset_url text not null,
  thumbnail_url text,
  is_public boolean not null default true,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  tag text,
  group_tag text
);

alter table public.memories
  add column if not exists type text,
  add column if not exists title text,
  add column if not exists description text,
  add column if not exists taken_at timestamptz,
  add column if not exists asset_url text,
  add column if not exists thumbnail_url text,
  add column if not exists is_public boolean not null default true,
  add column if not exists created_by uuid,
  add column if not exists created_at timestamptz not null default now(),
  add column if not exists updated_at timestamptz not null default now(),
  add column if not exists tag text,
  add column if not exists group_tag text;

do $$
begin
  if not exists (
    select 1 from pg_constraint
    where conname = 'memories_type_check'
  ) then
    alter table public.memories
      add constraint memories_type_check
      check (type in ('image', 'video'));
  end if;

  if not exists (
    select 1 from pg_constraint
    where conname = 'memories_created_by_fkey'
  ) then
    alter table public.memories
      add constraint memories_created_by_fkey
      foreign key (created_by) references public.profiles(id) on delete set null;
  end if;
end $$;

create index if not exists idx_memories_created_by on public.memories(created_by);
create index if not exists idx_memories_is_public on public.memories(is_public);
create index if not exists idx_memories_taken_at on public.memories(taken_at desc);
create index if not exists idx_memories_tag on public.memories(tag);
create index if not exists idx_memories_group_tag on public.memories(group_tag);
create index if not exists idx_memories_type on public.memories(type);

drop trigger if exists trg_memories_set_updated_at on public.memories;
create trigger trg_memories_set_updated_at
before update on public.memories
for each row
execute function public.set_updated_at();

-- =========================================================
-- MEMORY PEOPLE
-- Final shape:
-- - memory_id
-- - profile_id
-- =========================================================
create table if not exists public.memory_people (
  memory_id uuid not null references public.memories(id) on delete cascade,
  profile_id uuid not null references public.profiles(id) on delete cascade,
  primary key (memory_id, profile_id)
);

do $$
begin
  if not exists (
    select 1 from pg_constraint
    where conname = 'memory_people_memory_id_fkey'
  ) then
    alter table public.memory_people
      add constraint memory_people_memory_id_fkey
      foreign key (memory_id) references public.memories(id) on delete cascade;
  end if;

  if not exists (
    select 1 from pg_constraint
    where conname = 'memory_people_profile_id_fkey'
  ) then
    alter table public.memory_people
      add constraint memory_people_profile_id_fkey
      foreign key (profile_id) references public.profiles(id) on delete cascade;
  end if;
end $$;

create index if not exists idx_memory_people_profile_id on public.memory_people(profile_id);

-- =========================================================
-- SPECIAL DAYS
-- Final shape:
-- - id
-- - slug
-- - title
-- - hero_title
-- - hero_subtitle
-- - hero_image_url
-- - type
-- - memory_tag
-- - is_public
-- - created_by
-- - created_at
-- - event_date
-- - updated_at
-- =========================================================
create table if not exists public.special_days (
  id uuid primary key default gen_random_uuid(),
  slug text not null,
  title text not null,
  hero_title text,
  hero_subtitle text,
  hero_image_url text,
  type text not null,
  memory_tag text,
  is_public boolean not null default true,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  event_date date,
  updated_at timestamptz not null default now()
);

alter table public.special_days
  add column if not exists slug text,
  add column if not exists title text,
  add column if not exists hero_title text,
  add column if not exists hero_subtitle text,
  add column if not exists hero_image_url text,
  add column if not exists type text,
  add column if not exists memory_tag text,
  add column if not exists is_public boolean not null default true,
  add column if not exists created_by uuid,
  add column if not exists created_at timestamptz not null default now(),
  add column if not exists event_date date,
  add column if not exists updated_at timestamptz not null default now();

-- drop old columns you removed from the schema
alter table public.special_days
  drop column if exists gallery_source,
  drop column if exists password_hash,
  drop column if exists youtube_url;

do $$
begin
  if not exists (
    select 1 from pg_constraint
    where conname = 'special_days_type_check'
  ) then
    alter table public.special_days
      add constraint special_days_type_check
      check (type in ('protected_video', 'photo_collection'));
  end if;

  if not exists (
    select 1 from pg_constraint
    where conname = 'special_days_created_by_fkey'
  ) then
    alter table public.special_days
      add constraint special_days_created_by_fkey
      foreign key (created_by) references public.profiles(id) on delete set null;
  end if;
end $$;

create unique index if not exists special_days_slug_key
  on public.special_days(slug);

create index if not exists idx_special_days_type on public.special_days(type);
create index if not exists idx_special_days_event_date on public.special_days(event_date desc);
create index if not exists idx_special_days_memory_tag on public.special_days(memory_tag);

drop trigger if exists trg_special_days_set_updated_at on public.special_days;
create trigger trg_special_days_set_updated_at
before update on public.special_days
for each row
execute function public.set_updated_at();

-- =========================================================
-- SPECIAL DAY STUDENTS
-- Final shape:
-- - special_day_id
-- - profile_id
-- =========================================================
create table if not exists public.special_day_students (
  special_day_id uuid not null references public.special_days(id) on delete cascade,
  profile_id uuid not null references public.profiles(id) on delete cascade,
  primary key (special_day_id, profile_id)
);

do $$
begin
  if not exists (
    select 1 from pg_constraint
    where conname = 'special_day_students_special_day_id_fkey'
  ) then
    alter table public.special_day_students
      add constraint special_day_students_special_day_id_fkey
      foreign key (special_day_id) references public.special_days(id) on delete cascade;
  end if;

  if not exists (
    select 1 from pg_constraint
    where conname = 'special_day_students_profile_id_fkey'
  ) then
    alter table public.special_day_students
      add constraint special_day_students_profile_id_fkey
      foreign key (profile_id) references public.profiles(id) on delete cascade;
  end if;
end $$;

create index if not exists idx_special_day_students_profile_id
  on public.special_day_students(profile_id);

-- =========================================================
-- SPECIAL DAY STUDENT VIDEOS
-- Final shape:
-- - id
-- - special_day_id
-- - profile_id
-- - title
-- - description
-- - youtube_url
-- - password_hash
-- - created_at
-- - updated_at
-- =========================================================
create table if not exists public.special_day_student_videos (
  id uuid primary key default gen_random_uuid(),
  special_day_id uuid not null references public.special_days(id) on delete cascade,
  profile_id uuid not null references public.profiles(id) on delete cascade,
  title text not null,
  description text,
  youtube_url text not null,
  password_hash text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.special_day_student_videos
  add column if not exists special_day_id uuid,
  add column if not exists profile_id uuid,
  add column if not exists title text,
  add column if not exists description text,
  add column if not exists youtube_url text,
  add column if not exists password_hash text,
  add column if not exists created_at timestamptz not null default now(),
  add column if not exists updated_at timestamptz not null default now();

do $$
begin
  if not exists (
    select 1 from pg_constraint
    where conname = 'special_day_student_videos_special_day_id_fkey'
  ) then
    alter table public.special_day_student_videos
      add constraint special_day_student_videos_special_day_id_fkey
      foreign key (special_day_id) references public.special_days(id) on delete cascade;
  end if;

  if not exists (
    select 1 from pg_constraint
    where conname = 'special_day_student_videos_profile_id_fkey'
  ) then
    alter table public.special_day_student_videos
      add constraint special_day_student_videos_profile_id_fkey
      foreign key (profile_id) references public.profiles(id) on delete cascade;
  end if;
end $$;

create index if not exists idx_special_day_student_videos_special_day_id
  on public.special_day_student_videos(special_day_id);

create index if not exists idx_special_day_student_videos_profile_id
  on public.special_day_student_videos(profile_id);

drop trigger if exists trg_special_day_student_videos_set_updated_at on public.special_day_student_videos;
create trigger trg_special_day_student_videos_set_updated_at
before update on public.special_day_student_videos
for each row
execute function public.set_updated_at();

-- =========================================================
-- Helpful comments
-- =========================================================
comment on column public.profiles.login_name is 'Username-style login identifier. Not an email.';
comment on column public.profiles.password_hash is 'Store only hashed passwords, never raw passwords.';
comment on column public.memories.tag is 'Used to connect memories to a photo_collection special day.';
comment on column public.memories.group_tag is 'Broad group label such as all_girls, all_boys, all_students.';
comment on column public.special_days.type is 'Allowed values: protected_video, photo_collection.';

commit;