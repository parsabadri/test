import React, { Component } from "react";
import axios from "axios";
import { config } from "../../config";
import "../../css/App.css";
import "./chat.css";
import Navbar from "../navbar/Navbar";

export default class Chat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
    };
  }

  sendMessage() {
    if (document.getElementById("msg").value.length > 0) {
      let data = new FormData();
      data.append("body", document.getElementById("msg").value);

      let req = {
        method: "post",
        url: config.baseUrl + "api/v1/user/chat",
        headers: {
          Authorization: "Bearer " + config.token,
        },
        data: data,
      };
      axios(req)
        .then((resp) => {
          console.log(resp);
          if (resp.status === 200) {
            this.getData();
            document.getElementById("msg").value = "";
          }
        })
        .catch((err) => {
          this.props.alert.error("مشکلی در ارتباط با سرور بوجود آمد.");
          //   this.setState({ isLogedin: false });
          //   window.localStorage.setItem("isLogedin", false);
        });
    }
  }

  getData() {
    let req = {
      method: "get",
      url: config.baseUrl + "api/v1/user/chats/100/0",
      headers: {
        Authorization: "Bearer " + config.token,
      },
    };
    axios(req)
      .then((resp) => {
        console.log(resp);
        if (resp.status === 200) {
          this.setState({ data: resp.data.items.reverse() });
          let objDiv = document.getElementById("chats");
          objDiv.scrollTop = objDiv.scrollHeight;
        }
      })
      .catch((err) => {
        this.props.alert.error("مشکلی در ارتباط با سرور بوجود آمد.");
        // this.setState({ isLogedin: false });
        // window.localStorage.setItem("isLogedin", false);
      });
  }

  componentDidMount() {
    this.getData();
  }

  render() {
    return (
      <div className=" col-xs-12 chat">
        <span>
          <div className="page-title">
            <h5>پشتیبانی</h5>
          </div>
          <div className="chats" id="chats">
            {this.state.data.map((key) => (
              <div className="chat_item">
                <span className={key.is_user === 1 ? "white" : "yellow"}>
                  <p>{key.body}</p>
                  <p>{key.created_at_j}</p>
                </span>
              </div>
            ))}
          </div>

          <div className="chat-input">
            <textarea
              className="input-field"
              id="msg"
              placeholder="چنانچه توضیحی لازم است، لطفا یادداشت نمایید"
            />
            <button
              className="btn yellow-btn"
              onClick={() => {
                this.sendMessage();
              }}
            >
              <i className="icon send-icon" />
            </button>
          </div>
        </span>
        <Navbar />
      </div>
    );
  }
}
