import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions, Stack } from "@mui/material";
import { EditButton, ShowButton } from "react-admin";
import { useNavigate } from "react-router-dom";

export default function CommunityCard({ record }) {
  const navigate = useNavigate();

  return (
    <Card variant="outlined">
      <CardActionArea
        onClick={() => {
          navigate(`/communities/${record.id}/show`);
        }}
      >
        <CardMedia
          component="img"
          height="140"
          //   image="url(https://source.unsplash.com/random)"
          src={`https://source.unsplash.com/random?sig=${record.id}`}
          alt="green iguana"
        />
        <CardHeader
          // avatar={
          //   <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
          //     {`${record.username.charAt(0).toUpperCase()}`}
          //   </Avatar>
          // }
          action={
            <Button variant={"outlined"} disabled={record.is_joined}>
              {record.is_joined ? "Joined" : "Join"}
            </Button>
          }
          title={`${record.name}`}
          // subheader={`${record.created_at}`}
        />
        <CardContent>
          {/* <Typography gutterBottom variant="h5" component="div">
              {record.name}
            </Typography> */}
          <Typography variant="body2" color="text.secondary">
            {record.description ||
              "No description contains about this community"}
          </Typography>
        </CardContent>
      </CardActionArea>
      {/* <CardActions>
        <ShowButton />
        <EditButton />
      </CardActions> */}
    </Card>
  );
}
