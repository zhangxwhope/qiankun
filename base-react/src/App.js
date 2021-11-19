import './App.css';
import { Link } from 'react-router-dom';
import { initGlobalState, addGlobalUncaughtErrorHandler, removeGlobalUncaughtErrorHandler } from 'qiankun'
import { useState, useEffect } from 'react'

// actions.setGlobalState({
//   data: 'global data change by master'
// })

// 全局的未捕获异常处理
const errorHandler = (event) => {
  console.log("event", event)
}

function App() {
  const [state, setState] = useState({
    data: 'global data'
  })
  const actions = initGlobalState(state)

  useEffect(() => {
    addGlobalUncaughtErrorHandler(errorHandler);
    actions.onGlobalStateChange((state, prev) => {
      // state: 变更后的状态; prev 变更前的状态
      if (state.data !== prev.data) {
        console.log(state, '主应用 state');
        console.log(prev, '主应用 prev');
        setState(state)
      }
    })
    return () => {
      removeGlobalUncaughtErrorHandler(errorHandler)
      actions.offGlobalStateChange();
    }
  })

  return (
    <div className="App">
      <p>Base React App</p>
      <p>{ state.data }</p>
      <Link to="/">Home</Link>
      &nbsp;|&nbsp;
      <Link to="/app-vue-base">AppVueBase</Link>
      <div id="container1"></div>
    </div>
  );
}

export default App;
