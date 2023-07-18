import { IdSchema } from '~/server/schemas/params.schema';
import { eq, sql } from 'drizzle-orm';
import { db } from '~/server/db';
import { notes as notesTable } from '~/server/db/schema'; 
import { throwError } from '~/server/utils/throwError';

export default defineTryCatchHandler(async (event) => {

  const parsedId = IdSchema.safeParse(event.context.params?.id);

  if (!parsedId.success) {
    return throwError(event, {
      statusCode: 400,
      message: parsedId.error.message
    });
  }

  const notes = await db.update(notesTable)
    .set({ views: sql`views + 1` })
    .where(eq(notesTable.id, parsedId.data))
    .returning();

  if (notes.length === 0) {
    return throwError(event, {
      statusCode: 404,
    });
  }

  // const notes = await db.select()
  // .from(notesTable)
  // .where(eq(notesTable.id, parsedId.data));
  // // const { data: notes, error } = await supabase.from('notes').select().eq('id', parsedId.data);

  // // if (error) {
  // //   // log 코드 
  // //   console.error(error.message);
  // //   return throwError(event, createError({
  // //     statusCode: 500,
  // //     statusMessage: 'Internal server error'
  // //   }))
  // // }

  // const currentViews = notes[0].views;

  // const updatedNotes = await db.update(notesTable)
  //   .set({ views: currentViews + 1 })
  //   .where(eq(notesTable.id, parsedId.data))
  //   .returning();

  // // const { data: updatedNotes, error: updateError } = await supabase.from('notes').update({
  // //   views: currentViews + 1
  // // }).eq('id', notes[0].id).select();

  // // if (updateError) {
  // //   return throwError(event, createError({
  // //     statusCode: 500,
  // //     statusMessage: 'Internal server error'
  // //   }));
  // // }


  return {
    data: notes[0],
  }
})