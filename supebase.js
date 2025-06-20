// Ganti dengan URL dan ANON KEY project Supabase kamu!
const supabaseUrl = 'https://xxxx.supabase.co';
const supabaseKey = 'YOUR_ANON_KEY';
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

async function fetchProducts() {
  let { data, error } = await supabase
    .from('products')
    .select('*')
    .order('id', { ascending: false });
  if (error) {
    console.error(error);
    return [];
  }
  return data;
}
