// src/main/webapp/app/modules/calculator/calculator.tsx

import React, { useState, useEffect } from 'react';
import { Button, Container, Row, Col, ListGroup, ListGroupItem } from 'reactstrap';
import './calculator.scss';

export const Calculator = () => {
  const [display, setDisplay] = useState('0');
  const [equation, setEquation] = useState('');
  const [history, setHistory] = useState<string[]>([]);

  // 扩展运算符
  const operators = ['+', '-', '*', '/', '%', '^'];
  const specialFuncs = ['sqrt', 'sin', 'cos'];

  // 添加键盘支持
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key.match(/[0-9]/)) {
        handleNumber(parseInt(e.key, 10));
      } else if (operators.includes(e.key)) {
        handleOperator(e.key);
      } else if (e.key === 'Enter') {
        calculate();
      } else if (e.key === 'Escape') {
        clear();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [display, equation]);

  const handleNumber = num => {
    setDisplay(display === '0' ? String(num) : display + num);
  };

  const handleSpecialFunc = (func: string) => {
    try {
      let result;
      switch (func) {
        case 'sqrt':
          result = Math.sqrt(parseFloat(display));
          break;
        case 'sin':
          result = Math.sin(parseFloat(display));
          break;
        case 'cos':
          result = Math.cos(parseFloat(display));
          break;
        default:
          result = '错误';
          break;
      }
      setDisplay(String(result));
      addToHistory(`${func}(${display}) = ${result}`);
    } catch (e) {
      setDisplay('错误');
    }
  };

  const handleOperator = op => {
    setEquation(display + ' ' + op + ' ');
    setDisplay('0');
  };

  const calculate = () => {
    try {
      const result = eval(equation + display);
      setDisplay(String(result));
      addToHistory(`${equation}${display} = ${result}`);
      setEquation('');
    } catch (e) {
      setDisplay('错误');
    }
  };

  const addToHistory = (entry: string) => {
    setHistory(prev => [entry, ...prev.slice(0, 9)]);
  };

  const clear = () => {
    setDisplay('0');
    setEquation('');
  };

  return (
    <Container>
      <Row>
        <Col md="8">
          <div className="calculator-main p-3">
            <div className="bg-light p-2 mb-2">
              <small className="text-muted">{equation}</small>
              <div className="h3 mb-0">{display}</div>
            </div>

            {/* 特殊函数按钮 */}
            <Row className="mb-2">
              {specialFuncs.map(func => (
                <Col key={func}>
                  <Button color="info" block onClick={() => handleSpecialFunc(func)}>
                    {func}
                  </Button>
                </Col>
              ))}
            </Row>

            <Row>
              <Col xs="9">
                <Row className="g-2">
                  {[7, 8, 9, 4, 5, 6, 1, 2, 3, 0, '.'].map(num => (
                    <Col key={num} xs="4">
                      <Button color="secondary" className="w-100" onClick={() => handleNumber(num)}>
                        {num}
                      </Button>
                    </Col>
                  ))}
                </Row>
              </Col>
              <Col xs="3">
                <Row className="g-2">
                  {operators.map(op => (
                    <Col xs="12" key={op}>
                      <Button color="primary" className="w-100" onClick={() => handleOperator(op)}>
                        {op}
                      </Button>
                    </Col>
                  ))}
                </Row>
              </Col>
            </Row>

            <Row className="mt-2">
              <Col>
                <Button color="danger" className="w-100" onClick={clear}>
                  清除
                </Button>
              </Col>
              <Col>
                <Button color="success" className="w-100" onClick={calculate}>
                  =
                </Button>
              </Col>
            </Row>
          </div>
        </Col>

        {/* 历史记录 */}
        <Col md="4">
          <div className="history-panel">
            <h5>计算历史</h5>
            <ListGroup>
              {history.map((item, index) => (
                <ListGroupItem key={index}>{item}</ListGroupItem>
              ))}
            </ListGroup>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Calculator;
