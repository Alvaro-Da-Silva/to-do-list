import { NextResponse } from "next/server";
import db from "../../../lib/fakeDb";

export async function GET() {
  const data = db.getAll();
  return NextResponse.json(data);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!body?.title) {
      return NextResponse.json({ error: "title is required" }, { status: 400 });
    }
    const created = db.create({ title: body.title, completed: !!body.completed, userId: body.userId });
    return NextResponse.json(created, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }
}