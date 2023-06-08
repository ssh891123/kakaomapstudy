import React, {useEffect, useRef, useState} from 'react';

// typescript는 정의되지 않은 type은 에러를 발생함
declare global {
  interface Window {
    kakao: any;
  }
}

function App() {
  const mapRef = useRef<HTMLDivElement>(null);
  const [markerList, setMarkerList] = useState<any[]>([]);
  // useState보다 useRef가 좀더 이득. state가 변경될때마다 리렌더가 일어난다
  // const [map, setMap] = useState<any>();
  const map = useRef<any>(null);

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
        
          // setMap(new window.kakao.maps.Map(mapRef.current, options));
          map.current = new window.kakao.maps.Map(mapRef.current, options);

          // Marker 표시
          window.kakao.maps.event.addListener(map.current, 'rightclick', (mouseEvent: any) => {
            var latlng = mouseEvent.latLng;
            // alert('marker rightclick! '+latlng);

            const title = prompt("Marker의 title을 입력해주세요.");
            const marker = new window.kakao.maps.Marker({
              map: map.current,
              position: latlng,
              title
            });

            // Marker Array에 저장
            setMarkerList(prev => [...prev, marker]);
          });
        })
      }
    }

    // unmount(제거)가 될 때, script도 제거
    return () => script.remove();
  }, []);
  
  return (
    <div>
      <button onClick = {() => {
        // map.setCenter(new window.kakao.maps.LatLng(37.56667, 126.97806));
        map.current.setCenter(new window.kakao.maps.LatLng(37.56667, 126.97806));
      }}>
        서울
      </button>
      <button onClick = {() => {
        // map.setCenter(new window.kakao.maps.LatLng(35.179764, 129.075063));
        map.current.setCenter(new window.kakao.maps.LatLng(35.179764, 129.075063));
      }}>
        부산
      </button>
      <input type="range" min = "1" max = "20" onChange={(e) =>{
        // console.log(e.currentTarget.value);
        map.current.setLevel(e.currentTarget.value, { animate: true});
      }}/>

      <button onClick={() => {
        map.current.setMapTypeId(window.kakao.maps.MapTypeId.HYBRID);
      }}>
        지도 타입 변경
      </button>

      <div
        ref={mapRef}
        style={{
          width:800,
          height:800,
        }}></div>
        {
          markerList?.map(value => 
            <div 
              // click하면 제거
              onClick = {() => {
                value.setMap(null)
                setMarkerList(markerList.filter(v => v !== value))
              }}
              >
                {value.getTitle()+value.getPosition()}
            </div>)
        }
    </div>
  );
}

export default App;
