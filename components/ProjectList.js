'use client'

import { useState } from 'react'

export default function ProjectList({ projects = [], hasMore, onLoadMore, isSearching }) {
  const [isLoading, setIsLoading] = useState(false)

  const handleLoadMore = async () => {
    setIsLoading(true)
    try {
      await onLoadMore()
    } finally {
      setIsLoading(false)
    }
  }

  if (projects.length === 0) {
    return (
      <div className="max-w-4xl mx-auto text-center text-gray-500 dark:text-gray-400">
        Search for GitHub projects to see results
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="space-y-4 mb-8">
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm hover:shadow-md transition-all border border-gray-100 dark:border-gray-700"
          >
            <h2 className="text-xl font-semibold text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300">
              <a href={project.html_url} target="_blank" rel="noopener noreferrer">
                {project.full_name}
              </a>
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mt-2">{project.description}</p>
            <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-gray-500 dark:text-gray-400">
              <span className="flex items-center gap-1">
                <span>⭐</span> {project.stargazers_count.toLocaleString()}
              </span>
              {project.language && (
                <span className="flex items-center gap-1">
                  <span>🔤</span> {project.language}
                </span>
              )}
              <span className="flex items-center gap-1">
                <span>🍴</span> {project.forks_count.toLocaleString()} forks
              </span>
              <span className="flex items-center gap-1">
                <span>👀</span> {project.watchers_count.toLocaleString()} watchers
              </span>
              <span className="flex items-center gap-1">
                <span>📝</span> {project.open_issues_count} issues
              </span>
              <span className="flex items-center gap-1">
                <span>🕒</span> {new Date(project.pushed_at).toLocaleDateString()}
              </span>
            </div>
          </div>
        ))}
      </div>
      
      {isSearching && hasMore && (
        <div className="text-center mb-8">
          <button
            onClick={handleLoadMore}
            disabled={isLoading}
            className="px-6 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors disabled:opacity-50"
          >
            {isLoading ? 'Loading...' : 'Load More'}
          </button>
        </div>
      )}
    </div>
  )
} 