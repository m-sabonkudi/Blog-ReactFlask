import React from 'react';
import PersonSvg from './PersonSvg';
import CalendarSvg from './CalendarSvg';

function AuthorDate(props) {
  return (
    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-6">
        <PersonSvg />
        {props.author}
        <span className="mx-2">•</span>
        <CalendarSvg />
        {props.date}
    </div>
  )
}

export default AuthorDate;