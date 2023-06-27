import { supabase } from "~/server/supabase";


export default defineEventHandler(async (event) => {

  const { data: notes, error } = await supabase
    .from('notes')
    .select();

  return {
    data: notes,
  }
});