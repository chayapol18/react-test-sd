import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Col, Row } from 'antd'
import './DetailTestOne.scss'

interface Shape {
  id: number;
  className: string;
}

type ShapesArray = Shape[];

function DetailTestOne() {
  const { i18n } = useTranslation();

  const [shapesList, setShapesList] = useState<ShapesArray>([
    {
      id: 1,
      className: 'square'
    },
    {
      id: 2,
      className: 'circle'
    },
    {
      id: 3,
      className: 'ellipse-horizontal'
    },
    {
      id: 4,
      className: 'trapezoid'
    },
    {
      id: 5,
      className: 'rectangle'
    },
    {
      id: 6,
      className: 'rhombus'
    },
  ])
  const [isChangePosition, setIsChangePosition] = useState(false)

  const moveShapeFunc = (move: string) => {
    if (move === 'left') {
      setShapesList((prevShapes) => {
        const firstShape = prevShapes[0]
        const restShapes = prevShapes.slice(1)
        return [...restShapes, firstShape]
      })
    } else {
      setShapesList((prevShapes) => {
        const lastShape = prevShapes[prevShapes.length - 1]
        const restShapes = prevShapes.slice(0, -1)
        return [lastShape, ...restShapes]
      })
    }
  }

  const changePositionFunc = () => {
    setIsChangePosition(!isChangePosition)
    setShapesList((prevShapes) => {
      const upperShapes = prevShapes.slice(0, 3)
      const restShapes = prevShapes.slice(3)
      return [...restShapes, ...upperShapes]
    })
  }

  const randomPositionFunc = () => {
    setShapesList((prevShapes) => {
      const changePositionShapes = [...prevShapes].sort(() => 0.5 - Math.random())
      return changePositionShapes
    })
  }

  return (
    <div>
      <div className='all-button-container'>
        <Row justify="center" gutter={16}>
          <Col span={6} className='button-container' onClick={() => moveShapeFunc('left')}>
            <div className='triangle-left'/>
            <p className='button-text'>{i18n.t('TestOne.MoveShape')}</p>
          </Col>
          <Col span={10} className='button-container' style={{ justifyContent: 'space-around',  marginLeft: '24px', marginRight: '24px'}} onClick={changePositionFunc}>
            <div className='triangle-up'/>
            <div className='triangle-down'/>
            <p className='button-text'>{i18n.t('TestOne.ChangePosition')}</p>
          </Col>
          <Col span={6} className='button-container' onClick={() => moveShapeFunc('right')}>
            <div className='triangle-right'/>
            <p className='button-text'>{i18n.t('TestOne.MoveShape')}</p>
          </Col>
        </Row>
      </div>
      <hr style={{margin: '30px 15%', borderBottom: '0px'}}/>
      <div className='all-geometric-container'>
        <Row justify="end">
          {
            shapesList.map((item, index) => (
              <Col 
                span={6}
                pull={(index >= 3 && !isChangePosition) || (index <= 2 && isChangePosition)? 4 : 0}
                key={item.id} 
                className={`geometric-container ${item.className === 'square' || item.className === 'circle' ? 'button-container ' : 'large-geometric-container'}`} 
                onClick={randomPositionFunc}
              >
                <div className={`${item.className}`}/>
              </Col>
            ))
          }
        </Row>
      </div>
    </div>
  );
}

export default DetailTestOne;
