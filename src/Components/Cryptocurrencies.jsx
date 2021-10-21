import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router';
import millify from 'millify';
import { useGetCryptosQuery } from '../services/cryptoApi';

// MateriaLUI imports
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import InputAdornment from '@mui/material/InputAdornment';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Search from '@mui/icons-material/Search';
import Icon from '@mui/material/Icon';
import Box from '@mui/material/Box';


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

    if (isFetching) {
        let body = [];
        for (let i = 0; i < 4; i++) {
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
                            />
                        </Grid>
                    )
                }
                {body}
            </Grid>
        )
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
                        <CardActionArea onClick={() => history.push(`/currencydetails/${coin.id}`)}>
                            <CardHeader
                                avatar={
                                    // <Avatar srcSet={coin.iconUrl} variant='square' sx={{ width: 'auto', height: 24 }} />
                                    <Icon sx={{textAlign: 'center'}}>
                                        <img src={coin.iconUrl} style={{display: 'flex', height: 'inherit', width: 'inherit'}} />
                                    </Icon>
                                }
                                title={
                                    <Typography variant='subtitle1' fontWeight='bold'>
                                        {coin.rank}. {coin.name}
                                    </Typography>
                                }
                            />
                            <CardContent>
                                <Typography>Price: ${millify(coin.price)}</Typography>
                                <Typography>Market Cap: ${millify(coin.marketCap)}</Typography>
                                <Box sx={{display:'flex'}} >
                                    <Typography>Daily Change:</Typography>
                                    <Typography sx={coin.change > 0 ? {color:'green', ml:1} : {color:'red', ml:1}}>{coin.change > 0 ? `+${millify(coin.change)}` : `-${millify(coin.change)}`}%</Typography>
                                </Box>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
            ))}
        </Grid>
    )
}

export default Cryptocurrencies
