import { useEffect, useState } from "react";

const useSpriteByCanvas = (file_name, { canvasWidth, canvasHeight }) => {
    const [image, setImage] = useState(null)
    const [imgSize, setImgSize] = useState({
        width: 0,
        height: 0,
        ratio: 0
    })

    useEffect(() => {
        let _image = new Image();
        var dataImage = localStorage.getItem(file_name);
        _image.src = dataImage;

        setImage(_image)
    }, [])

    useEffect(() => {
        if (canvasWidth === null || canvasHeight === undefined || image === null) return;
        // CALCULATE RATIO --------------------------
        let img_width = image.width
        let img_height = image.height
        
        var hRatio = canvasWidth / img_width
        var vRatio = canvasHeight / img_height

        var ratio  = Math.min(hRatio, vRatio);

        var imageSize = {
            width: Math.floor(img_width * ratio),
            height: Math.floor(img_height * ratio),
            ratio: ratio,
        }

        setImgSize(imageSize)
    }, [canvasWidth, canvasHeight, image])

    return {
        ...imgSize,
        img: image    
    }
}

export default useSpriteByCanvas