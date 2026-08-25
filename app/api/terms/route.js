import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Term from "@/models/Term";
import fallbackTerms from "@/lib/fallbackTerms";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const tag = searchParams.get("tag");
  const query = tag && tag !== "all" ? { tags: tag } : {};

  try {
    await dbConnect();
    const terms = await Term.find(query).sort({ "definitions.score": -1 }).limit(25);

    return NextResponse.json({ success: true, data: terms });
  } catch (error) {
    const terms = fallbackTerms
      .filter((term) => !query.tags || term.tags.includes(query.tags))
      .slice(0, 25);

    return NextResponse.json({
      success: true,
      data: terms,
      fallback: true
    });
  }
}

export async function POST(request) {
  try {
    await dbConnect();
    const body = await request.json();
    const { term, expansion, meaning, tone, origin, examples, tags } = body;

    if (!term || !expansion || !meaning) {
      return NextResponse.json({ success: false, error: "Missing required fields." }, { status: 400 });
    }

    const cleanTerm = term.trim().toLowerCase();
    const slug = cleanTerm.replace(/\s+/g, "-");

    let existingTerm = await Term.findOne({ slug });

    const newDef = {
      expansion,
      meaning,
      tone: tone || "casual",
      origin: origin || "Internet Chat",
      examples: examples || [],
      upvotes: 1,
      downvotes: 0,
      score: 1
    };

    if (existingTerm) {
      existingTerm.definitions.push(newDef);
      if (tags && tags.length) {
        existingTerm.tags = Array.from(new Set([...existingTerm.tags, ...tags]));
      }
      await existingTerm.save();
      return NextResponse.json({ success: true, data: existingTerm });
    }

    const created = await Term.create({
      term: cleanTerm,
      slug,
      tags: tags || ["chat"],
      definitions: [newDef]
    });

    return NextResponse.json({ success: true, data: created }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}