'use client'

import { useState } from 'react'

const FILTER_OPTIONS = [
  { 
    id: 'best-match', 
    label: '🔍 Best Match',
    description: 'GitHub\'s smart ranking'
  },
  { 
    id: 'stars', 
    label: '⭐ Most Stars',
    description: 'Most popular projects'
  },
  { 
    id: 'beginner-friendly', 
    label: '🌱 Beginner Friendly',
    description: 'Projects ideal for first-time contributors'
  },
  { 
    id: 'active', 
    label: '🔥 Recently Active',
    description: 'Recently updated projects'
  },
  { 
    id: 'trending', 
    label: '📈 Trending',
    description: 'New projects gaining traction'
  },
]

export default function SearchBar({ onSearchResults, setHasMore, setCurrentQuery }) {
  const [query, setQuery] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)
  const [filter, setFilter] = useState('best-match')

  const performSearch = async (searchQuery, searchFilter) => {
    setIsLoading(true)
    try {
      const response = await fetch(
        `/api/search?q=${encodeURIComponent(searchQuery)}&filter=${searchFilter}&page=1`
      )
      const data = await response.json()
      
      if (response.ok) {
        onSearchResults(data.items)
        setHasMore(data.hasMore)
        setCurrentQuery(searchQuery)
        setHasSearched(true)
      } else {
        console.error('Search failed:', data.error)
      }
    } catch (error) {
      console.error('Search error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSearch = async (e) => {
    e.preventDefault()
    if (!query.trim()) return
    await performSearch(query, filter)
  }

  const handleFilterChange = async (newFilter) => {
    setFilter(newFilter)
    if (query.trim()) {
      await performSearch(query, newFilter)
    }
  }

  return (
    <div className="max-w-2xl mx-auto mb-12">
      <form onSubmit={handleSearch} className="space-y-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for projects (e.g., Python, React)"
            className="flex-1 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors"
            disabled={isLoading}
          />
          <button
            type="submit"
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 dark:hover:bg-blue-400 transition-colors disabled:bg-blue-300 dark:disabled:bg-blue-700"
            disabled={isLoading}
          >
            {isLoading ? 'Searching...' : 'Search'}
          </button>
        </div>
        
        {hasSearched && (
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2 justify-center">
              {FILTER_OPTIONS.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => handleFilterChange(option.id)}
                  disabled={isLoading}
                  className={`group relative px-4 py-2 rounded-full text-sm transition-colors ${
                    filter === option.id
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                  } disabled:opacity-50`}
                >
                  {option.label}
                  {/* Tooltip */}
                  <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 text-xs text-white bg-gray-900 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {option.description}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}
      </form>
    </div>
  )
} 