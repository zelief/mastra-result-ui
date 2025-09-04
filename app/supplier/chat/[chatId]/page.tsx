"use client"

import { useState, useEffect, useRef } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { StateDisplay } from "@/components/state-display"
import { runSupplierCommunicationWorkflow, SupplierAgentState, Message } from "@/lib/api"

interface ChatData {
  state: SupplierAgentState
  conversation: Message[]
}

export default function SupplierChatPage() {
  const params = useParams()
  const router = useRouter()
  const chatId = params.chatId as string

  const [chatData, setChatData] = useState<ChatData | null>(null)
  const [message, setMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [hasInitialRun, setHasInitialRun] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Load initial chat data from localStorage
    const stored = localStorage.getItem(`supplier-chat-${chatId}`)
    if (stored) {
      const data = JSON.parse(stored) as ChatData
      setChatData(data)

      // Run initial workflow if no conversation yet
      if (data.conversation.length === 0 && !hasInitialRun) {
        runInitialWorkflow(data)
      }
    } else {
      router.push('/supplier')
    }
  }, [chatId, router, hasInitialRun])

  useEffect(() => {
    // Auto-scroll to bottom when new messages arrive
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [chatData?.conversation])

  const runInitialWorkflow = async (data: ChatData) => {
    setHasInitialRun(true)
    setIsLoading(true)

    try {
      const result = await runSupplierCommunicationWorkflow({
        state: data.state,
        conversation: data.conversation
      })

      const updatedData = {
        state: result.state,
        conversation: result.conversation
      }

      setChatData(updatedData)
      localStorage.setItem(`supplier-chat-${chatId}`, JSON.stringify(updatedData))
    } catch (error) {
      console.error('Error running initial workflow:', error)
      alert('Failed to start conversation. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!message.trim() || !chatData || isLoading) return

    const userMessage: Message = {
      role: "supplier",
      content: message.trim()
    }

    // Update conversation with user message
    const updatedConversation = [...chatData.conversation, userMessage]
    const updatedData = {
      ...chatData,
      conversation: updatedConversation
    }

    setChatData(updatedData)
    setMessage("")
    setIsLoading(true)

    try {
      // Run workflow with user message
      const result = await runSupplierCommunicationWorkflow({
        state: chatData.state,
        conversation: updatedConversation
      })

      const finalData = {
        state: result.state,
        conversation: result.conversation
      }

      setChatData(finalData)
      localStorage.setItem(`supplier-chat-${chatId}`, JSON.stringify(finalData))
    } catch (error) {
      console.error('Error running workflow:', error)
      alert('Failed to process message. Please try again.')
      // Revert to previous state on error
      setChatData(chatData)
    } finally {
      setIsLoading(false)
    }
  }

  const getRoleDisplayName = (role: string) => {
    switch (role) {
      case 'sourcing_agent':
        return 'Sourcing Agent'
      case 'supplier':
        return 'You (Supplier)'
      default:
        return role
    }
  }

  const getRoleStyle = (role: string) => {
    if (role === 'sourcing_agent') {
      return 'bg-primary text-primary-foreground'
    }
    return 'bg-secondary text-secondary-foreground'
  }

  if (!chatData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-xl font-semibold text-foreground">Loading chat...</h1>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-4">
          <Button
            variant="outline"
            onClick={() => router.push('/supplier')}
            className="mb-2"
          >
            ← Back to Setup
          </Button>
          <h1 className="text-2xl font-semibold text-foreground">
            Supplier Communication
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chat Section */}
          <div className="lg:col-span-2">
            <Card className="h-[600px] flex flex-col">
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {chatData.conversation.length === 0 && !isLoading && (
                  <div className="text-center text-muted-foreground">
                    Initializing conversation...
                  </div>
                )}

                {chatData.conversation.map((msg, index) => (
                  <div key={index} className="space-y-1">
                    <div className="text-xs text-muted-foreground">
                      {getRoleDisplayName(msg.role)}
                    </div>
                    <div className={`inline-block max-w-[80%] p-3 rounded-lg ${getRoleStyle(msg.role)}`}>
                      <div className="whitespace-pre-wrap text-sm">
                        {msg.content}
                      </div>
                    </div>
                  </div>
                ))}

                {isLoading && (
                  <div className="space-y-1">
                    <div className="text-xs text-muted-foreground">Sourcing Agent</div>
                    <div className="bg-primary text-primary-foreground inline-block p-3 rounded-lg">
                      <div className="flex items-center space-x-1">
                        <div className="animate-pulse">●</div>
                        <div className="animate-pulse delay-150">●</div>
                        <div className="animate-pulse delay-300">●</div>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input Form */}
              <div className="border-t p-4">
                <form onSubmit={handleSendMessage} className="flex gap-2">
                  <Input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message as the supplier..."
                    disabled={isLoading}
                    className="flex-1"
                  />
                  <Button type="submit" disabled={isLoading || !message.trim()}>
                    Send
                  </Button>
                </form>
              </div>
            </Card>
          </div>

          {/* State Display Section */}
          <div className="lg:col-span-1">
            <div className="sticky top-4">
              <StateDisplay state={chatData.state} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}