import React, { useState, useEffect } from "react";
import { GET_IMAGE } from '../../services/ENDPOINT'
import Loader from "../../components/Loader";
import NoImgAvailable from "../../assets/img/no-image.jpg";

const HmImage = (props) => {

    useEffect(() => {
        fetchImage()
    }, [])
    const fetchImage = async () => {
        try {
            setLoader(true)
            const blob = await GET_IMAGE(props.src)

            let u8 = new Uint8Array(blob)
            let b64encoded = btoa([].reduce.call(new Uint8Array(blob),function(p,c){return p+String.fromCharCode(c)},''))
            let mimetype="image/jpeg"

            setImgSrc("data:"+mimetype+";base64,"+b64encoded)
        } catch (e) {
            console.log(e)
            errorImage();
        } finally {
            setLoader(false)
        }
    }
    const errorImage = () => {
        console.log("errorImg");
        setImgSrc(NoImgAvailable)
    }

    const [isloader, setLoader] = useState(false);
    const [imgSrc, setImgSrc] = useState(null);
    return (
        <React.Fragment>
            {isloader &&
                <div className="d-flex justify-content-center align-items-center w-100 h-100">
                    <i className="fa fa-spinner fa-pulse fa-4x fa-fw color-admin-theme" />
                    <span className="sr-only">Loading...</span>
                </div>
            }
            {!isloader && 
                <img
                    onError={(e) => errorImage(e)}
                    src={imgSrc}
                    width={props.width || 200}
                    height={props.height || 200}
                    className={props.className || ''}
                />
            }
        </React.Fragment>
    )
}

export default HmImage;
