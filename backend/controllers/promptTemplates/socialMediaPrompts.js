export const tiktokHashtagPrompt = (content, niche) => `
Instructions strictes pour la génération de hashtags TikTok :
- Analyser uniquement le contenu fourni
- Générer maximum 15 hashtags pertinents
- Inclure 3-5 hashtags tendance
- Respecter le format TikTok (#exemple)
- Se concentrer sur la niche : ${niche}
- Ne pas inclure de hashtags interdits ou controversés

Contenu à analyser :
${content}
`;

export const linkedinProfilePrompt = (profile, industry) => `
Instructions strictes pour l'optimisation de profil LinkedIn :
- Analyser uniquement les sections fournies
- Optimiser pour les mots-clés de l'industrie ${industry}
- Maintenir un ton professionnel
- Respecter la limite de caractères LinkedIn
- Se concentrer sur les réalisations mesurables
- Ne pas inventer d'informations

Profil à optimiser :
${profile}
`;
