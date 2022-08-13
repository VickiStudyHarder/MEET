import { ThemeProvider } from '@emotion/react';
import { Box, createTheme, CssBaseline, Divider, List, Typography } from '@mui/material';
import React, { useState } from 'react';
import NavBar from '../molecules/NavBar';
import PageTitle from '../../stories/PageTiltle'
import RecordingListIndex from '../../stories/RecordingListIndex'
import RecordingList from '../../stories/RecordingList';
import { Link } from 'react-router-dom'
import RecordingModal from '../../stories/RecordingModal';


interface IRecording { }

const theme = createTheme();

const Recording: React.FC<IRecording> = () => {
  // change role


  const role = 'mentor'

  // const { meetingRecordings: data } = useContext(AppContext)
  // data
  const data = [{
    meetingId: '1', userId: '1', meetingName: 'meeting 1', pic: 'https://cdn.britannica.com/41/9641-004-A8DD825D/Yorkshire-boar.jpg', createBy: 'jack',
    recordingList: [
      { recordingId: '1', recordingDescription: 'this is recording 1', playingUrl: 'https://www.youtube.com/watch?v=Ke90Tje7VS0' },
      { recordingId: '2', recordingDescription: 'this is recording 2', playingUrl: 'https://www.youtube.com/watch?v=Ke90Tje7VS0' },
      { recordingId: '3', recordingDescription: 'this is recording 3', playingUrl: 'https://www.youtube.com/watch?v=Ke90Tje7VS0' },
      { recordingId: '4', recordingDescription: 'this is recording 4', playingUrl: 'https://www.youtube.com/watch?v=Ke90Tje7VS0' },
      { recordingId: '5', recordingDescription: 'this is recording 5', playingUrl: 'https://www.youtube.com/watch?v=Ke90Tje7VS0' }]
  },
  {
    meetingId: '2', userId: '1', meetingName: 'meeting 2', pic: 'https://cdn.britannica.com/41/9641-004-A8DD825D/Yorkshire-boar.jpg', createBy: 'jack',
    recordingList: [
    ]
  },
  {
    meetingId: '3', userId: '1', meetingName: 'meeting 3', pic: 'https://cdn.britannica.com/41/9641-004-A8DD825D/Yorkshire-boar.jpg', createBy: 'jack',
    recordingList: [
      { recordingId: '1', recordingDescription: 'this is recording 1', playingUrl: 'https://www.youtube.com/watch?v=Ke90Tje7VS0' },
      { recordingId: '2', recordingDescription: 'this is recording 2', playingUrl: 'https://www.youtube.com/watch?v=Ke90Tje7VS0' },
      { recordingId: '3', recordingDescription: 'this is recording 3', playingUrl: 'https://www.youtube.com/watch?v=Ke90Tje7VS0' },
      { recordingId: '4', recordingDescription: 'this is recording 4', playingUrl: 'https://www.youtube.com/watch?v=Ke90Tje7VS0' },
      { recordingId: '5', recordingDescription: 'this is recording 5', playingUrl: 'https://www.youtube.com/watch?v=Ke90Tje7VS0' }]
  },
  {
    meetingId: '4', userId: '1', meetingName: 'meeting 4', pic: 'https://cdn.britannica.com/41/9641-004-A8DD825D/Yorkshire-boar.jpg', createBy: 'jack',
    recordingList: [
      { recordingId: '1', recordingDescription: 'this is recording 1', playingUrl: 'https://www.youtube.com/watch?v=Ke90Tje7VS0' },
      { recordingId: '2', recordingDescription: 'this is recording 2', playingUrl: 'https://www.youtube.com/watch?v=Ke90Tje7VS0' },
      { recordingId: '3', recordingDescription: 'this is recording 3', playingUrl: 'https://www.youtube.com/watch?v=Ke90Tje7VS0' },
      { recordingId: '4', recordingDescription: 'this is recording 4', playingUrl: 'https://www.youtube.com/watch?v=Ke90Tje7VS0' },
      { recordingId: '5', recordingDescription: 'this is recording 5', playingUrl: 'https://www.youtube.com/watch?v=Ke90Tje7VS0' }]
  },
  {
    meetingId: '5', userId: '1', meetingName: 'meeting 5', pic: 'https://cdn.britannica.com/41/9641-004-A8DD825D/Yorkshire-boar.jpg', createBy: 'jack',
    recordingList: [
    ]
  }]

  const [showList, setShowList] = useState(false)
  const [mid, setMid] = useState('')
  const [mname, setMname] = useState('')
  const [mpic, setMpic] = useState('')

  const openList = (id: string, name: string, url: string) => {
    setShowList(true);
    setMname(name)
    setMid(id)
    setMpic(url)
  }

  // delete function
  const dFunction = () => { }
  // edit function
  const eFunction = () => { }
  // add function
  const aFunction = () => { }

  const closeList = () => setShowList(false)
  console.log('meetingId:', mid)
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NavBar />
      {
        showList && (
          <Box sx={{ margin: 10, display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ marginLeft: 3, display: 'flex' }} >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row', width: '100%' }}>
                <PageTitle content={`${mname} - Recording list`} icon='6' doSomething={() => closeList()} />
                <Box marginTop={2} marginRight={2} >
                  {
                    role === 'mentor' && (
                      <RecordingModal
                        pic={mpic}
                        meetingName={mname}
                        doSomething={() => aFunction()}
                        type='add' />
                    )
                  }

                </Box>
              </Box>

            </Box>
            <Divider variant="middle" sx={{ marginTop: 3 }} />

            <Box sx={{ maxHeight: '75vh', overflow: 'auto' }}>
              <List >
                {data.map(item => (item.meetingId == mid) && (item.recordingList.map(each => (
                  <RecordingList
                    createdBy={item.createBy}
                    meetingName={item.meetingName}
                    pic={item.pic}
                    role={role}
                    description={each.recordingDescription}
                    playFunc={() => window.open(each.playingUrl)}

                    deleteFunc={() => dFunction()}
                    editFunc={() => eFunction()}

                  />
                )))
                )
                }
              </List>
            </Box>

          </Box>
        )}

      {
        !showList && (
          <Box sx={{ margin: 10, display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ marginLeft: 3, display: 'flex' }} >
              <PageTitle content='Recording' icon='1' />
            </Box>
            <Divider variant="middle" sx={{ marginTop: 3 }} />

            <Box sx={{ maxHeight: '75vh', overflow: 'auto' }}>
              <List >
                {data.map(item => (
                  <RecordingListIndex createdBy={item?.createBy}
                    meetingName={item?.meetingName}
                    pic={item?.pic}
                    role={role}
                    status={item.recordingList.length ? true : false}
                    numberOfRecording={item.recordingList.length.toString() ? item.recordingList.length.toString() : '0'}
                    doSomething={() => openList(item.meetingId, item.meetingName, item.pic)} />
                ))
                }
              </List>
            </Box>
          </Box>
        )}

    </ThemeProvider>
  );
};

export default Recording;
