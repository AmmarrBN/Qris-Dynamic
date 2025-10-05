"use client"

import { useEffect, useRef, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, Copy, Check } from "lucide-react"
import QRCode from "qrcode"

interface QRCodeDisplayProps {
  qrisData: string
  amount: string
}

export function QRCodeDisplay({ qrisData, amount }: QRCodeDisplayProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [copied, setCopied] = useState(false)
  const [qrGenerated, setQrGenerated] = useState(false)

  useEffect(() => {
    generateQRWithLogo()
  }, [qrisData])

  const generateQRWithLogo = async () => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    try {
      // Generate QR code
      await QRCode.toCanvas(canvas, qrisData, {
        width: 400,
        margin: 2,
        color: {
          dark: "#000000",
          light: "#FFFFFF",
        },
        errorCorrectionLevel: "H", // High error correction for logo overlay
      })

      // Load and draw logo
      const logo = new Image()
      logo.crossOrigin = "anonymous"
      logo.onload = () => {
        const logoSize = 100 // Increased logo size to 100px for better visibility
        const x = (canvas.width - logoSize) / 2
        const y = (canvas.height - logoSize) / 2

        // Draw white background for logo
        ctx.fillStyle = "#FFFFFF"
        ctx.fillRect(x - 5, y - 5, logoSize + 10, logoSize + 10)

        // Draw logo
        ctx.drawImage(logo, x, y, logoSize, logoSize)
        setQrGenerated(true)
      }
      logo.onerror = () => {
        // If logo fails to load, just show QR without logo
        setQrGenerated(true)
      }
      logo.src = "/yuki-host-logo.png" // Updated logo to Yuki Host cloud logo
    } catch (error) {
      console.error("Error generating QR code:", error)
    }
  }

  const handleDownload = () => {
    if (!canvasRef.current) return

    const url = canvasRef.current.toDataURL("image/png")
    const link = document.createElement("a")
    link.download = `qris_${amount}.png`
    link.href = url
    link.click()
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(qrisData)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error("Failed to copy:", error)
    }
  }

  return (
    <Card className="p-6 md:p-8 bg-card border-border">
      <div className="text-center space-y-6">
        <div>
          <h3 className="text-2xl font-bold mb-2">Dynamic QRIS Generated</h3>
          <p className="text-muted-foreground">
            Amount:{" "}
            <span className="font-semibold text-foreground">Rp {Number.parseInt(amount).toLocaleString("id-ID")}</span>
          </p>
        </div>

        <div className="flex justify-center">
          <div className="bg-white p-6 rounded-2xl shadow-lg inline-block">
            <canvas
              ref={canvasRef}
              className={`transition-opacity duration-300 ${qrGenerated ? "opacity-100" : "opacity-0"}`}
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button onClick={handleDownload} variant="default" size="lg">
            <Download className="w-5 h-5 mr-2" />
            Download QR Code
          </Button>
          <Button onClick={handleCopy} variant="outline" size="lg">
            {copied ? (
              <>
                <Check className="w-5 h-5 mr-2" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-5 h-5 mr-2" />
                Copy QRIS Code
              </>
            )}
          </Button>
        </div>

        <details className="text-left">
          <summary className="cursor-pointer text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            View QRIS Code
          </summary>
          <div className="mt-3 p-4 bg-muted rounded-lg">
            <code className="text-xs font-mono break-all">{qrisData}</code>
          </div>
        </details>
      </div>
    </Card>
  )
}
