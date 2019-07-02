import React from 'react';

const Home: React.FunctionComponent = props => {
  document.title ="TaskList | Welcome"
    return (
      <div>
        <h1>Welcome to Tasklists.co.uk</h1>
        <p>Please locate the page you're after using</p>
        <p>the menu button in the top left hand corner</p>
        <p>of the page, any feedback: <a href="mailto:app@tasklists.co.uk">app@tasklists.co.uk</a></p>

        <h2>Changelog (completed date)</h2>
        <p>Started writing tasklist app | (15th June) ✔</p>
        <p>Completed task list app | (20th June) ✔</p>
        <p>Due date implemented to the tasks | (21st June) ✔</p>
        <p>Created date impletemented | (21st June) ✔</p>
        <p>Formatting added to the site using Material UI | (22nd June) ✔</p>
        <p>Added React-Router | (24th June) ✔</p>
        <p>Menu Button added in top left | (24th June) ✔</p>
        <p>Split site up using react-router and the menu button | (25th June) ✔</p>
        <p>Added a homepage to the site | (27th June) ✔</p>

        <h2>Future updates/ideas</h2>
        <p>Implement account login through google?</p>
        <p>Add calendar to the app?</p>
      </div>
    );
  };


export {Home};