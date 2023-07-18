import { IdSchema } from '~/server/schemas/params.schema';
import { NoteSchema } from '~/server/schemas/note.schema';
// import { supabase } from '~/server/supabase';
import { createTeaser, extractTextFromHtml } from "~/server/utils/teaser.util";
import { db } from '~/server/db';
import { notes, notes as notesTable } from '~/server/db/schema';
import { eq } from 'drizzle-orm';

export default defineTryCatchHandler(async (event) => {
  const parsedId = IdSchema.safeParse(event.context.params?.id);

  if (!parsedId.success) {
    return sendError(event, createError({
      statusCode: 400,
      statusMessage: parsedId.error.message
    }));
  }

  const body = await readBody(event);
  const note = NoteSchema.safeParse(body);

  if (!note.success) {
    return sendError(event, createError({
      statusCode: 400,
      statusMessage: note.error.message
    }));
  }
  
  const updatedNotes = await db.update(notesTable)
    .set({
      title: note.data.title,
      content: note.data.content,
      teaser: createTeaser(extractTextFromHtml(note.data.content), 100),
      updated_at: new Date(),
    })
    .where(eq(notesTable.id, parsedId.data))
    .returning({ id: notesTable.id });
    
  // const { data:updatedNotes, error } = await supabase.from('notes').update({
    // title: note.data.title,
    // content: note.data.content,
    // teaser: createTeaser(extractTextFromHtml(note.data.content), 100),
    // updated_at: new Date().toISOString(),
  // }).eq('id', parsedId.data).select('id');

  // if (error) {
  //   return sendError(event, createError({
  //     statusCode: 500,
  //     statusMessage: 'Internal server error',
  //   }));
  // }

  if (updatedNotes.length === 0) {
    return sendError(event, createError({
      statusCode: 404,
      statusMessage: 'Note not found'
    }));
  }


  return {
    data: updatedNotes[0],
  }
})