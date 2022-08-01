import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

const KilledSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const KilledPieces = () => {
  const [blackKilled, setBlackKilled] = useState([])
  const [whiteKilled, setWhiteKilled] = useState([])
  const killed = useSelector((store) => store.game.killed)
  
  useEffect(() => {
    // console.log('KilledPieces', killed)
    setBlackKilled(killed.blackKilled)
    setWhiteKilled(killed.whiteKilled)
  }, [killed])
  return (
    <div>
      <KilledSection className="black">
        {blackKilled.map((piece, index) => (
          <img
            key={index}
            src={require(`assets/images/${piece}.svg`)}
            alt={piece}
            style={{
              height: "50px",
              width: "50px",
              padding: "0px",
            }}
          />
        ))}
      </KilledSection>
      <KilledSection className="white">
        {whiteKilled.map((piece, index) => (
          <img
            key={index}
            src={require(`assets/images/${piece}.svg`)}
            alt={piece}
            style={{
              height: "50px",
              width: "50px",
              padding: "0px",
            }}
          />
        ))}
      </KilledSection>
    </div>
  )
}

export default KilledPieces