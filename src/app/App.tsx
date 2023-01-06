import React, {useEffect} from 'react'
import './App.css'
import {TodolistsList} from '../features/TodolistsList/TodolistsList'
import {useDispatch} from 'react-redux'
import {useAppSelector} from './store'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import LinearProgress from '@mui/material/LinearProgress';
import {ErrorSnackbar} from '../components/ErrorSnackbar/ErrorSnackbar'
import {Login} from "../features/Login/Login";
import {Navigate, Route, Routes} from "react-router-dom";
import error_img from '../assets/images/error_img.png'
import {CircularProgress} from "@mui/material";
import {initializeAppTC} from "./app-reducer";
import {logoutTC} from "../features/Login/auth-reducer";

type PropsType = {
    demo?: boolean
}

export enum ROOTS {
    DEFAULT = '/',
    LOGIN = 'login',
    NOT_FOUND = '404'
}

function App({demo = false}: PropsType) {

    const dispatch = useDispatch()
    const status = useAppSelector((state) => state.app.status)
    const isInitialized = useAppSelector((state) => state.app.isInitialized)
    const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn)

    const logOutHandler = () => {
        dispatch(logoutTC())
    }

    useEffect(() => {
        dispatch(initializeAppTC())
    }, [])

    if (!isInitialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }
    return (
        <div className="App">
            <ErrorSnackbar/>
            <AppBar position="relative">
                <Toolbar>
                    <Typography variant="h6" component="b" sx={{flexGrow: 1}}>
                        Todolist-App 📝
                    </Typography>
                    {isLoggedIn && <Button color="inherit" variant="text" onClick={logOutHandler}>Log out</Button>}
                </Toolbar>
                {status === 'loading' && <LinearProgress/>}
            </AppBar>
            <Container fixed>
                <Routes>
                    <Route path={ROOTS.DEFAULT} element={<TodolistsList demo={demo}/>}/>
                    <Route path={ROOTS.LOGIN} element={<Login/>}/>
                    <Route path={ROOTS.NOT_FOUND} element={<img src={error_img}/>}/>
                    <Route path='*' element={<Navigate to='/404'/>}/>
                </Routes>
            </Container>
        </div>
    )
}

export default App
