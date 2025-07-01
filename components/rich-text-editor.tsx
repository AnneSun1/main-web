"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  LinkIcon,
  ImageIcon,
  Video,
  Code,
  Heading1,
  Heading2,
  Heading3,
} from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export function RichTextEditor({ value, onChange, placeholder }: RichTextEditorProps) {
  const [showSource, setShowSource] = useState(false)
  const [imageUrl, setImageUrl] = useState("")
  const [videoUrl, setVideoUrl] = useState("")
  const [linkUrl, setLinkUrl] = useState("")
  const [linkText, setLinkText] = useState("")
  const editorRef = useRef<HTMLDivElement>(null)

  const executeCommand = (command: string, value?: string) => {
    document.execCommand(command, false, value)
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML)
    }
  }

  const handleContentChange = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML)
    }
  }

  const insertImage = () => {
    if (imageUrl) {
      executeCommand(
        "insertHTML",
        `<img src="${imageUrl}" alt="Uploaded image" style="max-width: 100%; height: auto;" />`,
      )
      setImageUrl("")
    }
  }

  const insertVideo = () => {
    if (videoUrl) {
      const videoHtml = `
        <video controls style="max-width: 100%; height: auto;">
          <source src="${videoUrl}" type="video/mp4">
          Your browser does not support the video tag.
        </video>
      `
      executeCommand("insertHTML", videoHtml)
      setVideoUrl("")
    }
  }

  const insertLink = () => {
    if (linkUrl && linkText) {
      executeCommand("insertHTML", `<a href="${linkUrl}" target="_blank">${linkText}</a>`)
      setLinkUrl("")
      setLinkText("")
    }
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>, type: "image" | "video") => {
    const file = event.target.files?.[0]
    if (file) {
      // Mock file upload - in real implementation, this would upload to a server
      const mockUrl = URL.createObjectURL(file)
      if (type === "image") {
        setImageUrl(mockUrl)
      } else {
        setVideoUrl(mockUrl)
      }
    }
  }

  const toolbarButtons = [
    { command: "bold", icon: Bold, title: "Bold" },
    { command: "italic", icon: Italic, title: "Italic" },
    { command: "underline", icon: Underline, title: "Underline" },
    { command: "formatBlock", value: "h1", icon: Heading1, title: "Heading 1" },
    { command: "formatBlock", value: "h2", icon: Heading2, title: "Heading 2" },
    { command: "formatBlock", value: "h3", icon: Heading3, title: "Heading 3" },
    { command: "insertUnorderedList", icon: List, title: "Bullet List" },
    { command: "insertOrderedList", icon: ListOrdered, title: "Numbered List" },
  ]

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden">
      {/* Toolbar */}
      <div className="bg-gray-50 border-b border-gray-300 p-2 flex flex-wrap gap-1">
        {toolbarButtons.map((button, index) => {
          const Icon = button.icon
          return (
            <Button
              key={index}
              variant="ghost"
              size="sm"
              onClick={() => executeCommand(button.command, button.value)}
              title={button.title}
              className="h-8 w-8 p-0"
            >
              <Icon className="w-4 h-4" />
            </Button>
          )
        })}

        <div className="w-px bg-gray-300 mx-1" />

        {/* Link Dialog */}
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost" size="sm" title="Insert Link" className="h-8 w-8 p-0">
              <LinkIcon className="w-4 h-4" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Insert Link</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="link-text">Link Text</Label>
                <Input
                  id="link-text"
                  value={linkText}
                  onChange={(e) => setLinkText(e.target.value)}
                  placeholder="Enter link text"
                />
              </div>
              <div>
                <Label htmlFor="link-url">URL</Label>
                <Input
                  id="link-url"
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  placeholder="https://example.com"
                />
              </div>
              <Button onClick={insertLink} className="w-full">
                Insert Link
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Image Dialog */}
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost" size="sm" title="Insert Image" className="h-8 w-8 p-0">
              <ImageIcon className="w-4 h-4" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Insert Image</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="image-upload">Upload Image</Label>
                <Input id="image-upload" type="file" accept="image/*" onChange={(e) => handleFileUpload(e, "image")} />
              </div>
              <div>
                <Label htmlFor="image-url">Or Image URL</Label>
                <Input
                  id="image-url"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              <Button onClick={insertImage} className="w-full" disabled={!imageUrl}>
                Insert Image
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Video Dialog */}
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost" size="sm" title="Insert Video" className="h-8 w-8 p-0">
              <Video className="w-4 h-4" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Insert Video</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="video-upload">Upload Video</Label>
                <Input id="video-upload" type="file" accept="video/*" onChange={(e) => handleFileUpload(e, "video")} />
              </div>
              <div>
                <Label htmlFor="video-url">Or Video URL</Label>
                <Input
                  id="video-url"
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  placeholder="https://example.com/video.mp4"
                />
              </div>
              <Button onClick={insertVideo} className="w-full" disabled={!videoUrl}>
                Insert Video
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        <div className="w-px bg-gray-300 mx-1" />

        {/* Source Code Toggle */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowSource(!showSource)}
          title="View HTML Source"
          className="h-8 w-8 p-0"
        >
          <Code className="w-4 h-4" />
        </Button>
      </div>

      {/* Editor Content */}
      {showSource ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full h-64 p-4 font-mono text-sm resize-none focus:outline-none"
          placeholder="Enter HTML content..."
        />
      ) : (
        <div
          ref={editorRef}
          contentEditable
          onInput={handleContentChange}
          dangerouslySetInnerHTML={{ __html: value }}
          className="min-h-64 p-4 focus:outline-none"
          style={{ minHeight: "16rem" }}
          data-placeholder={placeholder}
        />
      )}
    </div>
  )
}
