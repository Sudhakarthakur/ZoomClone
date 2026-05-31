import React, { useContext, useState } from 'react'
import withAuth from '../utils/withAuth'
import { useNavigate } from 'react-router-dom';
import style from "../styles/Home.module.css"
import { Button, IconButton, TextField } from '@mui/material';
import RestoreIcon from "@mui/icons-material/Restore"
import { AuthContext } from '../contexs/AuthContex';

function Home() {

    let navigate = useNavigate();
    const [meetingCode, setMeetingCode] = useState("")
    const { addToUserHistory } = useContext(AuthContext);


    let handleJoinVideoCall = async () => {

        await addToUserHistory(meetingCode)
        navigate(`/${meetingCode}`)
    }
    return (
        <>
            <div className={style.navbar}>
                <div style={{ display: "flex", alignItems: "center" }}>
                    <h3>Video Call</h3>
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                    <IconButton onClick={() => {
                        navigate("/history");
                    }}>
                        <RestoreIcon />
                        History
                    </IconButton>

                    <Button onClick={() => {
                        localStorage.removeItem("token")
                        navigate("/auth")
                    }}>LogOut</Button>
                    <Button>My Profile</Button>
                </div>
            </div>

            <div className={style.meetContainer}>
                <div className={style.leftPanel}>
                    <h2>Providing Quality Video Call</h2>
                    <div style={{ display: "flex", gap: "10px" }}>
                        <TextField onChange={e => setMeetingCode(e.target.value)} id='outline-basic' label='Metting Code' variant='outlined'></TextField>
                        <Button variant='contained' onClick={handleJoinVideoCall}>Join Call</Button>
                    </div>
                </div>
                <div className={style.rightPanel}>
                    <img srcSet='/calling.png'></img>
                </div>
            </div>

        </>
    )
}

export default withAuth(Home);
