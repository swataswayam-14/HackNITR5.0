import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
function StudentPlatform(){
    const navigate = useNavigate()
    const {id} = useParams()
    const [link, setLink] = useState('')
    return(
        <div>
            <input onChange={(e)=>{
                setLink(e.target.value)
            }} value={link} placeholder="Upload link of video"/>
            <button onClick={()=>{
                navigate(`/analysisreport/${link}`)
            }}>Upload</button>
        </div>
    )
}

export default StudentPlatform