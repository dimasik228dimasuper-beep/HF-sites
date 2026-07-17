export default async function handler(req, res) {
    const { id } = req.query;  // ← Это ID из URL (может быть и текстом, и UUID)
    
    const SUPABASE_URL = 'https://uojitzszwmugkzecwdbt.supabase.co';
    const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVvaml0enN6d211Z2t6ZWN3ZGJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQyODAyNDQsImV4cCI6MjA5OTg1NjI0NH0.4aL0xfYyP_sKQDAc15mCnihWHrit1MEl86FmxI5Amrs';

    try {
        // Ищем страницу по ID (теперь поддерживает любые ID!)
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
            res.status(404).send(`
                <!DOCTYPE html>
                <html>
                <head><title>404 — Страница не найдена</title></head>
                <body style="font-family: Arial; text-align: center; padding: 50px; background: #0a0a0f; color: white;">
                    <h1 style="color: #f5576c;">😕 404</h1>
                    <p>Страница с ID <code>${id}</code> не найдена</p>
                    <a href="/" style="color: #f093fb;">Вернуться на HF Sites</a>
                </body>
                </html>
            `);
            return;
        }

        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.setHeader('Cache-Control', 'public, max-age=3600');
        res.status(200).send(data[0].html_content);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Ошибка сервера');
    }
}
