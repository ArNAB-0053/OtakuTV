import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get('page') || '1';
  const limit = searchParams.get('limit') || '24';

  try {
    const response = await axios.get(`https://api.jikan.moe/v4/anime?page=${page}&limit=${limit}`);
    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json({ error: 'An error occurred while fetching the data.' }, { status: 500 });
  }
}