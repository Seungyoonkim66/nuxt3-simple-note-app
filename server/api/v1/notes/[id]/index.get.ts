import { IdSchema } from '~/server/schemas/params.schema';
import { supabase } from '~/server/supabase';

export default defineEventHandler(async (event) => {
  const parsedId = IdSchema.safeParse(event.context.params?.id);

  if (!parsedId.success) {
    return sendError(event, createError({
      statusCode: 400,
      statusMessage: parsedId.error.message
    }));
  }

  const { data: notes, error } = await supabase.from('notes').select().eq('id', parsedId.data);

  if (error) {
    // log 코드 
    console.error(error.message);
    return sendError(event, createError({
      statusCode: 500,
      statusMessage: 'Internal server error'
    }))
  }

  if (notes.length === 0) {
    return sendError(event, createError({
      statusCode: 404,
      statusMessage: 'Note not found',
    }));
  }

  const currentViews = notes[0].views;

  const { data: updatedNotes, error: updateError } = await supabase.from('notes').update({
    views: currentViews + 1
  }).eq('id', notes[0].id).select();

  if (updateError) {
    return sendError(event, createError({
      statusCode: 500,
      statusMessage: 'Internal server error'
    }));
  }

  return {
    data: updatedNotes[0],
  }
})