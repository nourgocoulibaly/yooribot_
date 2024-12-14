const handleCodeGeneration = async (req, res) => {
    const { language, requirements, context } = req.body;
    
    const prompt = `
    Instructions strictes pour la génération de code :
    - Langage cible : ${language}
    - Ne générer que du code fonctionnel
    - Inclure des commentaires explicatifs
    - Respecter les bonnes pratiques du langage ${language}
    - Ne pas inclure d'explications hors-code sauf si demandé
    
    Exigences spécifiques :
    ${requirements}
    
    Contexte du projet :
    ${context}
    `;

    try {
        const response = await openai.createCompletion({
            model: "gpt-4",
            prompt: prompt,
            max_tokens: 1500,
            temperature: 0.2 // Réduit la créativité pour du code plus précis
        });
        
        res.json({ code: response.data.choices[0].text });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
