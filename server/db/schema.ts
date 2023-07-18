import { pgTable, serial, varchar, text, integer, timestamp } from 'drizzle-orm/pg-core';

export const notes = pgTable('notes', {
  id: serial('id').primaryKey(),
  title: varchar('title'),
  content: text('text'),
  views: integer('views'),
  teaser: text('teaser'),
  created_at: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updated_at: timestamp('updated_at', { withTimezone: true }).defaultNow(),
})