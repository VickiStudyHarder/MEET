import React, { useState, useEffect, useContext } from "react";
import { Input } from "antd";
import { Button } from "@mui/material";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { CheckOutlined } from "@ant-design/icons";
import Delicon from "./assets/icon-del.png";
import CalendarUserCardPrimary from "./CalendarUserCardPrimary/CalendarUserCardPrimary";
import CalendarUserCardMini from "./CalendarUserCardMini/CalendarUserCardMini";
import "./Todo.css";
import { url } from "inspector";
import AppContext from "../contexts/AppContext";
import { setDate } from "date-fns";

const { TextArea } = Input;

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  bgcolor: "background.paper",
  // border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

type User = {
  name: string;
};

interface MeetingProps {
  showAdd?: boolean;
}

// const userInfo: { userName: string, userAvatar: string} = {
//   userName: 'Vicki Chen',
//   userAvatar: 'https://upload.wikimedia.org/wikipedia/commons/a/a5/Red_Kitten_01.jpg',
// }

// let list: any = [
//   {
//     option: {
//       show: true,
//       showAdd: true,
//     },
//     title: 'meeting 1',
//     task: [
//       { name: 'to do item', isdel: false, deled: false, isEdit: false },
//       { name: 'to do item', isdel: false, deled: false, isEdit: false },
//       { name: 'to do item', isdel: false, deled: false, isEdit: false },
//       { name: 'to do item', isdel: false, deled: false, isEdit: false },
//     ],
//   },
//   {
//     option: {
//       show: true,
//       showAdd: true,
//     },
//     title: 'meeting 2',
//     task: [
//       { name: 'to do item', isdel: false, deled: false, isEdit: false },
//       { name: 'to do item', isdel: false, deled: false, isEdit: false },
//       { name: 'to do item', isdel: false, deled: false, isEdit: false },
//     ],
//   },
//   {
//     option: {
//       show: true,
//       showAdd: true,
//     },
//     title: 'meeting 3',
//     task: [
//       { name: 'to do item', isdel: false, deled: false, isEdit: false },
//       { name: 'to do item', isdel: true, deled: false, isEdit: false },
//     ],
//   },
//   {
//     option: {
//       show: true,
//       showAdd: true,
//     },
//     title: 'Meeting 4',
//     task: [],
//   },
//   {
//     option: {
//       show: true,
//       showAdd: true,
//     },
//     title: 'Meeting 5',
//     task: [
//       { name: 'to do item', isdel: false, deled: false, isEdit: false },
//       { name: 'to do item', isdel: true, deled: false, isEdit: false },
//     ],
//   },
//   {
//     option: {
//       show: true,
//       showAdd: true,
//     },
//     title: 'Meeting 6',
//     task: [
//       { name: 'to do item', isdel: false, deled: false, isEdit: false },
//       { name: 'to do item', isdel: true, deled: false, isEdit: false },
//     ],
//   }
// ]

export const Todo: React.VFC = () => {
  // const [data, setData] = React.useState(list)

  const {
    meetingTodos,
    updateMeetingTodos,
    getMeetingTodos,
    email,
    removeTodo,
    userInfo,
    getUserInfo,
  } = useContext(AppContext);
  // useEffect(() => {}, [meetingTodos]);
  const [filter, setfilter] = React.useState(false);
  const [data, setData] = React.useState<any>([]);
  const [isModalVisible, setisModalVisible] = React.useState(false);
  const [modalCtx, setModalCtx] = React.useState({
    index: 0,
    idx: 0,
    name: "",
  });
  useEffect(() => {
    setData(meetingTodos);
  }, [meetingTodos]);

  // useEffect(() => {console.log(getMeetingTodos(email))}, []);

  // useEffect(() => {
  //   console.log("navbar:email=", email);
  //   getUserInfo(email);
  // }, []);

  // useEffect(() => {
  //   console.log("navbar:userinfo=", userInfo);
  // }, [userInfo]);

  useEffect(() => {
    getMeetingTodos(email);
    getUserInfo(email);
  }, [email]);

  useEffect(() => {
    if (email) {
      getMeetingTodos(email);
    }
  }, []);

  const addTask = (item: any, index: any) => {
    let meet = JSON.parse(JSON.stringify(meetingTodos));
    meet[index].option.showAdd = !meet[index].option.showAdd;
    setData(meet);
  };

  const enterTask = (item: any, index: any, e: any) => {
    let val = e.target.value;
    let meet = JSON.parse(JSON.stringify(data));
    meet[index].option.showAdd = !meet[index].option.showAdd;
    meet[index].task.push({ name: val });
    setData(meet);
    updateMeetingTodos(meet, email);
  };

  const editTask = (index: any, idx: any, e: any) => {
    let val = e.target.value;
    let meet = JSON.parse(JSON.stringify(data));
    meet[index].task[idx].name = val;
    meet[index].task[idx].isEdit = false;
    setData(meet);
    updateMeetingTodos(meet, email);
  };

  const showModel = (index: any, itm: any, idx: any) => {
    let obj: any = {
      index,
      idx,
      name: itm.name,
    };
    setModalCtx(obj);
    setisModalVisible(!isModalVisible);
  };

  const ondel = (index: any, idx: any) => {
    let meet = JSON.parse(JSON.stringify(data));
    meet[index].task[idx].isdel = !meet[index].task[idx].isdel;
    setData(meet);
    updateMeetingTodos(meet, email);
  };

  const delItem = () => {
    let meet = JSON.parse(JSON.stringify(data));
    meet[modalCtx.index].task[modalCtx.idx].deled = true;
    setData(meet);
    removeTodo(meet[modalCtx.index].task[modalCtx.idx].id);
    setisModalVisible(!isModalVisible);
  };

  const editItm = (index: any, idx: any) => {
    let meet = JSON.parse(JSON.stringify(data));
    meet[index].task[idx].isEdit = true;
    setData(meet);
    updateMeetingTodos(meet, email);
  };

  const onFilter = () => {
    let meet = JSON.parse(JSON.stringify(data));
    meet = meet.map((item: any) => {
      if (false === item.task.deled) {
        item.option.show = !item.option.show;
      }
      return item;
    });
    setfilter(!filter);
    setData(meet);
    updateMeetingTodos(meet, email);
  };

  console.log("data", data);
  return (
    <article>
      <div className="meet-body">
        <div className="meet-head">
          {filter ? (
            <div className="meet-head-btn line-center" onClick={onFilter}>
              Display all to do list
            </div>
          ) : (
            <div className="meet-head-btn" onClick={onFilter}>
              Display to do list with to do item only
            </div>
          )}
        </div>
        <div className="meet-userCard">
          <CalendarUserCardPrimary
            avatar={
              userInfo
                ? `../avatars/${userInfo.avatar}.png`
                : "../avatars/0.png"
            }
            name={userInfo?.firstName + " " + userInfo?.lastName}
            rating={userInfo?.rating}
            job={userInfo?.role}
          />
        </div>
        <div className="meet-box">
          <img className="meet-box-bg" src={"./landing_page.jpg"} alt="" />
          <div
            className="meet-box-scroll"
            style={{ backdropFilter: "blur(8px)" }}
          >
            <div className="flex">
              {data &&
                data.map((item: any, index: any) => {
                  console.log("item", item.task);
                  return (
                    <div
                      style={{
                        display: filter || item.task.length > 0 ? "" : "none",
                      }}
                      className="meet-from"
                      key={index}
                    >
                      <div className="form-title">{item.title}</div>
                      {item.task &&
                        item.task.length > 0 &&
                        item.task.map((itm: any, idx: any) => {
                          return (
                            <div>
                              {itm.isEdit ? (
                                <TextArea
                                  className="from-area"
                                  rows={4}
                                  placeholder="Edit your to-do task..."
                                  onPressEnter={(e) => editTask(index, idx, e)}
                                />
                              ) : (
                                <div
                                  className="form-info"
                                  style={{
                                    display:
                                      itm.deled || itm.isEdit ? "none" : "",
                                  }}
                                  key={idx}
                                >
                                  <input
                                    className="radio_type"
                                    type="radio"
                                    name="type"
                                    id={idx}
                                    onClick={() => ondel(index, idx)}
                                  />
                                  <CheckOutlined
                                    style={{
                                      visibility: itm.isdel
                                        ? "visible"
                                        : "hidden",
                                    }}
                                    onClick={() => ondel(index, idx)}
                                    className="Check-Outlined"
                                  />
                                  <div
                                    className="form-txt"
                                    style={{
                                      textDecoration: itm.isdel
                                        ? "line-through"
                                        : "",
                                    }}
                                    onClick={() => editItm(index, idx)}
                                  >
                                    {itm.name}
                                  </div>
                                  <img
                                    alt=""
                                    className="del-itm"
                                    src={Delicon}
                                    onClick={() => showModel(index, itm, idx)}
                                  />
                                </div>
                              )}
                            </div>
                          );
                        })}
                      {item.option.showAdd ? (
                        <div
                          className="form-btn"
                          onClick={() => addTask(item, index)}
                        >
                          + Add more task
                        </div>
                      ) : (
                        <TextArea
                          className="from-area"
                          rows={4}
                          placeholder="Enter your to-do task..."
                          onPressEnter={(e) => enterTask(item, index, e)}
                        />
                      )}
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
        <Modal
          open={isModalVisible}
          onClose={setisModalVisible}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div className="flex-box">
              <img alt="" className="close-CircleOutlined" src={Delicon} />
              <div>Do you want to delete this {modalCtx.name}?</div>
            </div>
            <div className="flex-box">
              <Button
                variant="contained"
                onClick={delItem}
                style={{
                  backgroundColor: "#6001D3",
                  borderRadius: 20,
                  width: 165,
                  height: 40,
                  marginTop: 15,
                }}
              >
                Yes
              </Button>
              <Button
                onClick={() => setisModalVisible(!isModalVisible)}
                variant="contained"
                style={{
                  color: "#000000",
                  backgroundColor: "#FCDC00",
                  borderRadius: 20,
                  width: 155,
                  height: 40,
                  marginLeft: 10,
                  marginTop: 15,
                }}
              >
                No
              </Button>
            </div>
          </Box>
        </Modal>
      </div>
    </article>
  );
};
