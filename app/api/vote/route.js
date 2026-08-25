import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Term from "@/models/Term";

export async function POST(request) {
  try {
    await dbConnect();
    const { termId, definitionId, delta } = await request.json();

    if (!termId || !definitionId || ![1, -1].includes(delta)) {
      return NextResponse.json({ success: false, error: "Invalid request payload" }, { status: 400 });
    }

    const updateQuery = delta === 1
      ? { $inc: { "definitions.$.upvotes": 1, "definitions.$.score": 1 } }
      : { $inc: { "definitions.$.downvotes": 1, "definitions.$.score": -1 } };

    const updated = await Term.findOneAndUpdate(
      { _id: termId, "definitions._id": definitionId },
      updateQuery,
      { new: true }
    );

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
