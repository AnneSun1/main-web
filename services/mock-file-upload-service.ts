export interface UploadedFile {
  id: string
  name: string
  url: string
  type: "image" | "video"
  size: number
}

export class MockFileUploadService {
  private uploadedFiles: UploadedFile[] = []

  async uploadFile(file: File): Promise<UploadedFile> {
    // Simulate upload delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Create mock URL (in real implementation, this would be a server URL)
    const mockUrl = URL.createObjectURL(file)

    const uploadedFile: UploadedFile = {
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      url: mockUrl,
      type: file.type.startsWith("image/") ? "image" : "video",
      size: file.size,
    }

    this.uploadedFiles.push(uploadedFile)
    return uploadedFile
  }

  async getUploadedFiles(): Promise<UploadedFile[]> {
    return [...this.uploadedFiles]
  }

  async deleteFile(id: string): Promise<boolean> {
    const index = this.uploadedFiles.findIndex((f) => f.id === id)
    if (index === -1) return false

    // Revoke the object URL to free memory
    URL.revokeObjectURL(this.uploadedFiles[index].url)
    this.uploadedFiles.splice(index, 1)
    return true
  }
}

export const fileUploadService = new MockFileUploadService()
