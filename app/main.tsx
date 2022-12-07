import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { DropDownList } from '@progress/kendo-react-dropdowns';
const App = () => {
  const sizes = ['X-Small', 'Small', 'Medium', 'Large', 'X-Large', '2X-Large'];
  return (
    <div>
      <React.StrictMode>
        <div>T-shirt size:</div>
        <DropDownList
          style={{
            width: '300px',
          }}
          data={sizes}
          opened={true}
        />
      </React.StrictMode>
    </div>
  );
};
ReactDOM.render(<App />, document.querySelector('my-app'));
