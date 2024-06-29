import React, { useState } from 'react';

const Togglable = (props) => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <div>
      {!visible && (
        <div>
          <button onClick={toggleVisibility}>{props.buttonLabel}</button>
        </div>
      )}
      {visible && (
        <div>
          {props.children}
          <button onClick={toggleVisibility}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default Togglable;
