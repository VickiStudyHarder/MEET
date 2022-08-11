import { func } from "prop-types";
import React from "react";
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
  /**
   * Optional click handler
   */
  onClick?: () => void;
  defaultView?: string;
}

/**
 * Primary UI component for user interaction
 */
export default function Calendar_table({
  primary = false,
  size = "medium",
  backgroundColor,
  label,
  defaultView,
  ...props
}: CalendarProps) {
  const events = [{
    title: "Meeting",
    color: "#6001D3",//事件块的颜色
    start: "2022-07-23T10:30:00+00:00",
    end: "2022-07-23T12:30:00+00:00"
  },
  ]
  console.log(JSON.stringify(events))
  return (
    <div className="FullCalendarPage">
      <FullCalendar
        height={800} // 此处高度为方便截图，可不设置
        initialView="timeGridWeek"
        plugins={[dayGridPlugin, timeGridPlugin, momentPlugin]}
        allDaySlot={false}
        slotLabelFormat="HH:mm"
        slotDuration={'00:60:00'}
        scrollTime={'08:00:00'}
        contentHeight='600'
        events={events}
      />
    </div>
  );
};
