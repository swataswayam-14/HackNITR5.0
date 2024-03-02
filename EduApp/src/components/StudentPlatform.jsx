import React, { useState } from "react";
import { useParams } from "react-router-dom";
function StudentPlatform(){
    const {id} = useParams()
    const [link, setLink] = useState('')
    return(
        <div>
            <input onChange={(e)=>{
                setLink(e.target.value)
            }} value={link} placeholder="Upload link of video"/>
            <button>Upload</button>
        </div>
    )
}

export default StudentPlatform