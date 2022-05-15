import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

export default function ActionAreaCard({card, onTargetModelInfo}) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea
        onClick={(e)=>onTargetModelInfo(
          {
            language: card.language[0],
            model: card.id,
            modelName: card.label.ko
          }
          , e)}
      >
        <CardMedia
          component="img"
          height="20"
          // width="30px"
          image={card.imgPath}
          alt={card.label.ko}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            [{card.language}] {card.label.ko} ( {card.expertise.ko} )
            {/* {JSON.stringify(card)} */}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
