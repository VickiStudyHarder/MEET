import { func } from "prop-types";
import React, { useEffect,useState } from "react";
import $ from 'jquery'
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from '@fullcalendar/daygrid'
import momentPlugin from '@fullcalendar/moment';
// 必须引入的样式文件
// import "@fullcalendar/core/main.css";
// import "@fullcalendar/daygrid/main.css";
// import "@fullcalendar/timegrid/main.css";
import "./calendar.css";
import { callbackify } from "util";
import { url } from "node:inspector";
import { type } from "os";

interface CalendarProps {
  /**
   * Is this the principal call to action on the page?
   */
  primary?: boolean;
  /**
   * What background color to use
   */
  backgroundColor?: string;
  /**
   * How large should the button be?
   */
  size?: "small" | "medium" | "large";
  /**
   * Button contents
   */
  label?: string;
  height?: string;
  width?:string;
  /**
   * Optional click handler
   */
  eventClick: (e:any) => void;
  headerClick: (e:any) => void;
  defaultView?: string;


  events?: Array<Object>;
}

/**
 * Primary UI component for user interaction
 */
export default function CalendarTable({
  primary = false,
  size = "medium",
  backgroundColor,
  label,
  defaultView,
  height,
  width,
  events,
  eventClick,
  headerClick,
  ...props
}: CalendarProps) {
  /*const events = [{
    id
    title: "Meeting",
    color: "#6001D3",//事件块的颜色
    start: "2022-07-23T10:30:00+00:00",
    end: "2022-07-23T12:30:00+00:00"
  },
  {
    title: "Meeting2",
    color: "#6001D3",//事件块的颜色
    start: "2022-07-24T10:30:00+00:00",
    end: "2022-07-24T12:30:00+00:00"

  },

  ]
  */
  // console.log(JSON.stringify(events))

  useEffect(() => {
    let dayElement = $(".fc-col-header-cell")
    for (let i in dayElement) {
      if (dayElement.hasOwnProperty(i)) {
        if (typeof (dayElement[i].nodeName) === 'string') {
          dayElement[i].addEventListener("click", (e) => {
            e.stopPropagation();
            headerClick(dayElement[i]?.getAttribute('data-date'))
            console.log("cal table",dayElement[i]?.getAttribute('data-date'))
          }, false);
        }
      }
      // if(typeof(dayElement[i].nodeName)==='string'){
      //     dayElement[i].addEventListener("click", (e)=>{
      //       e.stopPropagation();
      //       e.preventDefault()
      //       if(e.target){
      //         try {
      //           // console.log((e.target as HTMLElement).getAttribute["aria-label"])
      //         } catch (error) {

      //         }
      //       }
      //     },false);
      // }
    }
  }, [])

  return (
    <div className="FullCalendarPage">
      <FullCalendar
        editable={true}
        height={height}// 此处高度为方便截图，可不设置
        initialView="timeGridWeek"
        plugins={[dayGridPlugin, timeGridPlugin, momentPlugin]}
        allDaySlot={false}
        slotLabelFormat="HH:mm"
        slotDuration={'00:60:00'}
        slotMinTime={"05:00:00"}
        slotMaxTime={"22:00:00"}
        scrollTime={'05:00:00'}
        contentHeight='600'
        events={events}
        eventClick={eventClick}
        displayEventTime={false}
      />
    </div>
  );
};
