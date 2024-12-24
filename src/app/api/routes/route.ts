import { openDB } from "@/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const db = await openDB();  // Connexion to database
    const tasks = await db.all("SELECT * FROM tasks"); // Store result of SQL Query
    return NextResponse.json(tasks);
  } catch (error) {
    console.error("Error retrieving tasks:", error);
    return new NextResponse("Internal Server Error", { status: 500 }); // Return Error Status
  }
}

export async function POST(req: NextRequest) {
    try {
    const body = await req.json(); 
    const { title, description } = body; // Store Body of Request in an usable object
    if (!title || !description) {
      return new NextResponse("Title and description are required", { status: 400 });
    }
    const db = await openDB();
    const result = await db.run(
      "INSERT INTO tasks (title, description) VALUES (?, ?)",
      [title, description]
    ); // Run a SQL Query without waiting for data in response
    return NextResponse.json({ id: result.lastID, title, description }, { status: 201 });
  } catch (error) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
    try {
      const { searchParams } = new URL(req.url);
      const id = searchParams.get("id"); // Retrieve Id of wanted task from request
  
      if (!id) {
        return new NextResponse("Task ID is required", { status: 400 });
      }
  
      const db = await openDB();
      const result = await db.run("DELETE FROM tasks WHERE id = ?", [id]);
  
      if (result.changes === 0) {
        return new NextResponse("Task not found", { status: 404 });
      }
  
      return new NextResponse("Task deleted successfully", { status: 200 });
    } catch (error) {
      console.error("Error deleting task:", error);
      return new NextResponse("Internal Server Error", { status: 500 });
    }
  }