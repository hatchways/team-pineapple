import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Masonry from 'react-masonry-component';

const useStyles = makeStyles(theme => ({
    title: {
        padding: '1rem 0 1rem 0',
        fontWeight: 'bold',
        fontSize: 15,
        color: 'white',
        position: 'absolute',
        bottom: 5,
        left: 0,
        width: '100%',
        textAlign: 'center'
    },
    imageContainer: {
        margin: '1vw'
    },
    image: {
        width: '20vw',
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

const Posts = ({posts}) => {
    const classes = useStyles();

    const images = posts.map((post, i) =>{
        return (
            <div className={classes.imageContainer} key={i}>
                <img src={post.image} alt={post.image.title} className={classes.image}/>
                <p className={classes.title}>{post.title}</p>
            </div>
        );
    });

    return(
        <Masonry
            className={classes.masonry}
            options={{'fitWidth': true}}
            disableImagesLoaded={false}
            updateOnEachImageLoad={false}
            imagesLoadedOptions={{}}
        >
            {images}
        </Masonry>
    );
};

export default Posts;