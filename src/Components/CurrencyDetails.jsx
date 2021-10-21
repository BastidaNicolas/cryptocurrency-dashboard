import React, { useState } from 'react';
import HTMLReactParser from 'html-react-parser';
import millify from 'millify';
import { useParams } from 'react-router';
import { useGetCryptoDetailsQuery, useGetCryptoHistoryQuery } from '../services/cryptoApi';
import Linechart from './Linechart';

// MaterialUI import
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import NativeSelect from '@mui/material/NativeSelect';

const CurrencyDetails = () => {

    const { coinId } = useParams();
    const [timePeriod, setTimePeriod] = useState('24h');
    const { data, isFetching } = useGetCryptoDetailsQuery(coinId);
    const { data: coinHistory } = useGetCryptoHistoryQuery({ coinId, timePeriod });

    const information = data?.data?.coin;

    if (isFetching) return 'Loading...';

    const time = ['24h', '7d', '30d', '1y', '5y'];

    const timeChange = (e) => {
        setTimePeriod(e.target.value);
    };

    return (
        <Grid container spacing={3}>
            <Grid container item sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'end' }}>
                <Typography variant='h4' fontWeight='bold'>
                    {information.name} ({information.symbol})
                </Typography>
                <Typography variant='h5' sx={information.change > 0 ? { color: 'green', ml: 1 } : { color: 'red', ml: 1 }}>
                    ${millify(information.price)} {information.change > 0 ? '+' : '-'}{information.change}%
                </Typography>
            </Grid>
            <Grid container item spacing={2} xs={12}>
                <Grid item xs={12} lg={9} >
                    <NativeSelect
                        defaultValue={timePeriod}
                        inputProps={{
                            name: 'Time',
                        }}
                        onChange={timeChange}
                    >
                        {time.map((value) => (
                            <option value={value}>{value}</option>
                        ))}
                    </NativeSelect>
                    <Linechart coinHistory={coinHistory} currentPrice={millify(information.price)} coinName={information.name} />
                </Grid>
                <Grid item xs={12} lg={3}>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <Typography variant='h4' fontWeight='bold'>Statistics</Typography>
                                    <Typography variant='subtitle2' color='GrayText'>Crypto Information Overview</Typography>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell align='left'>
                                        <Typography fontWeight='bold' >Price(USD):</Typography>
                                    </TableCell>
                                    <TableCell aligh='right'>${millify(information.price)}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align='left'>
                                        <Typography fontWeight='bold'>Rank:</Typography>
                                    </TableCell>
                                    <TableCell aligh='right'>{information.rank}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align='left'>
                                        <Typography fontWeight='bold'>24h Volume:</Typography>
                                    </TableCell>
                                    <TableCell aligh='right'>${millify(information.volume)}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align='left'>
                                        <Typography fontWeight='bold'>Market Cap:</Typography>
                                    </TableCell>
                                    <TableCell aligh='right'>${millify(information.marketCap)}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align='left'>
                                        <Typography fontWeight='bold'>All Time High:</Typography>
                                    </TableCell>
                                    <TableCell aligh='right'>${millify(information.allTimeHigh.price)}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align='left'>
                                        <Typography fontWeight='bold'>Total Supply:</Typography>
                                    </TableCell>
                                    <TableCell aligh='right'>{millify(information.totalSupply)}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align='left'>
                                        <Typography fontWeight='bold'>Circulating Supply:</Typography>
                                    </TableCell>
                                    <TableCell aligh='right'>{millify(information.circulatingSupply)}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
            <Grid container item spacing={2} xs={12}>
                <Grid item xs={12} lg={9}>
                    <Typography variant='h4' fontWeight='bold'>What is {information.name}?</Typography>
                    {HTMLReactParser(information.description)}
                </Grid>
                <Grid item xs={12} lg={3}>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <Typography variant='h4' fontWeight='bold'>Links</Typography>
                                    <Typography variant='subtitle2' color='GrayText'>Websites related to {information.symbol}</Typography>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {information.links.map((link) => (
                                    <TableRow>
                                        <TableCell align='left'>
                                            <Typography fontWeight='bold'>{link.type}:</Typography>
                                        </TableCell>
                                        <TableCell aligh='right'>
                                            <Link href={link.url} target='_blank'>{link.name}</Link>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default CurrencyDetails
