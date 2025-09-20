import { NextResponse } from 'next/server';
import * as schema from '@/db/schema';

export async function GET() {
  // Basic reflection of Drizzle schema definition
  const tables = [
    {
      name: 'users',
      columns: {
        id: 'uuid pk',
        name: 'varchar(120) not null',
        email: 'varchar(255) unique not null',
        password_hash: 'text not null',
        bio: 'text',
        role: "user_role enum('USER','ADMIN') not null default 'USER'",
        created_at: 'timestamptz not null default now()',
        updated_at: 'timestamptz not null default now()'
      }
    },
    {
      name: 'posts',
      columns: {
        id: 'uuid pk',
        author_id: 'uuid not null references users(id) on delete cascade',
        title: 'varchar(200) not null',
        slug: 'varchar(220) unique not null',
        content: 'text not null',
        published: 'boolean not null default false',
        created_at: 'timestamptz not null default now()',
        updated_at: 'timestamptz not null default now()'
      }
    }
  ];

  return NextResponse.json({ dialect: 'postgresql', tables });
}


