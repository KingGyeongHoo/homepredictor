import styled from 'styled-components'
import { useState } from 'react';

interface Visible{
  isVisible:boolean;
}

export default function TopButton() {
  const [isVisible, setIsVisible] = useState(false)

  let scrollTimeout: NodeJS.Timeout

  window.addEventListener('scroll', () => {
      if (window.scrollY <= 0) {
        setIsVisible(false)
      } else {
        setIsVisible(true)
      }
      const scrollDiv = document.getElementById('scrollDiv')

      if (scrollDiv) {
        scrollDiv.style.opacity = '0.1'

        clearTimeout(scrollTimeout)
        scrollTimeout = setTimeout(() => {
            scrollDiv.style.opacity = '1'
        }, 300)
      }
  })
  const scrollToTop =() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <ButtonContainer onClick={scrollToTop} isVisible={isVisible}>
      <div id='scrollDiv'>
          <p>▲</p>
      </div>
    </ButtonContainer>
  )
}

const ButtonContainer = styled.div<Visible>`
  position: fixed;
  bottom: 50px;
  right: 50px;
  display: ${props => props.isVisible ? 'flex' : 'none'};
  width: 75px;
  height: 75px;
  @media (max-width: 650px){
    bottom: 10px;
    right: 10px;
    width: 30px;
    height: 30px;
  }
  border-radius: 100px;
  z-index: 100;
  cursor: pointer;
  @media (top: 0){
    display: none;
  }
  div{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: ${props => props.theme.colors.primary};
    border-radius: 100px;
    opacity: 1;
    transition: opacity 0.3s ease;
    p{
      font-size: 1.2em;
      color: white;
      text-align: center;
      @media (max-width: 650px){
        font-size: 0.5em;
      }
    }
  }
`