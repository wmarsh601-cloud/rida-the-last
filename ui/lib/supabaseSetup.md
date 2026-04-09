# Supabase Setup Requirements

- Auth enabled
- PostgreSQL active
- Realtime enabled
- Storage enabled
- RLS enabled

## Required Tables
- users
- drivers
- vendors
- rides
- wallets
- transactions
- sessions
- documents
- vehicles
- reports
- settings

## RLS Policies
- User: only their own info
- Driver: only their rides
- Vendor: only their store
- Admin: full access
