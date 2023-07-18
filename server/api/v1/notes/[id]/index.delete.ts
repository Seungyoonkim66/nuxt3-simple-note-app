import { IdSchema } from "~/server/schemas/params.schema"
// import { supabase } from "~/server/supabase";
import { db } from '~/server/db';
import { notes as notesTable } from '~/server/db/schema';
import { eq } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  const parsedId = IdSchema.safeParse(event.context.params?.id);

  if (!parsedId.success) {
    return sendError(event, createError({
      statusCode: 400,
      statusMessage: parsedId.error.message
    }));
  }


  const deletedNote = await db.delete(notesTable)
    .where(eq(notesTable.id, parsedId.data));

  // const { error } = await supabase.from('notes').delete().eq('id', parsedId.data);

  // if (error) {
  //   return sendError(event, createError({
  //     statusCode: 500,
  //     statusMessage: 'Internal serever error'
  //   }));
  // }

  return {
    data: "success"
  }
})