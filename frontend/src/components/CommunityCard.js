import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions, Stack } from "@mui/material";
import { EditButton, ShowButton, useCreate, useNotify } from "react-admin";
import { useNavigate } from "react-router-dom";

export default function CommunityCard({ record }) {
  const [create, { isLoading, error }] = useCreate();
  const notify = useNotify();

  const onJoin = () => {
    create(
      "community_request",
      { data: { community: record.id } },
      {
        onSuccess: () => {
          notify("Requested to join the community");
        },
        onError: () => {
          notify("Error joining the community", {
            type: "error",
          });
        },
      }
    );
  };

  const navigate = useNavigate();

  return (
    <CardActionArea
      onClick={() => {
        navigate(`/communities/${record.id}/show`);
      }}
    >
      <Card variant="outlined">
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
            <Button
              variant={"outlined"}
              disabled={record.is_joined}
              onClick={onJoin}
            >
              {record.is_joined ? "Joined" : "Join"}
            </Button>
          }
          title={`${record.name}`}
          // subheader={`${record.created_at}`}
        />
        <CardContent style={{ height: 100 }}>
          {/* <Typography gutterBottom variant="h5" component="div">
              {record.name}
            </Typography> */}
          <Typography variant="body2" color="text.secondary">
            {record.description ||
              "No description contains about this community"}
          </Typography>
        </CardContent>

        {/* <CardActions>
        <ShowButton />
        <EditButton />
      </CardActions> */}
      </Card>
    </CardActionArea>
  );
}
