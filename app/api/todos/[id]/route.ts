import { NextResponse } from "next/server";
import db from "../../../../lib/fakeDb";

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  const id = Number(params.id);
  const item = db.getById(id);
  if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(item);
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const id = Number(params.id);
  try {
    const body = await req.json();
    const updated = db.update(id, { title: body.title, completed: body.completed });
    if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(updated);
  } catch {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  const id = Number(params.id);
  const ok = db.delete(id);
  if (!ok) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ success: true });
}