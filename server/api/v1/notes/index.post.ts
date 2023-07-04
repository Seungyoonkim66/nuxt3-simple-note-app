import { NoteSchema } from "~/server/schemas/note.schema";
import { supabase } from "~/server/supabase";
import { createTeaser, extractTextFromHtml } from "~/server/utils/teaser.util";


export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const parsedNote = NoteSchema.safeParse(body);

  if (!parsedNote.success) {
    return sendError(event, createError({
      statusCode: 400,
      statusMessage: parsedNote.error.message,
    }));
  }

  const { data, error } = await supabase.from('notes').insert({
    title: parsedNote.data.title,
    content: parsedNote.data.content,
    teaser: createTeaser(extractTextFromHtml(parsedNote.data.content), 100),
  }).select('id'); // create한 데이터의 id 컬럼 값만 가져올 수 있음 

  if (error) {
    // log 코드 
    return sendError(event, createError({
      statusCode: 500,
      statusMessage: 'Internal server error'
    }))
  }

  return {
    data: data[0],
  }
})