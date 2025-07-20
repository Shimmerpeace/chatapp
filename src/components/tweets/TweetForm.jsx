'use client'
import { useState } from 'react'

export default function TweetForm({ user, onPost }) {
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    if (!text.trim()) return

    setLoading(true)
    const res = await fetch('/api/tweets', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, author: user })
    })

    const data = await res.json()
    setLoading(false)

    if (data.success) {
      setText('')
      onPost(data.tweet) // tell parent
    } else {
      alert(data.error)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mb-6 flex flex-col gap-3">
      <textarea
        placeholder="What's happening?"
        value={text}
        onChange={e => setText(e.target.value)}
        className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        rows={3}
        required
      />
      <button type="submit" disabled={loading} className="self-end px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600">
        {loading ? 'Posting...' : 'Tweet'}
      </button>
    </form>
  )
}