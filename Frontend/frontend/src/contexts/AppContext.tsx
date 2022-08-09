import React from "react"

const AppContext = React.createContext({
    user: {} as any,
    meetingList:[] as any,
    requestList:[] as any,
    noteList:[] as 
})

export default {AppContext}