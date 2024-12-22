'use client'

import { useState } from 'react'
import SearchBar from '@/components/SearchBar'
import ProjectList from '@/components/ProjectList'
import ThemeToggle from '@/components/ThemeToggle'

export default function Home() {
  const [searchResults, setSearchResults] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [hasMore, setHasMore] = useState(false)
  const [currentQuery, setCurrentQuery] = useState('')

  const handleSearch = (results) => {
    setSearchResults(results)
    setCurrentPage(1)
  }

  const handleLoadMore = async () => {
    const nextPage = currentPage + 1
    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(currentQuery)}&page=${nextPage}`)
      const data = await response.json()
      
      if (response.ok) {
        setSearchResults([...searchResults, ...data.items])
        setHasMore(data.hasMore)
        setCurrentPage(nextPage)
      }
    } catch (error) {
      console.error('Load more error:', error)
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 transition-colors">
      <ThemeToggle />
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text">
            OpenSauce
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Discover amazing open source projects on GitHub
          </p>
        </div>
        <SearchBar 
          onSearchResults={handleSearch} 
          setHasMore={setHasMore}
          setCurrentQuery={setCurrentQuery}
        />
        <ProjectList 
          projects={searchResults} 
          hasMore={hasMore}
          onLoadMore={handleLoadMore}
        />
      </div>
    </main>
  )
}