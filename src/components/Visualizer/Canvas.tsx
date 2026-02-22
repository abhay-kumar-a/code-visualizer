import { useRef, useEffect } from 'react'

interface CanvasProps {
  data: number[]
  highlights?: number[]
  width?: number
  height?: number
}

function Canvas({ data, highlights = [], width = 600, height = 400 }: CanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.fillStyle = '#1e293b'
    ctx.fillRect(0, 0, width, height)

    const barWidth = (width - 40) / data.length
    const maxValue = Math.max(...data)

    data.forEach((value, index) => {
      const barHeight = (value / maxValue) * (height - 60)
      const x = 20 + index * barWidth
      const y = height - 30 - barHeight

      if (highlights.includes(index)) {
        ctx.fillStyle = '#ef4444'
      } else {
        ctx.fillStyle = '#3b82f6'
      }

      ctx.fillRect(x, y, barWidth - 2, barHeight)

      ctx.fillStyle = '#94a3b8'
      ctx.font = '12px sans-serif'
      ctx.textAlign = 'center'
      ctx.fillText(value.toString(), x + barWidth / 2, height - 10)
    })
  }, [data, highlights, width, height])

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      className="rounded-lg"
    />
  )
}

export default Canvas
