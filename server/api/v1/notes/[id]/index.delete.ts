import { IdSchema } from "~/server/schemas/params.schema"
import { supabase } from "~/server/supabase";

export default defineEventHandler(async (event) => {
  const parsedId = IdSchema.safeParse(event.context.params?.id);

  if (!parsedId.success) {
    return sendError(event, createError({
      statusCode: 400,
      statusMessage: parsedId.error.message
    }));
  }

  const { error } = await supabase.from('notes').delete().eq('id', parsedId.data);

  if (error) {
    return sendError(event, createError({
      statusCode: 500,
      statusMessage: 'Internal serever error'
    }));
  }

  return {
    data: {
      id: parsedId.data
    }
  }
})