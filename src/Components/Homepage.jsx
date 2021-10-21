import React from 'react'
import { useHistory } from 'react-router';
import Cryptocurrencies from './Cryptocurrencies';
import News from './News';
import millify from 'millify';

// MaterialUI import
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';

import { useGetCryptosQuery } from '../services/cryptoApi';

const Homepage = () => {
    const history = useHistory();
    const {data, isFetching} = useGetCryptosQuery(10);

    const marketStats = data?.data?.stats;
    
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography variant='h4' fontWeight='bold'>
                    Global Crypto Stats
                </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
                <Typography variant='subtitle1' color='GrayText'>Total Cryptocurrencies</Typography>
                <Typography variant='h6'>{isFetching ? <Skeleton width={100} variant='text'/> : millify(marketStats?.total)}</Typography>
            </Grid>
            <Grid item xs={6}>
                <Typography variant='subtitle1' color='GrayText'>Total Exchanges</Typography>
                <Typography variant='h6'>{isFetching ? <Skeleton width={100} variant='text'/> : millify(marketStats?.totalExchanges)}</Typography>
            </Grid>
            <Grid item xs={6}>
                <Typography variant='subtitle1' color='GrayText'>Total Market Cap</Typography>
                <Typography variant='h6'>{isFetching ? <Skeleton width={100} variant='text'/> : millify(marketStats?.totalMarketCap)}</Typography>
            </Grid>
            <Grid item xs={6}>
                <Typography variant='subtitle1' color='GrayText'>Total 24h Volume</Typography>
                <Typography variant='h6'>{isFetching ? <Skeleton width={100} variant='text'/> : millify(marketStats?.total24hVolume)}</Typography>
            </Grid>
            <Grid item xs={6}>
                <Typography variant='subtitle1' color='GrayText'>Total Markets</Typography>
                <Typography variant='h6'>{isFetching ? <Skeleton width={100} variant='text'/> : millify(marketStats?.totalMarkets)}</Typography>
            </Grid>
            <Grid item xs={12} sm={9} lg={10} xl={11}>
                <Typography variant='h4' fontWeight='bold'>
                    Top 10 Cryptocurrencies
                </Typography>
            </Grid>
            <Grid container item xs={12} sm={3} lg={2} xl={1} alignItems='center'>
                <Link variant='button' onClick={() => history.push('/cryptocurrencies')}>Show more</Link>
            </Grid>
            <Grid item xs={12}>
                <Cryptocurrencies simplified/>
            </Grid>
            <Grid item xs={12} sm={9} lg={10} xl={11}>
                <Typography variant='h4' fontWeight='bold'>
                    Recent News
                </Typography>
            </Grid>
            <Grid container item xs={12} sm={3} lg={2} xl={1} alignItems='center'>
                <Link variant='button' onClick={() => history.push('/news')}>Show more</Link>
            </Grid>
            <Grid item xs={12}>
                <News/>
            </Grid>
        </Grid>
    )
}

export default Homepage
