import React, { useContext, useState } from 'react'
import withAuth from '../utils/withAuth'
import { useNavigate } from 'react-router-dom';
import style from "../styles/Home.module.css"
import { Button, IconButton, TextField } from '@mui/material';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import RestoreIcon from "@mui/icons-material/Restore"
import { AuthContext } from '../contexs/AuthContex';

function Home() {

    let navigate = useNavigate();
    const [meetingCode, setMeetingCode] = useState("")
    const { addToUserHistory, userData } = useContext(AuthContext);
    const [showDetails, setShowDetails] = useState(false);


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
                        <p>History</p>
                    </IconButton>

                    <Button onClick={() => {
                        localStorage.removeItem("token")
                        navigate("/auth")
                    }}>LogOut</Button>

                    <IconButton onClick={() => {
                        setShowDetails(true)
                    }}>
                        <AccountCircleOutlinedIcon />

                    </IconButton>
                    {showDetails && (
                        <div className={style.profileWindow}>
                            <div>
                                <h2>My Profile</h2>
                                <div>
                                    <p>Name: {userData?.name || 'Loading...'}</p>
                                    <p>Username: {userData?.username || 'Loading...'}</p>
                                    <p>ID: {userData?.userId || 'Loading...'}</p>
                                </div>

                                <Button variant='contained' style={{ bottom: "0", marginTop: "1rem" }} onClick={() => {
                                    setShowDetails(false)
                                }}>Exit</Button>
                            </div>
                        </div>
                    )}



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
