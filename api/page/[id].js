export default async function handler(req, res) {
    const { id } = req.query;
    
    const SUPABASE_URL = 'https://uojitzszwmugkzecwdbt.supabase.co';
    const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVvaml0enN6d211Z2t6ZWN3ZGJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQyODAyNDQsImV4cCI6MjA5OTg1NjI0NH0.4aL0xfYyP_sKQDAc15mCnihWHrit1MEl86FmxI5Amrs';

    try {
        const response = await fetch(
            `${SUPABASE_URL}/rest/v1/pages?id=eq.${id}&select=html_content`,
            {
                headers: {
                    'apikey': SUPABASE_KEY,
                    'Authorization': `Bearer ${SUPABASE_KEY}`
                }
            }
        );
        const data = await response.json();
        if (!data || data.length === 0) {
            res.status(404).send(`<h1>404 — Страница не найдена</h1><p>ID: ${id}</p><a href="/">Вернуться</a>`);
            return;
        }
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.status(200).send(data[0].html_content);
    } catch (error) {
        res.status(500).send('Ошибка сервера');
    }
}
