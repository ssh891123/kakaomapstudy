import React, {useEffect} from 'react';
import logo from './logo.svg';
import './App.css';

// typescript는 정의되지 않은 type은 에러를 발생함
declare global {
  interface Window {
    kakao: any
  }
}

function App() {

  useEffect(()=>{
    // https://apis.map.kakao.com/web/guide/
    const container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스

    const options = { //지도를 생성할 때 필요한 기본 옵션
      center: new window.kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
      level: 3 //지도의 레벨(확대, 축소 정도)
    };

    const map = new window.kakao.maps.Map(container, options);
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
