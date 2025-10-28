import React, { useState } from 'react';
import axios from 'axios';
import { Button, Container, Row, Col, Card, FormGroup, Input } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExchangeAlt } from '@fortawesome/free-solid-svg-icons';
import './translator.scss';

const TranslationPage = () => {
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [sourceLanguage, setSourceLanguage] = useState('en');
  const [targetLanguage, setTargetLanguage] = useState('zh-hans');

  const languages = [
    // { code: 'auto', name: '自动检测' },
    { code: 'zh-hans', name: '中文' },
    { code: 'en', name: '英语' },
    { code: 'ja', name: '日语' },
    { code: 'ko', name: '韩语' },
    { code: 'fr', name: '法语' },
    { code: 'de', name: '德语' },
    // 可以继续添加更多语言
  ];

  const handleTranslate = async () => {
    try {
      const response = await axios.post('/api/translate', {
        text: inputText,
        from: sourceLanguage,
        to: targetLanguage,
      });
      setTranslatedText(response.data);
    } catch (error) {
      console.error('Error translating text:', error);
    }
  };

  const switchLanguages = () => {
    if (sourceLanguage !== 'auto') {
      const temp = sourceLanguage;
      setSourceLanguage(targetLanguage);
      setTargetLanguage(temp);
    }
  };

  return (
    <Container className="translator-container">
      <Row className="justify-content-center">
        <Col md="10">
          <Card className="p-4 mt-4">
            <h2 className="text-center mb-4">在线翻译</h2>
            <Row className="mb-3">
              <Col xs="5">
                <FormGroup>
                  <Input type="select" value={sourceLanguage} onChange={e => setSourceLanguage(e.target.value)}>
                    {languages.map(lang => (
                      <option key={lang.code} value={lang.code}>
                        {lang.name}
                      </option>
                    ))}
                  </Input>
                </FormGroup>
              </Col>
              <Col xs="2" className="text-center">
                <Button color="link" onClick={switchLanguages} className="switch-btn">
                  <FontAwesomeIcon icon={faExchangeAlt} />
                </Button>
              </Col>
              <Col xs="5">
                <FormGroup>
                  <Input type="select" value={targetLanguage} onChange={e => setTargetLanguage(e.target.value)}>
                    {languages
                      .filter(lang => lang.code !== 'auto')
                      .map(lang => (
                        <option key={lang.code} value={lang.code}>
                          {lang.name}
                        </option>
                      ))}
                  </Input>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md="6">
                <FormGroup className="mb-3">
                  <Input
                    type="textarea"
                    value={inputText}
                    onChange={e => setInputText(e.target.value)}
                    placeholder="请输入要翻译的文本"
                    rows={6}
                    className="translation-textarea"
                  />
                </FormGroup>
              </Col>
              <Col md="6">
                <FormGroup className="mb-3">
                  <Input type="textarea" value={translatedText} readOnly placeholder="翻译结果" rows={6} className="translation-textarea" />
                </FormGroup>
              </Col>
            </Row>
            <Row className="justify-content-center">
              <Col xs="auto">
                <Button color="primary" onClick={handleTranslate} className="px-4">
                  翻译
                </Button>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default TranslationPage;
