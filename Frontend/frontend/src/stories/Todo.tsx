import React, { useState, useEffect, useContext } from 'react'
import { Input } from 'antd'
import { Button } from '@mui/material'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import { CheckOutlined } from '@ant-design/icons'
import Delicon from './assets/icon-del.png'
import CalendarUserCardPrimary from './CalendarUserCardPrimary/CalendarUserCardPrimary';
import CalendarUserCardMini from './CalendarUserCardMini/CalendarUserCardMini'
import './Todo.css'
import { url } from 'inspector'
import AppContext from '../contexts/AppContext'

const { TextArea } = Input

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 300,
  bgcolor: 'background.paper',
  // border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

type User = {
  name: string
}

interface MeetingProps {
  showAdd?: boolean
}

export const Todo: React.VFC = () => {
  const [user, setUser] = React.useState<User>()
  // const [data, setData] = React.useState(list)
  const { meetingTodos, setMeetingTodos,getUserInfo,userInfo, getMeetingTodos, email ,updateMeetingTodos} = useContext(AppContext);
  // useEffect(() => {}, [meetingTodos]);
  // const { selectedStudent } = useContext(AppContext);
  // useEffect(() => { }, [selectedStudent]);
  const [filter, setfilter] = React.useState(false)
  const [isModalVisible, setisModalVisible] = React.useState(false)
  const [modalCtx, setModalCtx] = React.useState({
    index: 0,
    idx: 0,
    name: '',
  })
  useEffect(() => { console.log(meetingTodos) }, [meetingTodos]);

  // useEffect(() => {console.log(getMeetingTodos(email))}, []);

  useEffect(() => {
    getUserInfo(email);
  }, []);

  // useEffect(() => {
  //   console.log("navbar:userinfo=", userInfo);
  // }, [userInfo]);

  useEffect(() => { getMeetingTodos(email) }, [email]);
  

  const addTask = (item: any, index: any) => {
    const meet= meetingTodos.map((x:any,i:number)=>{
      if(index === i){
        x.option.showAdd = !x.option.showAdd
      }
      return x
    })
    updateMeetingTodos(meet)
  }
  
  const enterTask = (item: any, index: any, e: any) => {
    let val = e.target.value
    const meet= meetingTodos.map((x:any,i:number)=>{
      if(index === i){
        x.option.showAdd = !x.option.showAdd
        x.task.push({name:val})
      }
    })
    updateMeetingTodos(meet)
  }
  
  const editTask = (index: any, idx: any, e: any) => {
    let val = e.target.value
    const meet= meetingTodos.map((x:any,i:number)=>{
      if(index === i){
        x.task[idx].name = val
        x.task[idx].isEdit = false
      }
    })
    setMeetingTodos(meet)
    updateMeetingTodos(meet)
  }

  const showModel = (index: any, itm: any, idx: any) => {
    let obj: any = {
      index,
      idx,
      name: itm.name,
    }
    setModalCtx(obj)
    setisModalVisible(!isModalVisible)
  }

  const ondel = (index: any, idx: any) => {
    // const meet= meetingTodos.map((x:any,i:number)=>{
    //   if(index === i){
    //     x.option.showAdd = !x.option.showAdd
    //     x.task.push({name:val})
    //   }
    // })
    // meet[index].task[idx].isdel = !meet[index].task[idx].isdel
    // setMeetingTodos(meet)
  }

  const delItem = () => {
    // meet[modalCtx.index].task[modalCtx.idx].deled = true
    // setMeetingTodos(meet)
    // setisModalVisible(!isModalVisible)
  }

  const editItm = (index: any, idx: any) => {
    // meet[index].task[idx].isEdit = true
    // setMeetingTodos(meet)
  }

  const onFilter = () => {
    // meet = meet.map((item: any) => {
    //   if (0 === item.task.length) {
    //     item.option.show = !item.option.show
    //   }
    //   return item
    // })
    // setfilter(!filter)
    // setMeetingTodos(meet)
  }


  return (
    <article>
      <div className="meet-body">
        <div className="meet-head">
          {filter ? (
            <div className="meet-head-btn line-center" onClick={onFilter} style={{borderRadius: 20,fontFamily:"Quicksand"}}>
              Display all to do list
            </div>
          ) : (
            <div className="meet-head-btn" onClick={onFilter} style={{borderRadius: 20,fontFamily:"Quicksand"}}>
              Display to do list with to do item only
            </div>
          )}
        </div>
        <div className="meet-userCard">
          <CalendarUserCardPrimary
            avatar={`./avatars/${userInfo?.avatar || "0"}.png`}
            name={userInfo?(userInfo.firstName +' ' +userInfo.lastName):''}
            rating={userInfo?.rating}
            job={userInfo?.role}
          />
        </div>
        <div className="meet-box">
          <img className="meet-box-bg" src={"./landing_page.jpg"} alt="" />
          <div className="meet-box-scroll" style={{backdropFilter:"blur(8px)"}}>
            <div className="flex">
              {meetingTodos &&
                meetingTodos.map((item: any, index: any) => {
                  return (
                    <div
                      style={{
                        display: item.option.show ? '' : 'none',
                      }}
                      className="meet-from"
                      key={index}
                    >
                      <div className="form-title" style={{fontFamily:"Quicksand"}}>{item.title}</div>
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
                                      itm.deled || itm.isEdit ? 'none' : '',
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
                                        ? 'visible'
                                        : 'hidden',
                                    }}
                                    onClick={() => ondel(index, idx)}
                                    className="Check-Outlined"
                                  />
                                  <div
                                    className="form-txt"
                                    style={{
                                      textDecoration: itm.isdel
                                        ? 'line-through'
                                        : '',
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
                          )
                        })}
                      {item.option.showAdd ? (
                        <div
                          className="form-btn"
                          onClick={() => addTask(item, index)}
                          style={{fontFamily:"Quicksand"}}
                        >
                          + Add more task
                        </div>
                      ) : (
                        <TextArea
                          className="from-area"
                          rows={4}
                          placeholder="Enter your to-do task..."
                          onPressEnter={(e) => enterTask(item, index, e)}
                          style={{fontFamily:"Quicksand"}}
                        />
                      )}
                    </div>
                  )
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
          <Box sx={style} style={{borderRadius: 20,}}>
            <div className="flex-box">
              <img alt="" className="close-CircleOutlined" src={Delicon} />
              <div style={{fontFamily:"Quicksand"}}>Do you want to delete this {modalCtx.name}?</div>
            </div>
            <div className="flex-box">
              <Button
                variant="contained"
                onClick={delItem}
                style={{
                  backgroundColor: '#6001D3',
                  borderRadius: 20,
                  width: 165,
                  height: 40,
                  marginTop: 15,
                  fontFamily:"Quicksand"
                }} 
                >
                Yes
              </Button>
              <Button
                onClick={() => setisModalVisible(!isModalVisible)}
                variant="contained"
                style={{
                  color: '#000000',
                  backgroundColor: '#FCDC00',
                  borderRadius: 20,
                  width: 155,
                  height: 40,
                  marginLeft: 10,
                  marginTop: 15,
                  fontFamily:"Quicksand"
                }}
              >
                No
              </Button>
            </div>
          </Box>
        </Modal>
      </div>
    </article>
  )
}
