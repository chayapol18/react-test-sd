import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import './App.scss'
import { Button, Flex, Select, Layout } from 'antd';
import { CaretLeftOutlined } from '@ant-design/icons'
import DetailTestOne from './components/DetailTestOne';
import DetailTestTwo from './components/DetailTestTwo';

const { Header, Content } = Layout;

const layoutStyle = {
  borderRadius: 8,
  overflow: 'hidden',
  backgroundColor: 'transparent'
};

const headerStyle: React.CSSProperties = {
  textAlign: 'left',
  color: '#fff',
  height: 64,
  paddingInline: 48,
  lineHeight: '64px',
  width: '100%',
  backgroundColor: 'transparent'
};

const contentStyle: React.CSSProperties = {
  textAlign: 'center',
  minHeight: 120,
  color: '#fff',
  margin: 'auto',
  width: '100%'
};

function App() {
  const { i18n } = useTranslation();
  const [testItemSelected, setTestItemSelected] = useState<number>(0) 

  const testList = [
    {
      id: 1,
      title: 'Main.TitleFirstTest',
      detail: 'Main.DetailFirstTest'
    },
    {
      id: 2,
      title: 'Main.TitleSecondTest',
      detail: 'Main.DetailSecondTest'
    },
  ]

  const changeLanguage = (value: string) => {
    i18n.changeLanguage(value)
  }

  return (
    <div className="App">
      <Layout style={layoutStyle}>
        <Header style={headerStyle}>
          {
            testItemSelected !== 0 && 
            <Button type="text" icon={<CaretLeftOutlined style={{ fontSize: '32px'}}/>} style={{marginRight: '12px'}} onClick={() => setTestItemSelected(0)}/>
          }
          {
            testItemSelected === 1 ? 
            <span style={{ fontSize: '32px', color: 'black', fontWeight: 700 }}>{i18n.t('Main.DetailFirstTest')}</span>
            : testItemSelected === 2 ?
            <span style={{ fontSize: '32px', color: 'black', fontWeight: 700 }}>{i18n.t('Main.DetailSecondTest')}</span>
            : <></>
          }
          <div style={{ position: 'absolute', right: 10, top: 0}}>
            <Select defaultValue="en"
              style={{ width: 60 }}
              onChange={changeLanguage}
              options={[
                { value: 'en', label: 'EN' },
                { value: 'th', label: 'TH' },
              ]}
            />
          </div>
        </Header>
        <Content style={contentStyle}>
          {
            testItemSelected === 0 ?
            <Flex style={{ height: '100%', width: '100%', alignItems: 'center', justifyContent: 'space-around', padding: '10% 15%'}}>
              {
                testList.map((item) => (
                  <div 
                    key={item.id} 
                    className='test-container' 
                    onClick={() => setTestItemSelected(item.id)}
                  >
                    <div style={{color: 'black', fontSize: '20px', textAlign: 'left'}}>
                      <p>{i18n.t(item.title)}</p>
                      <p>{i18n.t(item.detail)}</p>
                    </div>
                  </div>
                ))
              }
            </Flex>
            : testItemSelected === 1 ?
              <DetailTestOne />
            : testItemSelected === 2 ?
              <DetailTestTwo />
            :
            <></>
          }
        </Content>
      </Layout>
    </div>
  );
}

export default App;
