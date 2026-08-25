// Populates the database with a handful of starter terms so the app
// isn't an empty grid on first run.
//
// Usage: npm run seed
// (requires MONGODB_URI to be set, e.g. via .env.local)

import mongoose from "mongoose";
import Term from "../models/Term.js";

const seedTerms = [
  {
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
          { sender: "B", message: "ngl I forgot about it 💀" }
        ],
        upvotes: 12,
        downvotes: 1,
        score: 11
      }
    ]
  },
  {
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
          { sender: "A", message: "The exam is tomorrow and I haven't studied" },
          { sender: "B", message: "bro is cooked 😭" }
        ],
        upvotes: 20,
        downvotes: 2,
        score: 18
      }
    ]
  },
  {
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
    term: "mid",
    slug: "mid",
    tags: ["gaming", "chat"],
    definitions: [
      {
        expansion: "Mediocre",
        meaning: "Describes something that's just average or unimpressive, not good or bad.",
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

async function seed() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error("Missing MONGODB_URI. Set it in .env.local before seeding.");
    process.exit(1);
  }

  console.log("Connecting to MongoDB...");
  await mongoose.connect(uri);

  for (const t of seedTerms) {
    const exists = await Term.findOne({ slug: t.slug });
    if (exists) {
      console.log(`Skipped (already exists): ${t.term}`);
      continue;
    }
    await Term.create(t);
    console.log(`Added: ${t.term}`);
  }

  await mongoose.disconnect();
  console.log("Seeding complete.");
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
