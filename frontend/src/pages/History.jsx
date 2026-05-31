import React from 'react'
import { useContext } from 'react'
import { AuthContext } from '../contexs/AuthContex'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { IconButton } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import withAuth from '../utils/withAuth'


export default withAuth(History);

function History() {

    const { getHistoryOfUser } = useContext(AuthContext)

    const [meeting, setMeeting] = useState([]);

    const routeTo = useNavigate();

    useEffect(() => {
        const featchHistory = async () => {
            try {
                const getHistory = await getHistoryOfUser();
                setMeeting(getHistory);
            } catch {

            }
        }
        featchHistory();
    }, [])

    let formateDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const year = date.getFullYear();

        return `/${day}/${month}/${year}`;

    }

    return (
        <div>
            <IconButton onClick={() => {
                routeTo("/home")
            }} ><HomeIcon /></IconButton>
            <div style={{ padding: "10px" }}>
                {

                    meeting.length !== 0 ?
                        meeting.map((e, i) => {
                            return (<>
                                <Card key={i}
                                    variant='outlined' style={{ marginBottom: "10px" }} sx={{ minWidth: 275 }}>
                                    <CardContent>
                                        <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                                            UserId:{e.user_id}
                                        </Typography>
                                        <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                                            Code:{e.meetingCode}
                                        </Typography>
                                        <Typography variant="body2">
                                            Date:{formateDate(e.date)}
                                        </Typography>
                                    </CardContent>

                                </Card>
                            </>)
                        }) : <></>
                }

            </div>
        </div>
    )
}
