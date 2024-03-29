import { useRef, useEffect, useState } from 'react'

const useCanvas = (containerWidth, containerHeight, show, drawFunction) => {

    const canvasRef = useRef(null)
    const [context, setContext] = useState(null)
    
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

    }, [show, containerWidth])


    useEffect(() => {
        if (shouldBeHidden()) return;

        const canvas = canvasRef.current
        const context = canvas.getContext('2d')

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

    return {
        canvasRef,
        context
    }
}

export default useCanvas