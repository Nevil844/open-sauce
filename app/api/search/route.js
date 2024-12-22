import { NextResponse } from 'next/server'

const GITHUB_API_URL = 'https://api.github.com/search/repositories'
const PER_PAGE = 10

const githubHeaders = {
  'Accept': 'application/vnd.github.v3+json',
  ...(process.env.GITHUB_TOKEN && {
    'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`
  })
}

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q')
  const page = parseInt(searchParams.get('page')) || 1
  const filter = searchParams.get('filter') || 'best-match'
  
  if (!query) {
    return NextResponse.json({ error: 'Query parameter is required' }, { status: 400 })
  }

  try {
    // Build the search query
    let searchQuery = query
    let sortParam = ''
    let orderParam = 'desc'

    // Only add filter modifications if the query doesn't already contain advanced search parameters
    if (!query.includes('created:') && !query.includes('stars:')) {
      switch (filter) {
        case 'stars':
          sortParam = 'stars'
          break
        case 'beginner-friendly':
          // Focus on projects with good first issues and basic requirements
          const minStars = 50
          const maxStars = 1000
          searchQuery = `${query} 
            stars:${minStars}..${maxStars} 
            good-first-issues:>=1 
            archived:false 
            is:public`
            .replace(/\s+/g, ' ')
            .trim()
          
          // Sort by number of good first issues
          sortParam = 'updated'
          break
        case 'active':
          // Look for active repos with at least 100 stars
          const oneMonthAgo = new Date()
          oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1)
          const dateStr = oneMonthAgo.toISOString().split('T')[0]
          searchQuery = `${query} stars:>100 pushed:>${dateStr}`
          sortParam = 'updated'
          break
        case 'trending':
          // Look for new repos gaining traction
          const threeMonthsAgo = new Date()
          threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3)
          const trendingDateStr = threeMonthsAgo.toISOString().split('T')[0]
          searchQuery = `${query} created:>${trendingDateStr} stars:>50`
          sortParam = 'stars'
          break
      }
    }

    // Build the URL with proper encoding
    const searchUrl = new URL(GITHUB_API_URL)
    searchUrl.searchParams.append('q', searchQuery)
    if (sortParam) {
      searchUrl.searchParams.append('sort', sortParam)
      searchUrl.searchParams.append('order', orderParam)
    }
    searchUrl.searchParams.append('page', page.toString())
    searchUrl.searchParams.append('per_page', PER_PAGE.toString())

    console.log('Fetching:', searchUrl.toString()) // Debug log

    const response = await fetch(searchUrl, { 
      headers: githubHeaders,
      next: { revalidate: 60 }
    })

    if (!response.ok) {
      if (response.status === 403) {
        return NextResponse.json({ 
          error: 'Rate limit exceeded. Consider adding a GitHub token for more requests.',
          items: [],
          total_count: 0,
          hasMore: false
        }, { status: 403 })
      }
      if (response.status === 422) {
        return NextResponse.json({ 
          error: 'Invalid query. Please try a different search term.',
          items: [],
          total_count: 0,
          hasMore: false
        }, { status: 422 })
      }
      throw new Error(`GitHub API error: ${response.status}`)
    }

    const data = await response.json()
    
    if (!data.items) {
      return NextResponse.json({ 
        items: [], 
        total_count: 0, 
        hasMore: false 
      })
    }

    // Return the results
    return NextResponse.json({
      items: data.items,
      total_count: data.total_count,
      hasMore: data.items.length === PER_PAGE
    })

  } catch (error) {
    console.error('Search error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch from GitHub API', message: error.message },
      { status: 500 }
    )
  }
} 