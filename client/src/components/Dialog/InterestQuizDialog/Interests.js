import React from 'react';
import { makeStyles } from '@material-ui/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';

import backyard from '../../../assets/interests/back.jpg';
import decor from '../../../assets/interests/decor.jpg';
import exterior from '../../../assets/interests/exterior.jpg';
import frontyard from '../../../assets/interests/front.jpg';
import garden from '../../../assets/interests/garden.jpg';
import interior from '../../../assets/interests/interior.jpg';
import location from '../../../assets/interests/location.jpg';
import modern from '../../../assets/interests/modern.jpg';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    }
}));

const interests = [
    { image: modern, title: 'House Style' },
    { image: location, title: 'Location' },
    { image: interior, title: 'Interior Design' },
    { image: exterior, title: 'Exterior design' },
    { image: frontyard, title: 'Front yard' },
    { image: backyard, title: 'Back Yard' },
    { image: decor, title: 'House decor' },
    { image: garden, title: 'Garden' },
];

const Interests = () => {
    const classes = useStyles();

    return(
        <div className={classes.root}>
            <GridList className={classes.gridList} cols={4}>
                {interests.map(interest => (
                    <GridListTile key={interest.image} rows={2} cols={4}>
                        <img src={interest.image} alt={interest.title} />
                    </GridListTile>
                ))}
            </GridList>
        </div>
    );
};

export default Interests;