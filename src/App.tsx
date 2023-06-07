import React, {useEffect} from 'react';
import logo from './logo.svg';
import './App.css';

// typescript는 정의되지 않은 type은 에러를 발생함
declare global {
  interface Window {
    loadMap: () => void
  }
}

function App() {

  // loadMap은 useEffect 안에서 호출 => 처음 렌더링될 때만 map을 가져오기 위함 
  useEffect(()=>{
    window.loadMap();
  }, []);

  return (
    <div>
      <div id= 'map'
      style={{
        width:500,
        height:500,
      }}></div>
    </div>
  );
}

export default App;
