import { IdSchema } from "~/server/schemas/params.schema"
// import { supabase } from "~/server/supabase";
import { db } from '~/server/db';
import { notes as notesTable } from '~/server/db/schema';
import { eq } from "drizzle-orm";

export default defineTryCatchHandler(async (event) => {
  const parsedId = IdSchema.parse(event.context.params?.id);

  await db.delete(notesTable)
    .where(eq(notesTable.id, parsedId));

  // const { error } = await supabase.from('notes').delete().eq('id', parsedId.data);

  // if (error) {
  //   return throwError(event, createError({
  //     statusCode: 500,
  //     statusMessage: 'Internal serever error'
  //   }));
  // }

  return {
    data: "success"
  }
})