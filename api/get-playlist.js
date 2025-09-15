import fetch from 'node-fetch';

export default async function handler(request, response) {
    const { playlistId } = request.query;

    if (!playlistId) {
        return response.status(400).json({ error: 'playlistId es un parámetro requerido.' });
    }

    try {
        // Se ha actualizado el nombre de la variable de entorno
        const apiKey = process.env.YOUTUBEAPIKEY; 
        const apiResponse = await fetch(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&key=${apiKey}&maxResults=50`);
        
        if (!apiResponse.ok) {
            throw new Error(`Error de la API de YouTube: ${apiResponse.statusText}`);
        }

        const data = await apiResponse.json();
        return response.status(200).json(data);

    } catch (error) {
        return response.status(500).json({ error: error.message });
    }
}
