import React from 'react'
import { useGetExchangesQuery } from '../services/cryptoApi'
import HTMLReactParser from 'html-react-parser';
import millify from 'millify';
// MaterialUI imports
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import Icon from '@mui/material/Icon';


const Exchanges = () => {

    const { data, isFetching } = useGetExchangesQuery();

    if(isFetching){
        return (
            <div>
                <Grid container >
                        <Grid container item xs={6} alignItems='end'>
                            <Typography>Exchange</Typography>
                        </Grid>
                        <Grid container item xs={2} justifyContent='end' alignItems='end'>
                            <Typography>24h Vol.</Typography>
                        </Grid>
                        <Grid container item xs={2} justifyContent='end' alignItems='end'>
                            <Typography>Markets</Typography>
                        </Grid>
                        <Grid container item xs={2} justifyContent='end' alignItems='end'>
                            <Typography>Share</Typography>
                        </Grid>
                </Grid>
                <Accordion>
                        <AccordionSummary>
                            <Grid container alignItems='center' spacing={2}>
                                <Grid container item xs={6} sm={6} sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Skeleton variant='circular' />
                                    <Skeleton variant='text' />
                                </Grid>
                                <Grid container item xs={2} sm={2} justifyContent='end'>
                                    <Skeleton variant='text' />
                                </Grid>
                                <Grid container item xs={2} sm={2} justifyContent='end'>
                                    <Skeleton variant='text' />
                                </Grid>
                                <Grid container item xs={2} sm={2} justifyContent='end'>
                                    <Skeleton variant='text' />
                                </Grid>
                            </Grid>
                        </AccordionSummary>
                    </Accordion>
            </div>
        )
    }

    const Exchanges = data?.data?.exchanges;

    return (
        <div>
            <Grid container >
                <Grid container item xs={6} alignItems='end'>
                    <Typography>Exchange</Typography>
                </Grid>
                <Grid container item xs={2} justifyContent='end' alignItems='end'>
                    <Typography>24h Vol.</Typography>
                </Grid>
                <Grid container item xs={2} justifyContent='end' alignItems='end'>
                    <Typography>Markets</Typography>
                </Grid>
                <Grid container item xs={2} justifyContent='end' alignItems='end'>
                    <Typography>Share</Typography>
                </Grid>
            </Grid>
            {Exchanges.map((exchange) => (
                <Accordion key={exchange.id} sx={{mt: 1}} elevation={0}>
                    <AccordionSummary>
                        <Grid container alignItems='center' spacing={2}>
                            <Grid container item xs={6} sm={6} sx={{ display: 'flex', alignItems: 'center' }}>
                                {/* <Avatar src={exchange.iconUrl} sx={{ mr: 2, height: 24, width: 24 }} /> */}
                                <Icon sx={{textAlign: 'center', mr: 1}}>
                                    <img src={exchange.iconUrl} style={{display: 'flex', height: 'inherit', width: 'inherit'}} />
                                </Icon>
                                <Typography sx={{mr: 3}} >{exchange.rank}. {exchange.name}</Typography>
                            </Grid>
                            <Grid container item xs={2} sm={2} justifyContent='end'>
                                <Typography variant='body2' >${millify(exchange.volume)}</Typography>
                            </Grid>
                            <Grid container item xs={2} sm={2} justifyContent='end'>
                                <Typography variant='body2'>${millify(exchange.numberOfMarkets)}</Typography>
                            </Grid>
                            <Grid container item xs={2} sm={2} justifyContent='end'>
                                <Typography variant='body2'>{millify(exchange.marketShare)}%</Typography>
                            </Grid>
                        </Grid>
                    </AccordionSummary>
                    <AccordionDetails>
                            {HTMLReactParser(exchange.description || '')}
                    </AccordionDetails>
                </Accordion>
            ))
            }
        </div>
    )
}

export default Exchanges
