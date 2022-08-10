import React from 'react'
import { Input } from 'antd'
import { Button } from '@mui/material'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import { Header } from './Header'
import { CheckOutlined } from '@ant-design/icons'
import Delicon from './assets/icon-del.png'
import './meeting.css'

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

let list: any = [
  {
    option: {
      show: true,
      showAdd: true,
    },
    title: 'meeting 1',
    task: [
      { name: 'to do item', isdel: false },
      { name: 'to do item', isdel: false },
      { name: 'to do item', isdel: false },
      { name: 'to do item', isdel: false },
    ],
  },
  {
    option: {
      show: true,
      showAdd: true,
    },
    title: 'meeting 2',
    task: [
      { name: 'to do item', isdel: false },
      { name: 'to do item', isdel: false },
      { name: 'to do item', isdel: false },
    ],
  },
  {
    option: {
      show: true,
      showAdd: true,
    },
    title: 'meeting 3',
    task: [
      { name: 'to do item', isdel: false },
      { name: 'to do item', isdel: true },
    ],
  },
  {
    option: {
      show: true,
      showAdd: true,
    },
    title: 'Meeting 4',
    task: [],
  },
]

export const Meeting: React.VFC = () => {
  const [user, setUser] = React.useState<User>()
  const [data, setData] = React.useState(list)
  const [isModalVisible, setisModalVisible] = React.useState(false)
  const [modalCtx, setModalCtx] = React.useState({
    index: 0,
    idx: 0,
    name: '',
  })

  const addTask = (item: any, index: any) => {
    let meet = JSON.parse(JSON.stringify(data))
    meet[index].option.showAdd = !meet[index].option.showAdd
    setData(meet)
  }

  const enterTask = (item: any, index: any, e: any) => {
    let val = e.target.value
    let meet = JSON.parse(JSON.stringify(data))
    meet[index].option.showAdd = !meet[index].option.showAdd
    meet[index].task.push({ name: val })
    setData(meet)
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

  const ondel = () => {
    let meet = JSON.parse(JSON.stringify(data))
    meet[modalCtx.index].task[modalCtx.idx].isdel = true
    setData(meet)
    setisModalVisible(!isModalVisible)
  }

  const onFilter = () => {
    let meet = JSON.parse(JSON.stringify(data))
    meet = meet.map((item: any) => {
      if (item.task.length === 0) {
        item.option.show = !item.option.show
      }
      return item
    })
    setData(meet)
  }

  return (
    <article>
      <Header
        user={user}
        onLogin={() => setUser({ name: 'Jane Doe' })}
        onLogout={() => setUser(undefined)}
        onCreateAccount={() => setUser({ name: 'Jane Doe' })}
      />
      <div className="meet-body">
        <div className="meet-head">
          <div className="meet-head-btn" onClick={onFilter}>
            Display to do list with to do item only
          </div>
        </div>
        <div className="meet-box">
          <div className="meet-box-scroll">
            <div className="flex">
              {data &&
                data.map((item: any, index: any) => {
                  return (
                    <div
                      style={{
                        visibility: item.option.show ? 'visible' : 'hidden',
                      }}
                      className="meet-from"
                      key={index}
                    >
                      <div className="form-title">{item.title}</div>
                      {item.task &&
                        item.task.length > 0 &&
                        item.task.map((itm: any, idx: any) => {
                          return (
                            <div
                              className="form-info"
                              key={idx}
                              onClick={() => showModel(index, itm, idx)}
                            >
                              <input
                                className="radio_type"
                                type="radio"
                                name="type"
                                id={idx}
                              />
                              <CheckOutlined
                                style={{
                                  visibility: itm.isdel ? 'visible' : 'hidden',
                                }}
                                className="Check-Outlined"
                              />
                              <div
                                className="form-txt"
                                style={{
                                  textDecoration: itm.isdel
                                    ? 'line-through'
                                    : '',
                                }}
                              >
                                {itm.name}
                              </div>
                            </div>
                          )
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
                          placeholder="enter a to-do task..."
                          onPressEnter={(e) => enterTask(item, index, e)}
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
          <Box sx={style}>
            <div className="flex-box">
              <img alt="" className="close-CircleOutlined" src={Delicon} />
              <div>do you want to delete this {modalCtx.name}?</div>
            </div>
            <div className="flex-box">
              <Button
                variant="contained"
                onClick={ondel}
                style={{
                  backgroundColor: '#6001D3',
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
                  color: '#000000',
                  backgroundColor: '#FCDC00',
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
  )
}
