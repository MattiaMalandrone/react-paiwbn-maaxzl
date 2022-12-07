import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { DropDownList } from '@progress/kendo-react-dropdowns';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import { persistor, store } from './redux/store';

const App = () => {
  const sizes = ['X-Small', 'Small', 'Medium', 'Large', 'X-Large', '2X-Large'];
  return (
    <div>
      <React.StrictMode>
        <Provider store={store}>
          <PersistGate persistor={persistor} loading={<div>loading...</div>}>
        <div>T-shirt size:</div>
        <DropDownList
          style={{
            width: '300px',
          }}
          data={sizes}
          opened={true}
        />
          </PersistGate>
        </Provider>
      </React.StrictMode>
    </div>
  );
};
ReactDOM.render(<App />, document.querySelector('my-app'));
