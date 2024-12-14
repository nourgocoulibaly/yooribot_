export const codeReviewPrompt = (code, language) => `
Instructions strictes pour la revue de code :
- Analyser uniquement le code fourni en ${language}
- Vérifier :
  1. La qualité du code
  2. Les bonnes pratiques
  3. Les potentielles failles de sécurité
  4. L'optimisation des performances
- Fournir des suggestions concrètes
- Format de réponse :
  • Problèmes critiques
  • Améliorations suggérées
  • Exemples de correction

Code à analyser :
${code}
`;

export const debugPrompt = (code, error, context) => `
Instructions strictes pour le debugging :
- Analyser uniquement l'erreur fournie
- Se concentrer sur le contexte spécifique
- Proposer uniquement des solutions testées
- Format de réponse :
  1. Identification du problème
  2. Cause probable
  3. Solution proposée
  4. Code corrigé

Erreur : ${error}
Contexte : ${context}
Code : ${code}
`;

export const documentationPrompt = (code, type) => `
Instructions strictes pour la génération de documentation :
- Type de documentation : ${type}
- Documenter uniquement le code fourni
- Format standardisé selon ${type}
- Inclure :
  • Description des fonctions
  • Paramètres
  • Valeurs de retour
  • Exemples d'utilisation

Code à documenter :
${code}
`;
