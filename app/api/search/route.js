import { NextResponse } from 'next/server'

const GITHUB_API_URL = 'https://api.github.com/search/repositories'
const PER_PAGE = 10

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q')
  const page = parseInt(searchParams.get('page')) || 1
  
  if (!query) {
    return NextResponse.json({ error: 'Query parameter is required' }, { status: 400 })
  }

  try {
    const response = await fetch(
      `${GITHUB_API_URL}?q=${query}&sort=stars&order=desc&page=${page}&per_page=${PER_PAGE}`,
      {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          // Add your GitHub token here if you have one
          // 'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`
        },
      }
    )

    const data = await response.json()
    return NextResponse.json({
      items: data.items,
      total_count: data.total_count,
      hasMore: data.items?.length === PER_PAGE
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch from GitHub API' },
      { status: 500 }
    )
  }
} 