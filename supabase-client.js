(function () {
  var config = window.SUPABASE_CONFIG;
  var keyPlaceholder = 'YOUR_SUPABASE_PUBLISHABLE_OR_ANON_KEY';

  window.getSupabaseClient = function () {
    if (!window.supabase || typeof window.supabase.createClient !== 'function') {
      throw new Error('Supabase client library did not load. Check your internet connection.');
    }
    if (!config || !config.url || !config.publishableKey || config.publishableKey === keyPlaceholder) {
      throw new Error('Add your Supabase publishable/anon key to supabase-config.js before connecting.');
    }
    if (!window.supabaseClient) {
      window.supabaseClient = window.supabase.createClient(config.url, config.publishableKey);
    }
    return window.supabaseClient;
  };
})();
