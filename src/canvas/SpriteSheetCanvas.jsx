import useCanvas from '../hooks/useCanvas'

const SpriteSheetCanvas = ({ containerWidth, containerHeight, kind }) => {

    const { canvasRef } = useCanvas(containerWidth, containerHeight, open, ctx => {
        let image = new Image();
        var dataImage = localStorage.getItem('firstOpenImageFile');
        image.src = dataImage;

        let img_width = image.width
        let img_height = image.height

        var hRatio = ctx.canvas.width / img_width
        var vRatio = ctx.canvas.height / img_height
        var ratio  = Math.min(hRatio, vRatio);
    
        var centerShift_x = ( ctx.canvas.width - img_width*ratio ) / 2;
        var centerShift_y = ( ctx.canvas.height - img_height*ratio ) / 2;  

        ctx.drawImage(image, 0,0, img_width, img_height, centerShift_x,centerShift_y,img_width*ratio, img_height*ratio)

        ctx.strokeRect(centerShift_x,centerShift_y,img_width*ratio, img_height*ratio)
    })

    return (
        <>
            <canvas ref={canvasRef} />
        </>
    )
}

export default SpriteSheetCanvas
