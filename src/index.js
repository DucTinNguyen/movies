import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'antd/dist/antd.css';
import { Provider } from 'react-redux';
import {store} from './redux/configStore'
//import lib multiple language
import './i18n'

ReactDOM.render(
    <Provider store={store}>
        <Suspense fallback='en'>
            <App />
        </Suspense>
        
    </Provider>,
        document.getElementById('root')



);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
