import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {Link} from "react-router-dom";

const useStyles = makeStyles({
    root: {
      maxWidth: 345,
      margin: 20,
    },
  });
  
  export default function ImgMediaCard() {
    const classes = useStyles();
  
    return (
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            component="img"
            alt="Start a new meeting"
            height="200"
            image="assets/CardImgs/2.jpg"
            title="New meeting"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              Start a New Meeting
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
            <Link to ="/meeting" style ={{textDecoration:"none"}}>Start Now</Link>
            
          </Button>
        </CardActions>
      </Card>
    );
  }
