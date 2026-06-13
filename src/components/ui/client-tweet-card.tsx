"use client"

import { Component, ReactNode } from "react"
import { TweetProps, useTweet } from "react-tweet"

import {
  MagicTweet,
  TweetNotFound,
  TweetSkeleton,
} from "@/components/ui/tweet-card"

class TweetErrorBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return null
    }
    return this.props.children
  }
}

const TweetCardInner = ({
  id,
  apiUrl,
  fallback = <TweetSkeleton />,
  components,
  fetchOptions,
  onError,
  ...props
}: TweetProps & { className?: string }) => {
  const { data, error, isLoading } = useTweet(id, apiUrl, fetchOptions)

  if (isLoading) return fallback
  if (error || !data) return null
  if (!("text" in data) && !("__typename" in data)) return null

  return <MagicTweet tweet={data} {...props} />
}

export const ClientTweetCard = (props: TweetProps & { className?: string }) => {
  return (
    <TweetErrorBoundary>
      <TweetCardInner {...props} />
    </TweetErrorBoundary>
  )
}
