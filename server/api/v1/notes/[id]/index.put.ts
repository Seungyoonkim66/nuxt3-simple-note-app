import { IdSchema } from '~/server/schemas/params.schema';
import { NoteSchema } from '~/server/schemas/note.schema';
// import { supabase } from '~/server/supabase';
import { createTeaser, extractTextFromHtml } from "~/server/utils/teaser.util";
import { db } from '~/server/db';
import { notes, notes as notesTable } from '~/server/db/schema';
import { eq } from 'drizzle-orm';

export default defineTryCatchHandler(async (event) => {
  const parsedId = IdSchema.parse(event.context.params?.id);

  const body = await readBody(event);

  const note = NoteSchema.parse(body);

  const updatedNotes = await db.update(notesTable)
    .set({
      title: note.title,
      content: note.content,
      teaser: createTeaser(extractTextFromHtml(note.content), 100),
      updated_at: new Date(),
    })
    .where(eq(notesTable.id, parsedId))
    .returning({ id: notesTable.id });
    
  if (updatedNotes.length === 0) {
    return throwError(event, {
      statusCode: 404,
    });
  }
  
  // const { data:updatedNotes, error } = await supabase.from('notes').update({
    // title: note.data.title,
    // content: note.data.content,
    // teaser: createTeaser(extractTextFromHtml(note.data.content), 100),
    // updated_at: new Date().toISOString(),
  // }).eq('id', parsedId.data).select('id');

  // if (error) {
  //   return throwError(event, createError({
  //     statusCode: 500,
  //     statusMessage: 'Internal server error',
  //   }));
  // }


  return {
    data: updatedNotes[0],
  }
})