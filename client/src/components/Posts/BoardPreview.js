import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Masonry from 'react-masonry-component';

const useStyles = makeStyles(theme => ({
    imageContainer: {
        display: 'inline-block',
        width: '33%'
    },
    image: {
        width: '100%',
        height: 'auto',
        borderRadius: '1vw'
    },
    masonry: {
        margin: '0 auto',
        position: 'relative',
        textAlign: 'center',
        color: 'white'
    }
}));

const BoardPreview = ({ posts, className }) => {
    const classes = useStyles();

    const images = posts.map((post, i) => {
        return (
            <div className={classes.imageContainer} key={i}>
                <img src={post} alt={post} className={classes.image}/>
            </div>
        );
    });

    return (
        <div className={className}>
            <Masonry
                className={classes.masonry}
                options={{ fitWidth: true }}
                disableImagesLoaded={false}
                updateOnEachImageLoad={false}
                imagesLoadedOptions={{}}
            >
                {images}
            </Masonry>
        </div>
    );
};

export default BoardPreview;
