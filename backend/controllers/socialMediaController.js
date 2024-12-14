const handleTikTokContent = async (req, res) => {
    const { videoContent, targetAudience, niche } = req.body;
    
    const prompt = `
    Instructions strictes pour le contenu TikTok :
    - Générer uniquement :
      • 3-5 hashtags tendance
      • 10-15 hashtags nichés
      • Une description accrocheuse (≤150 caractères)
    - Public cible : ${targetAudience}
    - Niche : ${niche}
    - Style : Informel et engageant
    
    Contenu vidéo :
    ${videoContent}
    `;

    try {
        const response = await openai.createCompletion({
            model: "gpt-4",
            prompt: prompt,
            max_tokens: 500,
            temperature: 0.7
        });
        
        res.json({ 
            suggestions: response.data.choices[0].text,
            timestamp: new Date()
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const handleLinkedInOptimization = async (req, res) => {
    const { profileSection, industry, experience } = req.body;
    
    const prompt = `
    Instructions strictes pour l'optimisation LinkedIn :
    - Optimiser uniquement la section : ${profileSection}
    - Industrie : ${industry}
    - Expérience : ${experience} ans
    - Inclure :
      • Mots-clés pertinents
      • Réalisations quantifiables
      • Compétences recherchées
    - Style : Professionnel et concis
    `;

    try {
        const response = await openai.createCompletion({
            model: "gpt-4",
            prompt: prompt,
            max_tokens: 800,
            temperature: 0.4
        });
        
        res.json({ 
            optimizedContent: response.data.choices[0].text,
            suggestions: response.data.choices[0].suggestions
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    handleTikTokContent,
    handleLinkedInOptimization
};
