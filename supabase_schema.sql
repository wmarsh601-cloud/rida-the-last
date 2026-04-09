
-- BASE TABLES (CREATE FIRST)
create table if not exists users (
  id uuid primary key default uuid_generate_v4(),
  email text unique not null,
  name text not null,
  role text not null check (role in ('client', 'driver', 'vendor', 'admin')),
  created_at timestamp with time zone default now()
);

create table if not exists drivers (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references users(id) on delete cascade,
  license_number text not null,
  status text not null,
  created_at timestamp with time zone default now()
);

create table if not exists vendors (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references users(id) on delete cascade,
  store_name text not null,
  status text not null,
  created_at timestamp with time zone default now()
);

-- DEPENDENT TABLES
create table if not exists wallets (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references users(id) on delete cascade,
  balance numeric not null default 0,
  updated_at timestamp with time zone default now()
);

create table if not exists rides (
  id uuid primary key default uuid_generate_v4(),
  client_id uuid references users(id) on delete set null,
  driver_id uuid references drivers(id) on delete set null,
  origin jsonb not null,
  destination jsonb not null,
  status text not null,
  fare numeric,
  created_at timestamp with time zone default now()
);

create table if not exists transactions (
  id uuid primary key default uuid_generate_v4(),
  wallet_id uuid references wallets(id) on delete cascade,
  amount numeric not null,
  type text not null,
  description text,
  created_at timestamp with time zone default now()
);

create table if not exists sessions (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references users(id) on delete cascade,
  token text not null,
  expires_at timestamp with time zone not null,
  created_at timestamp with time zone default now()
);

create table if not exists documents (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references users(id) on delete cascade,
  url text not null,
  type text not null,
  status text not null,
  uploaded_at timestamp with time zone default now()
);

create table if not exists vehicles (
  id uuid primary key default uuid_generate_v4(),
  driver_id uuid references drivers(id) on delete cascade,
  plate text not null,
  model text not null,
  color text,
  year int,
  created_at timestamp with time zone default now()
);

create table if not exists reports (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references users(id) on delete set null,
  ride_id uuid references rides(id) on delete set null,
  type text not null,
  description text,
  created_at timestamp with time zone default now()
);

create table if not exists settings (
  id uuid primary key default uuid_generate_v4(),
  key text unique not null,
  value jsonb not null,
  updated_at timestamp with time zone default now()
);

-- RLS POLICIES
alter table users enable row level security;
create policy "Users: self or admin" on users
  for select using (auth.uid() = id or exists (select 1 from users as u where u.id = auth.uid() and u.role = 'admin'));

alter table drivers enable row level security;
create policy "Drivers: self or admin" on drivers
  for select using (user_id = auth.uid() or exists (select 1 from users as u where u.id = auth.uid() and u.role = 'admin'));

alter table vendors enable row level security;
create policy "Vendors: self or admin" on vendors
  for select using (user_id = auth.uid() or exists (select 1 from users as u where u.id = auth.uid() and u.role = 'admin'));

alter table rides enable row level security;
create policy "Rides: client, driver, admin" on rides
  for select using (
    (client_id = auth.uid())
    or (driver_id in (select id from drivers where user_id = auth.uid()))
    or exists (select 1 from users as u where u.id = auth.uid() and u.role = 'admin')
  );

alter table wallets enable row level security;
create policy "Wallets: self or admin" on wallets
  for select using (user_id = auth.uid() or exists (select 1 from users as u where u.id = auth.uid() and u.role = 'admin'));

alter table transactions enable row level security;
create policy "Transactions: wallet owner or admin" on transactions
  for select using (
    wallet_id in (select id from wallets where user_id = auth.uid())
    or exists (select 1 from users as u where u.id = auth.uid() and u.role = 'admin')
  );

alter table sessions enable row level security;
create policy "Sessions: self or admin" on sessions
  for select using (user_id = auth.uid() or exists (select 1 from users as u where u.id = auth.uid() and u.role = 'admin'));

alter table documents enable row level security;
create policy "Documents: self or admin" on documents
  for select using (user_id = auth.uid() or exists (select 1 from users as u where u.id = auth.uid() and u.role = 'admin'));

alter table vehicles enable row level security;
create policy "Vehicles: driver or admin" on vehicles
  for select using (
    driver_id in (select id from drivers where user_id = auth.uid())
    or exists (select 1 from users as u where u.id = auth.uid() and u.role = 'admin')
  );

alter table reports enable row level security;
create policy "Reports: self or admin" on reports
  for select using (user_id = auth.uid() or exists (select 1 from users as u where u.id = auth.uid() and u.role = 'admin'));

alter table settings enable row level security;
create policy "Settings: admin only" on settings
  for select using (exists (select 1 from users as u where u.id = auth.uid() and u.role = 'admin'));
