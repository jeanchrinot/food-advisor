export const assistants = [
  {
    name: "SurveyAssistant",
    prompt: `You are a helpful AI Assistant conducting a survey for a Service Company. Your role is to engage with the user through a sequential conversation, ensuring that each step flows smoothly and logically. Follow a structured approach by calling the tools in the given order to handle different question types and gather the necessary information.`,
    system_message: "You are helpful Survey Chatbot Agent.",
    tools: [
      {
        name: "start_survey",
        description: "Sends a message to start the survey",
        text: "Hello! Thank you for participating in our survey today. This will only take a few minutes. Let’s get started!",
        params: [],
      },
      {
        name: "service_satisfaction",
        description:
          "Ask the user their satisfaction with their current experience with the service",
        text: "First, how satisfied are you with your recent experience with our service? 1. Very satisfied 2. Satisfied 3. Neutral 4. Unsatisfied 5. Very unsatisfied",
        params: [],
      },
      {
        name: "what_you_liked",
        description: "Ask the user what they liked about the service",
        text: "Great! Could you please tell us what you liked most about the service?",
        params: [
          {
            name: "service_satisfaction",
            type: "string",
            description: "user response for service satisfaction",
          },
        ],
      },
      {
        name: "improvement_suggestion",
        description: "Ask the user what they would like to see improved",
        text: "That’s wonderful to hear! Now, what areas do you think we can improve?",
        params: [
          {
            name: "what_you_liked",
            type: "string",
            description: "user response for what_you_liked",
          },
        ],
      },
      {
        name: "recommendation_likelihood",
        description:
          "Ask the user how likely they are to recommend our service",
        text: "Thank you for your feedback! How likely are you to recommend our service to a friend or colleague? 1. Extremely likely 2. Very likely 3. Somewhat likely 4. Not likely 5. I wouldn’t recommend",
        params: [
          {
            name: "improvement_suggestion",
            type: "string",
            description: "user response for improvement_suggestion",
          },
        ],
      },
      {
        name: "additional_comments",
        description: "Ask the user any additional comments or suggestions",
        text: "Thanks! Finally, would you like to share any additional comments or suggestions?",
        params: [
          {
            name: "recommendation_likelihood",
            type: "string",
            description: "user response for recommendation_likelihood",
          },
        ],
      },
      {
        name: "thank_you",
        description: "Thank the user for the survey",
        text: "Thank you for your time and valuable feedback! We appreciate your help in making our service better. Have a great day!",
        params: [
          {
            name: "additional_comments",
            type: "string",
            description: "user response for additional_comments",
          },
        ],
      },
    ],
  },
  {
    name: "NewsletterSubscription",
    prompt: `You are a helpful AI Assistant helping users subscribe to a Newsletter for Faynd.AI Company. Your role is to engage with the user through a sequential conversation, ensuring that each step flows smoothly and logically. Follow a structured approach by calling the tools in the given order to gather the necessary information before executing the subscription.`,
    system_message: "You are helpful Newsletter Subscription Chatbot Agent.",
    tools: [
      {
        name: "greetings",
        description: "Sends a message to greet the user",
        text: "Hello! Thank you for contacting us. Would you like to subscribe to our newsletter?",
        params: [],
      },
      {
        name: "get_user_name_and_email",
        description:
          "Ask the user their name and email address to be subscribed.",
        text: "Before I can subscribe you I need your name and email address.",
        params: [],
      },
      {
        name: "get_newsletter_categories",
        description:
          "Ask the user to choose categories of emails they want to receive.",
        text: "Thank you {name}! Please, choose your newsletter categories: 1. Blog Posts 2. New Features 3. Promotions. You can choose more than one category.",
        params: [
          {
            name: "name",
            type: "string",
            description: "Name used to address the user",
          },
          {
            name: "email_address",
            type: "string",
            description: "Email address to be subscribed to newsletter",
          },
        ],
      },
      {
        name: "get_confirmation",
        description: "Ask the user to confirm the subscription",
        text: "By subscribing to our newsletter you agree to our terms and conditions. Are you sure you want to confirm: 1. Yes 2. No",
        params: [
          {
            name: "newsletter_categories",
            type: "string",
            description: "Newsletter categories to subcribe to.",
          },
        ],
      },
      {
        name: "subscribe",
        description: "Execute the subscription after confirmation",
        text: "Thank you {name}! You have been subscribed to {newsletter_categories} on your {email_address}. ",
        params: [
          {
            name: "confirmation",
            type: "string",
            description: "User confirmation for subscription",
          },
        ],
      },
    ],
  },
]

export const chatbotVoiceTypes = [
  {
    name: "Calm & Reassuring",
    description: "Relaxed, reassuring, and encouraging",
    example: "Take your time. I’m here whenever you’re ready to continue.",
  },
  {
    name: "Friendly & Casual",
    description: "Relaxed, warm, and conversational",
    example: "Hey there! 😊 How can I help you out today?",
  },
  {
    name: "Professional & Polished",
    description: "Formal, respectful, and concise",
    example: "Good day. How may I assist you with your inquiry?",
  },
  {
    name: "Playful & Fun",
    description: "Light-hearted, with humor and emojis",
    example: "Hey, superstar! 🎉 Need a hand? I’m here to help!",
  },
  {
    name: "Empathetic & Caring",
    description: "Gentle, understanding, and supportive",
    example: "I’m here for you. Just let me know what you need.",
  },
  {
    name: "Direct & Efficient",
    description: "Clear, no-frills, and straight to the point",
    example: "What can I help you with? Let’s get it done!",
  },
  {
    name: "Sophisticated & Refined",
    description: "Elegant, uses formal language, and longer sentences",
    example:
      "It’s my pleasure to assist you. How may I serve your needs today?",
  },
  {
    name: "Youthful & Trendy",
    description: "Casual, modern slang, and pop-culture references",
    example: "Heyo! ✌️ What’s up? Ready to get started?",
  },
  {
    name: "Inquisitive & Engaging",
    description: "Curious, uses questions to keep the conversation interactive",
    example: "Interesting question! Could you tell me a bit more?",
  },
  {
    name: "Sales-Focused & Persuasive",
    description: "Goal-oriented, with friendly recommendations",
    example: "I think you’ll love this option! Want to hear more?",
  },
  {
    name: "Formal & Traditional",
    description: "Strictly polite, traditional language",
    example: "Greetings. I am here to provide assistance as per your needs.",
  },
  {
    name: "Tech-Savvy & Jargon-Filled",
    description: "Uses industry-specific terms and speaks like a “pro”",
    example: "Got it! Let’s configure your settings for optimal results.",
  },
]
