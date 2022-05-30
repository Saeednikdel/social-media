import React, { useEffect, useRef, useState } from "react";
import { w3cwebsocket } from "websocket";
import {
  TextField,
  Typography,
  IconButton,
  CircularProgress,
} from "@material-ui/core";
import { connect } from "react-redux";
import { ArrowBackIos } from "@material-ui/icons";
import { load_msg } from "../actions/message";
import Redirect from "react-router-dom/es/Redirect";
import { withRouter } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

const Chat = ({ match, load_msg, message, isAuthenticated, count }) => {
  const room = match.params.room;
  const userid = localStorage.getItem("id");
  const client = new w3cwebsocket(
    `ws://127.0.0.1:8000/ws/some_url/${room}/${userid}/`
  );

  const [msg, setMsg] = useState("");
  const [online, setOnline] = useState(0);
  const [connectionStatus, setConnectionStatus] = useState("در حال اتصال...");
  const [chat, setChat] = useState([]);
  const chatContainer = useRef();
  const [page, setPage] = useState(2);

  useEffect(() => {
    if (message.length === 0) {
      load_msg(room, 1);
    }
    client.onopen = () => {
      setConnectionStatus("متصل");
    };
    client.onmessage = (message) => {
      const data = JSON.parse(message.data);
      data.message && setChat((prev) => [data, ...prev]);
      data.online && setOnline(data.online);
    };
    client.onclose = (e) => {
      console.log("connection closed");
      setConnectionStatus("قطع شد");
    };
    return () => {
      client.close();
    };
  }, [room]);
  if (isAuthenticated === false) return <Redirect to="/login" />;
  const handleClick = (e) => {
    e.preventDefault();

    if (msg !== "") {
      client.send(
        JSON.stringify({
          type: "message",
          message: msg,
          user: userid,
        })
      );
      setMsg("");
    }
  };
  const fetchData = async () => {
    await load_msg(room, page);
    setPage(page + 1);
  };
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          maxWidth: 500,
          paddingTop: 20,
          flex: 1,
          padding: 10,
        }}
      >
        <Typography variant="subtitle2" color="textSecondary">
          {connectionStatus}
        </Typography>
        <Typography variant="subtitle2" color="textSecondary">
          {online > 1 && "آنلاین"}
        </Typography>
        <div
          ref={chatContainer}
          id="scrollableDiv"
          style={{
            height: 350,
            width: "100%",
            overflow: "auto",

            border: "silver 1px solid",
            borderRadius: 8,
            overflow: "auto",
            display: "flex",
            flexDirection: "column-reverse",
          }}
        >
          {chat &&
            chat.map((item) => (
              <div
                style={{
                  display: "flex",
                  justifyContent:
                    item.user == userid ? "flex-start" : "flex-end",
                }}
              >
                <Typography
                  variant="body2"
                  style={{
                    wordWrap: "break-word",
                    backgroundColor:
                      item.user == userid ? "#00ced1" : "#20b2aa",
                    borderRadius: 8,
                    margin: 10,
                    padding: 10,
                    maxWidth: 300,
                  }}
                >
                  {item.message}
                </Typography>
              </div>
            ))}
          {message && (
            <InfiniteScroll
              dataLength={message.length}
              next={fetchData}
              style={{ display: "flex", flexDirection: "column-reverse" }}
              inverse={true}
              scrollableTarget="scrollableDiv"
              hasMore={count > message.length}
              loader={
                <div>
                  <CircularProgress color="secondary" />
                </div>
              }
              endMessage={
                <div>
                  <p>...</p>
                </div>
              }
            >
              {message.map((item) => (
                <div
                  style={{
                    display: "flex",
                    justifyContent:
                      item.user == userid ? "flex-start" : "flex-end",
                  }}
                >
                  <Typography
                    variant="body2"
                    style={{
                      wordWrap: "break-word",
                      backgroundColor:
                        item.user == userid ? "#00ced1" : "#20b2aa",
                      borderRadius: 8,
                      margin: 10,
                      padding: 10,
                      maxWidth: 300,
                    }}
                  >
                    {item.content}
                  </Typography>
                </div>
              ))}
            </InfiniteScroll>
          )}
        </div>
        <form
          autoComplete="off"
          onSubmit={(e) => handleClick(e)}
          style={{ marginTop: 10, flex: 1 }}
        >
          <TextField
            autoComplete="off"
            id="search"
            color="secondary"
            variant="outlined"
            style={{ width: "100%" }}
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            size="small"
            InputProps={{
              endAdornment: (
                <IconButton color="secondary" size="small" type="submit">
                  <ArrowBackIos />
                </IconButton>
              ),
            }}
          />
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  message: state.message.message,
  isAuthenticated: state.auth.isAuthenticated,
  count: state.message.msg_count,
});
export default withRouter(connect(mapStateToProps, { load_msg })(Chat));
