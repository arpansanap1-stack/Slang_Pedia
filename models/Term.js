import mongoose from "mongoose";

const ExampleSchema = new mongoose.Schema({
  sender: { type: String, default: "A" },
  message: { type: String, required: true }
});

const DefinitionSchema = new mongoose.Schema({
  expansion: { type: String, required: true },
  meaning: { type: String, required: true },
  tone: { 
    type: String, 
    enum: ["casual", "sarcastic", "work-safe", "brainrot", "hype"], 
    default: "casual" 
  },
  examples: [ExampleSchema],
  origin: { type: String, default: "Internet Chat" },
  upvotes: { type: Number, default: 0 },
  downvotes: { type: Number, default: 0 },
  score: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

const TermSchema = new mongoose.Schema(
  {
    term: { type: String, required: true, trim: true, lowercase: true, unique: true },
    slug: { type: String, required: true, trim: true, lowercase: true, unique: true },
    tags: [{ type: String, trim: true }],
    definitions: [DefinitionSchema]
  },
  { timestamps: true }
);

TermSchema.index({ term: "text", tags: "text" });

export default mongoose.models.Term || mongoose.model("Term", TermSchema);