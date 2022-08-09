import React from "react"
import IGroup, { IMeeting, IUser } from "../types/types"

const AppContext = React.createContext({
    user: {} as unknown as IUser,
    meetings:[] as unknown as IMeeting,
    groups : [] as unknown as IGroup,
})

export default {AppContext}