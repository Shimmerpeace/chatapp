"use client";
import { useEffect, useState } from "react";

export default function TweetList({ newTweet }) {
  const [tweets, setTweets] = useState([]);

  // Load tweets once on mount
  useEffect(() => {
    fetch("/api/tweets")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setTweets(data.tweets);
      });
  }, []);

  // Update when new tweet is added
  useEffect(() => {
    if (newTweet) {
      setTweets((prev) => [newTweet, ...prev]);
    }
  }, [newTweet]);

  return (
    <div className="space-y-4">
      {tweets.length === 0 ? (
        <p>No tweets yet.</p>
      ) : (
        tweets.map((tweet) => (
          <div
            key={tweet.id}
            className="p-4 border rounded-lg bg-white shadow text-gray-800"
          >
            <div className="font-bold">{tweet.author.name}</div>
            <p>{tweet.text}</p>
            <div className="text-xs text-gray-500">
              {new Date(tweet.timestamp).toLocaleString()}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
