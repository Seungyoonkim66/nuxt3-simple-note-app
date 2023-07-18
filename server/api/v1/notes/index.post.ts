import { NoteSchema } from "~/server/schemas/note.schema";
import { createTeaser, extractTextFromHtml } from "~/server/utils/teaser.util";
import { db } from '~/server/db';
import { notes } from '~/server/db/schema';


export default defineTryCatchHandler(async (event) => {
  const body = await readBody(event);

  const parsedNote = NoteSchema.parse(body);

  const newNoteData = await db.insert(notes).values({
    title: parsedNote.title,
    content: parsedNote.content,
    teaser: createTeaser(extractTextFromHtml(parsedNote.content), 100),
  }).returning({ id: notes.id });

  // const { data, error } = await supabase.from('notes').insert({
    // title: parsedNote.data.title,
    // content: parsedNote.data.content,
    // teaser: createTeaser(extractTextFromHtml(parsedNote.data.content), 100),
  // }).select('id'); // create한 데이터의 id 컬럼 값만 가져올 수 있음 

  // if (error) {
  //   // log 코드 
  //   return throwError(event, createError({
  //     statusCode: 500,
  //     statusMessage: 'Internal server error'
  //   }))
  // }

  return {
    data: newNoteData[0],
  }
})