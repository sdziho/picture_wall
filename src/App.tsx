import React, { useState, useEffect } from 'react';
import {PicList} from './Components/PicList'
import {Loading} from './Components/Loading'
import InfiniteScroll from 'react-infinite-scroll-component';
import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components';
import axios from 'axios';

export interface Picture {
  id: number;
  author: string;
  width: number;
  height: number;
  url: string;
  download_url: string;
}

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    text-align: center;
  }
  body {
    font-family: Roboto, Arial, sans-serif;
  }
`;
const WrapperImages = styled.div`
  max-width: 70rem;
  margin: 2rem auto;
  display: grid;
  grid-gap: 2em;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-auto-rows: minmax(300px,auto);
`;

const Options=styled.a`
  padding: 1em;
  font-size: 18px;
  margin: auto;
  color: white;
  text-decoration: none;
  &:hover{
    color: #838688;
  }
`;
const Wrap=styled.div`
  background: #DEE4E7;
  .choice{
    margin: auto;
    background: #a9aeb0;
    display: flex;
    max-width: 70rem;
    box-shadow: 1px 1px 5px 1px #4f5152;
  }
`;


function App() {
  const [pictures,setPictures]=useState([{
    id: 0,
    author: "",
    width: 0,
    height: 0,
    url: "",
    download_url: "",
  }]);
  const [count, setCount] = useState(1);
  const [flag, setFlag] = useState(true);
  const [gray, setGray] = useState("?");
  const [blur, setBlur] = useState(0);
  const [blurUrl, setBlurUrl] = useState("")

  useEffect(()=>{
    componentDidMount();
  },[])
  
  const componentDidMount=() =>{
    axios.get(`https://picsum.photos/v2/list?page=${count}&limit=12`)
      .then(res => {
        if(flag) setPictures(res.data);
        else setPictures([...pictures, ...res.data]);
        setCount(count+1);
        setFlag(false);
      });
  }
  const toGray=()=>{
    if(gray==="?") setGray("?grayscale&");
    else setGray("?")
  }
  const handleOnChange = (e:any) =>{
    setBlur(e.target.value)
    if(e.target.value==0) setBlurUrl("");
    else setBlurUrl("blur="+e.target.value);
    
  }
  return (
    <Wrap>
      <GlobalStyle />
      <div className="choice">
        <Options href="#" onClick={toGray}>Switch Mode</Options>
        <Options>
          <div className="value">Blur: {blur}</div>
          <input type="range" min={0} max={10} value={blur} className="slider" onChange={handleOnChange} />
        </Options>
      </div>
      
      <InfiniteScroll
        dataLength={pictures.length}
        next={componentDidMount}
        hasMore={true}
        loader={<div><Loading /></div>}
      >
      <WrapperImages >
        {pictures.map((pic:Picture)=>(
          <PicList link={pic.url} 
            photoBy={pic.author} 
            dl_url={pic.download_url.slice(0,25)+pic.id+'/500/500'+gray+blurUrl}
            />
        ))}
      </WrapperImages>
      </InfiniteScroll>

    </Wrap>
  );
}

export default App;
