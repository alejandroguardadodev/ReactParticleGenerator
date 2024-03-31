import { useRef, useEffect, useState, useMemo } from 'react'

const useCanvas = (containerWidth, containerHeight, show, drawFunction) => {

    const canvasRef = useRef(null)
    const [context, setContext] = useState(null)

    const [ canvasHeight, setCanvasHeight ] = useState(0)
    const [ canvasWidth, setCanvasWidth ] = useState(0)
    
    const shouldBeHidden = () => canvasRef == null || canvasRef.current == null || canvasRef.current == undefined || !show

    const draw = ctx => {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)

        drawFunction(ctx)

        //setContext(ctx)
    }

    useEffect(() => {
        if (shouldBeHidden()) return;

        canvasRef.current.width = Math.floor(containerWidth)
        canvasRef.current.height = Math.floor(containerHeight)

        setCanvasWidth(canvasRef.current.width)
        setCanvasHeight(canvasRef.current.height)

        console.log('CHANGED')

    }, [show, containerWidth])


    useEffect(() => {
        if (shouldBeHidden()) return;

        const canvas = canvasRef.current
        const context = canvas.getContext('2d')
        setContext(context)
        
        let animationFrameId;

        const render = () => {
            draw(context) //draw(context)
            animationFrameId = window.requestAnimationFrame(render)
        }

        render()

        return () => {
            window.cancelAnimationFrame(animationFrameId)
        }

    }, [draw, canvasRef, show])

    const middleX = useMemo(() => {
        if (context === null) return -1

        return context.canvas.width / 2
    }, [context])

    const middleY = useMemo(() => {
        if (context === null) return -1
        
        return canvasHeight / 2
    }, [canvasHeight])

    const horizontalEnd = useMemo(() => {
        if (context === null) return -1

        return context.canvas.width
    }, [context])

    const verticalEnd = useMemo(() => {
        if (context === null) return -1

        return context.canvas.height
    }, [context])

    return {
        canvasRef,
        context,
        horizontalEnd,
        verticalEnd,
        middleX,
        middleY,
    }
}

export default useCanvas