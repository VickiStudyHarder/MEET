import { func } from "prop-types";
import React from "react";
import "./fullCalendar.css";

interface FullCalendarProps {
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
  label: string;
  /**
   * Optional click handler
   */
  onClick?: () => void;
}

/**
 * Primary UI component for user interaction
 */
export default function FullCalendar({
  primary = false,
  size = "medium",
  backgroundColor,
  label,
  ...props
}: FullCalendarProps) {
  return <>1</>;
}
