import React, { useEffect, useRef, useState } from "react";
import {
  Typography,
  Avatar,
  makeStyles,
  Divider,
  CircularProgress,
  CardActionArea,
} from "@material-ui/core";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { load_likes, load_follower, load_following } from "../actions/blog";
import InfiniteScroll from "react-infinite-scroll-component";

const useStyles = makeStyles((theme) => ({
  navLink: {
    textDecoration: "none",
    color: "inherit",
  },
  avatar: {
    height: 50,
    width: 50,
  },
  loader: {
    textAlign: "center",
  },
}));
const List = ({
  match,
  likes,
  follower,
  following,
  load_likes,
  like_count,
  follower_count,
  following_count,
  load_follower,
  load_following,
}) => {
  const [page, setPage] = useState(2);
  const type = match.params.type;
  const id = match.params.id;

  useEffect(() => {
    if (type === "like") {
      load_likes(id, 1);
    }
    if (type === "follower") {
      load_follower(id, 1);
    }
    if (type === "following") {
      load_following(id, 1);
    }
    setPage(2);
  }, []);
  const fetchData = async () => {
    if (type === "like") {
      await load_likes(id, page);
    }
    if (type === "follower") {
      await load_follower(id, page);
    }
    if (type === "following") {
      await load_following(id, page);
    }
    setPage(page + 1);
  };
  const classes = useStyles();
  function Component({ list, count }) {
    return (
      <InfiniteScroll
        dataLength={list.length}
        next={fetchData}
        hasMore={count > list.length}
        loader={
          <div className={classes.loader}>
            <CircularProgress color="secondary" />
          </div>
        }
        endMessage={
          <div className={classes.loader}>
            <p>...</p>
          </div>
        }
      >
        {list.map((item) => (
          <>
            <CardActionArea component={NavLink} to={`/profile/${item.name}/`}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <Avatar
                  src={item.image}
                  style={{ height: 50, width: 50, margin: 10 }}
                />
                <Typography variant="body1">{item.profile_name}</Typography>
                {item.is_verified && (
                  <img
                    src={`${process.env.REACT_APP_API_URL}/media/verified.png`}
                    style={{ height: 12, marginRight: 5 }}
                  />
                )}
              </div>
              <Divider />
            </CardActionArea>
          </>
        ))}
      </InfiniteScroll>
    );
  }
  switch (type) {
    case "like":
      return <>{likes && <Component list={likes} count={like_count} />}</>;
    case "follower":
      return (
        <>{likes && <Component list={follower} count={follower_count} />}</>
      );
    case "following":
      return (
        <>{likes && <Component list={following} count={following_count} />}</>
      );
    default:
      return <Typography>Not found!</Typography>;
  }
};

const mapStateToProps = (state) => ({
  likes: state.blog.likes,
  like_count: state.blog.like_count,
  follower: state.blog.follower,
  follower_count: state.blog.follower_count,
  following: state.blog.following,
  following_count: state.blog.following_count,
});
export default connect(mapStateToProps, {
  load_likes,
  load_follower,
  load_following,
})(List);
