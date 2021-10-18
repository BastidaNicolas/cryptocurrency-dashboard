import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router';
import millify from 'millify';
import { useGetCryptosQuery } from '../services/cryptoApi';
import { Avatar, Card, CardActionArea, CardContent, CardHeader, Divider, Grid, IconButton, Input, InputAdornment, Skeleton, TextField, Typography } from '@mui/material';
import { Search } from '@mui/icons-material';


const Cryptocurrencies = ({ simplified }) => {

    const count = simplified ? 10 : 100;
    const { data: cryptoList, isFetching } = useGetCryptosQuery(count);
    const [coins, setCoins] = useState([]);
    const history = useHistory();
    const [searchTarget, setSearchTarget] = useState('')

    useEffect(() => {
        const filteredList = cryptoList?.data?.coins.filter((coin) => coin.name.toLowerCase().includes(searchTarget.toLowerCase()));
        setCoins(filteredList);
    }, [cryptoList, searchTarget])

    console.log(cryptoList);

    if(isFetching){
        let body = [];
        for (let i = 0; i < count; i++) {
            body.push(
                <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
                    <Card>
                        <CardActionArea>
                            <CardHeader
                                avatar={
                                    <Skeleton variant='circular' sx={{ width: 24, height: 24 }} />
                                }
                                title={
                                    <Skeleton variant='text' />
                                }
                            />
                            <CardContent>
                                <Skeleton variant='text' />
                                <Skeleton variant='text' />
                                <Skeleton variant='text' />
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
            )
        }
        return (<Grid container spacing={2}>{body}</Grid>)
    }

    return (
        <Grid container spacing={2}>
            {!simplified &&
                (
                    <Grid container item xs={12}>
                        <TextField
                            label="Search Currency"
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position='end'>
                                            <Search />
                                    </InputAdornment>
                                )
                            }}
                            onChange={(e) => setSearchTarget(e.target.value)}
                        />
                    </Grid>
                )
            }
            {coins?.map((coin) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={coin.id}>
                    <Card>
                        <CardActionArea onClick={() => history.push('/currencydetails')}>
                            <CardHeader
                                avatar={
                                    <Avatar srcSet={coin.iconUrl} variant='square' sx={{ width: 'auto', height: 24 }} />
                                }
                                title={
                                    <Typography variant='subtitle1'>
                                        {coin.rank}. {coin.name}
                                    </Typography>
                                }
                            />
                            <Divider orientation="vertical" flexItem />
                            <CardContent>
                                <Typography color='GrayText'>Price: ${millify(coin.price)}</Typography>
                                <Typography color='GrayText'>Market Cap: ${millify(coin.marketCap)}</Typography>
                                <Typography color='GrayText'>Daily Change: {millify(coin.change)}%</Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
            ))}
        </Grid>
    )
}

export default Cryptocurrencies
