import React from 'react';
import styled from 'styled-components';


const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
  
`;
const Div =styled.div`
  margin: auto;
  border-bottom: 1px solid #838688;
  background: #a9aeb0;
  color: white;
  box-shadow: 2px 2px 5px 2px #4f5152;
  border-radius: 10px;
  &:hover{
    border-bottom: 3px solid #353637;
  }
  .artist{
    padding: 0.5em;
    font-size: 12px;
  }
`;
const Link=styled.a`
  text-decoration: none;
`;

interface info{
  dl_url: string;
  photoBy: string;
  link: string;
}

export const PicList=({dl_url, photoBy, link}:info)=> {
    return (
      <>
        <Link href={link} target="_blank">
          <Div>
            <Img src={dl_url}/>
            <div className="artist"><i><b>Credits to: </b>{photoBy}</i></div>
          </Div>
        </Link>
      </>
    )
  
}