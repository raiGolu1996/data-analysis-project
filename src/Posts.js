import React, { useEffect, useState } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import {
  List,
  ListItem,
  ListItemText,
  InputBase,
  IconButton,
  Paper,
} from "@material-ui/core";
import { Search } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 600,
    margin: "auto",
    marginTop: theme.spacing(4),
    // background: '#808080'
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.grey[200],
    "&:hover": {
      backgroundColor: theme.palette.grey[300],
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  listItem: {
    border: "1px solid #ddd",
    borderRadius: theme.shape.borderRadius,
    marginBottom: theme.spacing(1),
    "&:hover": {
      backgroundColor: theme.palette.grey[100],
      cursor: "pointer",
    },
  },
}));

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const classes = useStyles();

  useEffect(() => {
    axios
      .get("https://dummyjson.com/posts")
      .then((resp) => {
        // api data in format of object array
        if (resp.data && Array.isArray(resp.data.posts)) {
          setPosts(resp.data.posts);
        } else {
          console.error("Something is error:", resp.data);
        }
      })
      .catch((error) => console.error(error));
  }, []);

  const searchHandler = (e) => {
    setSearch(e.target.value);
  };

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={classes.root}>
      <Paper className={classes.search}>
        <IconButton className={classes.searchIcon} aria-label="search">
          <Search />
        </IconButton>
        <InputBase
          placeholder="Search posts"
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          inputProps={{ "aria-label": "search posts" }}
          onChange={searchHandler}
        />
      </Paper>
      <List>
        {filteredPosts.map((post) => (
          <ListItem key={post.id} className={classes.listItem}>
            <ListItemText primary={post.title} secondary={post.body} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default Posts;
