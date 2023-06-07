import React, {useEffect, useRef} from 'react';
import logo from './logo.svg';
import './App.css';

// typescript는 정의되지 않은 type은 에러를 발생함
declare global {
  interface Window {
    kakao: any;
  }
}

function App() {
  const mapRef = useRef<HTMLDivElement>(null);

  // loadMap은 useEffect 안에서 호출 => 처음 렌더링될 때만 map을 가져오기 위함 
  useEffect(()=>{
    const script = document.createElement('script');
    // autoload=false | 동적으로 로딩하고 페이지에 맵을 삽입하기 위함
    // ??? | 카카오 개발자 사이트에서 앱 키 > javascript 키로 대체
    script.src = '//dapi.kakao.com/v2/maps/sdk.js?appkey=???&autoload=false';

    document.head.appendChild(script);
    script.onload = () => {
      if(mapRef.current) {
        // https://apis.map.kakao.com/web/documentation/
        // script가 load되어도 map이 완료되지 않을 수 있음
        window.kakao.maps.load(()=> {
          // https://apis.map.kakao.com/web/guide/
          const options = {
            center: new window.kakao.maps.LatLng(33.450701, 126.570667),
            level: 3
          };
          const map = new window.kakao.maps.Map(mapRef.current, options);
          })
      }
    }

    // unmount(제거)가 될 때, script도 제거
    return () => script.remove();
  }, []);
  

  return (
    <div>
      <div
        ref={mapRef}
        style={{
          width:500,
          height:500,
        }}></div>
    </div>
  );
}

export default App;
