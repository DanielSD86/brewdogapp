import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

import { removeToken, setToken, isAuthenticed } from "../../services/auth";
import { loginApp, loginValidate } from "./api";

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const Logout = () => {
    useEffect(() => {
        removeToken();    
    }, []);

    return (
        <Redirect to="/login"/>
    );
}

const Login = () => {
    const [login, setLogin] = useState("");
    const [senha, setSenha] = useState("");
    const [erro, setErro] = useState("");
    const [logado, setLogado] = useState(isAuthenticed());
    const classes = useStyles();

    const onLogin = async(e) => {
        e.preventDefault();

        //Validação
        const validate = await loginValidate({ login, senha });
        if (!validate.status) {
            setErro(validate.message);
            return;
        }

        //Login
        const response = await loginApp(login, senha);
        if (!response.status) {
            setErro(response.message);
            return;
        }
        
        setToken(response.token);
        setLogado(true);
    };

    const onCloseMsg = async() => {
        setErro("");
    }

    if (logado) {
        return ( <Redirect to="/"/> );
    }

    return (
        <Container component="main" maxWidth="xs">                
            <CssBaseline />
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    Login
                </Typography>
                <form className={classes.form}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Usuário"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={login} 
                        onChange={e => setLogin(e.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Senha"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={senha} 
                        onChange={e => setSenha(e.target.value)}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={onLogin}>
                        Login
                    </Button>
                    <Snackbar open={erro !== ""} autoHideDuration={6000} onClose={onCloseMsg}>
                        <MuiAlert elevation={6} variant="filled" onClose={onCloseMsg} severity="error">
                            {erro}
                        </MuiAlert>
                    </Snackbar>
                </form>
            </div>
        </Container>
    )
}

export {
    Login,
    Logout    
}