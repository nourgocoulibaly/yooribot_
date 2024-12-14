// backend/controllers/chatController.js
import Groq from "groq-sdk";
import dotenv from 'dotenv';

dotenv.config();

// Initialiser Groq avec la clé API
const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
});

// Vérifier la présence de la clé API au démarrage
if (!process.env.GROQ_API_KEY) {
    console.error('ERREUR: GROQ_API_KEY n\'est pas définie dans le fichier .env');
    process.exit(1);
}

// Stockage temporaire des conversations
const conversations = new Map();

// Export des fonctions
export const handleChatRoute = async (req, res) => {
    try {
        const { message } = req.body;
        const conversationId = Date.now().toString();
        
        // Initialiser la conversation
        conversations.set(conversationId, {
            message,
            response: '',
            isComplete: false,
            chunks: []
        });

        // Démarrer le traitement en arrière-plan
        processChat(conversationId, message);

        res.json({ conversationId });
    } catch (error) {
        console.error('Erreur d\'initialisation:', error);
        res.status(500).json({ message: 'Erreur d\'initialisation du chat' });
    }
};

export const getStreamResponse = async (req, res) => {
    try {
        const { conversationId } = req.params;
        const conversation = conversations.get(conversationId);

        if (!conversation) {
            return res.status(404).json({ message: 'Conversation non trouvée' });
        }

        // Renvoyer le prochain chunk disponible
        const chunk = conversation.chunks.shift() || '';
        
        res.json({
            content: chunk,
            isComplete: conversation.isComplete && conversation.chunks.length === 0
        });

        // Nettoyer si la conversation est terminée
        if (conversation.isComplete && conversation.chunks.length === 0) {
            conversations.delete(conversationId);
        }

    } catch (error) {
        console.error('Erreur de streaming:', error);
        res.status(500).json({ message: 'Erreur de streaming' });
    }
};

async function processChat(conversationId, message) {
    try {
        const conversation = conversations.get(conversationId);
        
        const completion = await groq.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: "Tu es un assistant amical et serviable qui répond en français.",
                },
                {
                    role: "user",
                    content: message,
                },
            ],
            model: "mixtral-8x7b-32768",
            temperature: 0.5,
            max_tokens: 1024,
            stream: true,
        });

        for await (const chunk of completion) {
            const content = chunk.choices[0]?.delta?.content || "";
            if (content) {
                conversation.chunks.push(content);
                conversation.response += content;
            }
        }

        conversation.isComplete = true;
    } catch (error) {
        console.error('Erreur de traitement:', error);
        const conversation = conversations.get(conversationId);
        if (conversation) {
            conversation.isComplete = true;
            conversation.error = error.message;
        }
    }
}
