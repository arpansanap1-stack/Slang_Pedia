const fallbackTerms = [
  {
    _id: "fallback-ngl",
    term: "ngl",
    slug: "ngl",
    tags: ["chat"],
    definitions: [
      {
        expansion: "Not Gonna Lie",
        meaning: "Used before admitting something honestly, often something a little embarrassing.",
        tone: "casual",
        origin: "Texting",
        examples: [
          { sender: "A", message: "Bro did you finish the project?" },
          { sender: "B", message: "ngl I forgot about it" }
        ],
        upvotes: 12,
        downvotes: 1,
        score: 11
      }
    ]
  },
  {
    _id: "fallback-cooked",
    term: "cooked",
    slug: "cooked",
    tags: ["gen-z", "chat"],
    definitions: [
      {
        expansion: "In trouble / done for",
        meaning: "Describes being in serious trouble or having no way out of a bad situation.",
        tone: "brainrot",
        origin: "Internet Chat",
        examples: [
          { sender: "A", message: "The exam is tomorrow and I have not studied" },
          { sender: "B", message: "bro is cooked" }
        ],
        upvotes: 20,
        downvotes: 2,
        score: 18
      }
    ]
  },
  {
    _id: "fallback-delulu",
    term: "delulu",
    slug: "delulu",
    tags: ["gen-z", "tiktok"],
    definitions: [
      {
        expansion: "Delusional",
        meaning: "Playfully believing something unrealistic, usually about a crush or a dream outcome.",
        tone: "sarcastic",
        origin: "TikTok",
        examples: [
          { sender: "A", message: "I think the celebrity will notice my comment" },
          { sender: "B", message: "you are so delulu lol" }
        ],
        upvotes: 15,
        downvotes: 0,
        score: 15
      }
    ]
  },
  {
    _id: "fallback-goat",
    term: "goat",
    slug: "goat",
    tags: ["gaming", "chat"],
    definitions: [
      {
        expansion: "Greatest Of All Time",
        meaning: "Used to praise someone as the best at what they do.",
        tone: "hype",
        origin: "Sports/Gaming",
        examples: [
          { sender: "A", message: "He just clutched the whole game" },
          { sender: "B", message: "absolute goat" }
        ],
        upvotes: 30,
        downvotes: 1,
        score: 29
      }
    ]
  },
  {
    _id: "fallback-mid",
    term: "mid",
    slug: "mid",
    tags: ["gaming", "chat"],
    definitions: [
      {
        expansion: "Mediocre",
        meaning: "Describes something that is just average or unimpressive, not good or bad.",
        tone: "casual",
        origin: "Internet Chat",
        examples: [
          { sender: "A", message: "How was the movie?" },
          { sender: "B", message: "honestly kinda mid" }
        ],
        upvotes: 9,
        downvotes: 1,
        score: 8
      }
    ]
  }
];

export default fallbackTerms;
