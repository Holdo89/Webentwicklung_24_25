import { NextResponse } from "next/server";
import { query } from "../db";

export async function GET(req, res) {
  try {
    const results = await query('SELECT * FROM users');
    return NextResponse.json(results, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Some Error occured" }, { status: 500 });
  }
}


