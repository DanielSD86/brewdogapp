import React, { Component, useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { loadMercadorias } from "./api";

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableContainer from '@material-ui/core/TableContainer';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import { AppBar, Toolbar, Typography, Button, Backdrop, CircularProgress, Grid, TextField, InputLabel, FormControl } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        display: 'flex',
    },
    title: {
        flexGrow: 1,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
    },
    buttonSearch: {
        margin: theme.spacing(1, 1, 0, 0),
        float: "left"
    },
    textSearch: {
        margin: theme.spacing(0),
    },
    loading: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    navPage: {
        '& > * + *': {
            marginLeft: theme.spacing(2),
        },
        float: "left"
    },
}));

const Mercadorias = () => {
    const [ filtro, setFiltro ] = useState("");
    const [ pesquisa, setPesquisa ] = useState("");
    const [ data, setData ] = useState([]);
    const [ pagina, setPagina ] = useState(1);
    const [ limite, setLimite ] = useState(10);
    const [erro, setErro] = useState("");
    const [carregando, setCarregando] = useState(false);
    const classes = useStyles();

    const onCloseMsg = async() => {
        setErro("");
    }

    const loadData = async () => {
        console.log("aqui");        

        setCarregando(true);
        try {
            const response = await loadMercadorias(limite, pagina, filtro);
            if (!response.status) {
                setErro(response.message);
                return;
            }

            setData(response.data);
        } finally {
            setCarregando(false);
        }
    }

    useEffect(() => {
        loadData();
    }, [pagina, limite, filtro]);

    return (
        <div id="main" className={classes.root}>
            <AppBar position="fixed">
                <Toolbar>
                    <Typography variant="h6" className={classes.title} noWrap>
                        BrewDog - Cervejaria
                    </Typography>
                    <Link to="/logout">
                        <Button color="inherit">
                            Logout
                        </Button>
                    </Link>                        
                </Toolbar>
            </AppBar>
            <main className={classes.content}>
                <Toolbar />

                <Grid container spacing={1}>
                    <Grid item xs={12} sm={10}>
                        <TextField
                            className={classes.textSearch}
                            label="Pesquisa"
                            autoFocus
                            fullWidth
                            variant="outlined"
                            value={pesquisa}                 
                            onChange={e => setPesquisa(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <Button 
                            variant="contained"
                            className={classes.buttonSearch}
                            onClick={() => setFiltro(pesquisa)}>
                            Pesquisar                            
                        </Button>
                    </Grid>
                </Grid>
                <TableContainer>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow key={0}>
                                <TableCell key={"id"} align={"center"}>ID</TableCell>
                                <TableCell key={"name"}>Nome</TableCell>
                                <TableCell key={"abv"} align={"center"}>ABV (%)</TableCell>
                                <TableCell key={"ibu"} align={"center"}>IBU</TableCell>
                                <TableCell key={"ph"} align={"center"}>PH</TableCell>
                                <TableCell key={"firstBrewed"}>Primeira Fabricação</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((record, i) => {
                                return (
                                    <TableRow key={i}>
                                        <TableCell key={"id"} align={"center"}>{record.id}</TableCell>
                                        <TableCell key={"name"}>{record.name}</TableCell>
                                        <TableCell key={"abv"} align={"center"}>{record.abv}</TableCell>
                                        <TableCell key={"ibu"} align={"center"}>{record.ibu}</TableCell>
                                        <TableCell key={"ph"} align={"center"}>{record.ph}</TableCell>
                                        <TableCell key={"firstBrewed"} align={"center"}>{record.first_brewed}</TableCell>
                                    </TableRow>
                                )})}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Grid container spacing={1}>
                    <Grid item xs={12} sm={3}>
                        <Button color="secondary" onClick={() => setPagina(pagina - 1)} disabled={pagina===1}>
                            Pagina Anterior
                        </Button>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <Button color="secondary" onClick={() => setPagina(pagina + 1)}>
                            Próxima página
                        </Button>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Select value={limite} onChange={e => setLimite(e.target.value)}>
                            <MenuItem value={10}>10 itens por página</MenuItem>
                            <MenuItem value={30}>30 itens por página</MenuItem>
                            <MenuItem value={50}>50 itens por página</MenuItem>
                        </Select>
                    </Grid>
                </Grid>
            </main>
            <Snackbar open={erro !== ""} autoHideDuration={6000} onClose={onCloseMsg}>
                <MuiAlert elevation={6} variant="filled" onClose={onCloseMsg} severity="error">
                    {erro}
                </MuiAlert>
            </Snackbar>
            <Backdrop className={classes.loading} open={carregando}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    )
}

export default Mercadorias;