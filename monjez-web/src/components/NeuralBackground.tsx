import { useEffect, useRef } from 'react'

interface Node {
  x: number
  y: number
  vx: number
  vy: number
  r: number
}

export default function NeuralBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId: number
    let nodes: Node[] = []
    let mouse = { x: -1000, y: -1000 }
    let dpr = Math.min(window.devicePixelRatio || 1, 2)

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      ctx.scale(dpr, dpr)
      const count = Math.min(80, Math.floor((rect.width * rect.height) / 18000))
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * rect.width,
        y: Math.random() * rect.height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.6 + 0.6,
      }))
    }

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
    }
    const onMouseLeave = () => {
      mouse.x = -1000
      mouse.y = -1000
    }

    const draw = () => {
      const rect = canvas.getBoundingClientRect()
      ctx.clearRect(0, 0, rect.width, rect.height)

      // Update positions
      for (const n of nodes) {
        // Mouse repulsion
        const dx = n.x - mouse.x
        const dy = n.y - mouse.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 140 && dist > 0) {
          const force = ((140 - dist) / 140) * 0.6
          n.vx += (dx / dist) * force
          n.vy += (dy / dist) * force
        }
        // Damping
        n.vx *= 0.96
        n.vy *= 0.96
        // Random drift
        n.vx += (Math.random() - 0.5) * 0.04
        n.vy += (Math.random() - 0.5) * 0.04
        // Limit speed
        const speed = Math.sqrt(n.vx * n.vx + n.vy * n.vy)
        if (speed > 1) {
          n.vx = (n.vx / speed) * 1
          n.vy = (n.vy / speed) * 1
        }

        n.x += n.vx
        n.y += n.vy

        if (n.x < 0) n.x = rect.width
        if (n.x > rect.width) n.x = 0
        if (n.y < 0) n.y = rect.height
        if (n.y > rect.height) n.y = 0
      }

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i]
          const b = nodes[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 130) {
            const opacity = (1 - dist / 130) * 0.3
            ctx.strokeStyle = `rgba(45, 212, 191, ${opacity})`
            ctx.lineWidth = 0.6
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
      }

      // Draw nodes
      for (const n of nodes) {
        const mouseDist = Math.sqrt((n.x - mouse.x) ** 2 + (n.y - mouse.y) ** 2)
        const glow = mouseDist < 150 ? (1 - mouseDist / 150) : 0
        ctx.fillStyle = `rgba(94, 234, 212, ${0.5 + glow * 0.5})`
        ctx.beginPath()
        ctx.arc(n.x, n.y, n.r + glow * 1.5, 0, Math.PI * 2)
        ctx.fill()
      }

      animationId = requestAnimationFrame(draw)
    }

    resize()
    draw()
    window.addEventListener('resize', resize)
    canvas.addEventListener('mousemove', onMouseMove)
    canvas.addEventListener('mouseleave', onMouseLeave)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
      canvas.removeEventListener('mousemove', onMouseMove)
      canvas.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [])

  return (
    <>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-auto opacity-70"
        style={{ width: '100%', height: '100%' }}
      />
      <div className="absolute inset-0 grid-bg opacity-50 mask-fade-bottom pointer-events-none animate-grid-drift" />
    </>
  )
}
