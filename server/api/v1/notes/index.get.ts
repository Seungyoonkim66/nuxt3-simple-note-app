// import { supabase } from "~/server/supabase";
import { db } from '~/server/db';
import { notes as notesTable } from '~/server/db/schema';

export default defineEventHandler(async (event) => {

  const notes = await db.select().from(notesTable);

  // const { data: notes, error } = await supabase
  //   .from('notes')
  //   .select();

  return {
    data: notes,
  }
});