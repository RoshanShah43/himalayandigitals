#!/usr/bin/env python
"""Test Supabase connection"""
from app import supabase

try:
    users = supabase.table('users').select('*').limit(1).execute()
    print('✅ Successfully connected to Supabase!')
    print(f'Found {len(users.data)} user(s)')
    if users.data:
        print(f'First user: {users.data[0]}')
except Exception as e:
    print(f'❌ Connection failed: {e}')
