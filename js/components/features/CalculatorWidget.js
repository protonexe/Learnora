import React from 'react';
import { Calculator, Divide, X, Minus, Plus, Equal, Percent, Delete, History, Trash2 } from './Icon';

const CalculatorWidget = ({ onClose }) => {
  const [display, setDisplay] = React.useState('0');
  const [previous, setPrevious] = React.useState(null);
  const [operator, setOperator] = React.useState(null);
  const [waitingForOperand, setWaitingForOperand] = React.useState(false);
  const [history, setHistory] = React.useState([]);
  const [showHistory, setShowHistory] = React.useState(false);
  
  const inputDigit = (digit) => {
    if (waitingForOperand) {
      setDisplay(digit);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? digit : display + digit);
    }
  };
  
  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };
  
  const clear = () => {
    setDisplay('0');
    setPrevious(null);
    setOperator(null);
    setWaitingForOperand(false);
  };
  
  const toggleSign = () => {
    setDisplay(String(-parseFloat(display)));
  };
  
  const percentage = () => {
    setDisplay(String(parseFloat(display) / 100));
  };
  
  const performOperation = (nextOperator) => {
    const inputValue = parseFloat(display);
    
    if (previous === null) {
      setPrevious(inputValue);
    } else if (operator) {
      const currentResult = calculate(previous, inputValue, operator);
      setDisplay(String(currentResult));
      setPrevious(currentResult);
      setHistory([...history, `${previous} ${getOperatorSymbol(operator)} ${inputValue} = ${currentResult}`]);
    }
    
    setWaitingForOperand(true);
    setOperator(nextOperator);
  };
  
  const calculate = (a, b, op) => {
    switch (op) {
      case '+': return a + b;
      case '-': return a - b;
      case '*': return a * b;
      case '/': return b !== 0 ? a / b : 'Error';
      default: return b;
    }
  };
  
  const getOperatorSymbol = (op) => {
    switch (op) {
      case '+': return '+';
      case '-': return '−';
      case '*': return '×';
      case '/': return '÷';
      default: return '';
    }
  };
  
  const equals = () => {
    if (previous === null || operator === null) return;
    
    const inputValue = parseFloat(display);
    const result = calculate(previous, inputValue, operator);
    setDisplay(String(result));
    setHistory([...history, `${previous} ${getOperatorSymbol(operator)} ${inputValue} = ${result}`]);
    setPrevious(null);
    setOperator(null);
    setWaitingForOperand(true);
  };
  
  const buttons = [
    [{ label: 'C', action: clear, type: 'function' }],
    [{ label: '±', action: toggleSign, type: 'function' }],
    [{ label: '%', action: percentage, type: 'function' }],
    [{ label: '÷', action: () => performOperation('/'), type: 'operator' }],
    [{ label: '7', action: () => inputDigit('7'), type: 'digit' }],
    [{ label: '8', action: () => inputDigit('8'), type: 'digit' }],
    [{ label: '9', action: () => inputDigit('9'), type: 'digit' }],
    [{ label: '×', action: () => performOperation('*'), type: 'operator' }],
    [{ label: '4', action: () => inputDigit('4'), type: 'digit' }],
    [{ label: '5', action: () => inputDigit('5'), type: 'digit' }],
    [{ label: '6', action: () => inputDigit('6'), type: 'digit' }],
    [{ label: '−', action: () => performOperation('-'), type: 'operator' }],
    [{ label: '1', action: () => inputDigit('1'), type: 'digit' }],
    [{ label: '2', action: () => inputDigit('2'), type: 'digit' }],
    [{ label: '3', action: () => inputDigit('3'), type: 'digit' }],
    [{ label: '+', action: () => performOperation('+'), type: 'operator' }],
  ];
  
  const getButtonStyle = (type) => {
    if (type === 'operator') {
      return { background: '#8b5cf6', color: 'white' };
    } else if (type === 'function') {
      return { background: '#6b7280', color: 'white' };
    }
    return { background: '#374151', color: 'white' };
  };
  
  return (
    <div style={{
      background: '#1f2937',
      borderRadius: 20,
      padding: 20,
      width: 320
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16
      }}>
        <h3 style={{ margin: 0, color: 'white', display: 'flex', alignItems: 'center', gap: 8 }}>
          <Calculator size={20} /> Calculator
        </h3>
        <div style={{ display: 'flex', gap: 8 }}>
          <button
            onClick={() => setShowHistory(!showHistory)}
            style={{
              padding: 8,
              borderRadius: 8,
              border: 'none',
              background: showHistory ? '#8b5cf6' : 'transparent',
              color: 'white',
              cursor: 'pointer'
            }}
          >
            <History size={18} />
          </button>
        </div>
      </div>
      
      <div style={{
        background: '#111827',
        borderRadius: 12,
        padding: '16px 20px',
        marginBottom: 16,
        textAlign: 'right'
      }}>
        <div style={{
          fontSize: 14,
          color: '#9ca3af',
          marginBottom: 4,
          minHeight: 20
        }}>
          {previous !== null && operator && `${previous} ${getOperatorSymbol(operator)}`}
        </div>
        <div style={{
          fontSize: 36,
          fontWeight: 600,
          color: 'white',
          overflow: 'hidden',
          textOverflow: 'ellipsis'
        }}>
          {display}
        </div>
      </div>
      
      {showHistory ? (
        <div style={{
          background: '#111827',
          borderRadius: 12,
          padding: 12,
          maxHeight: 200,
          overflow: 'auto',
          marginBottom: 16
        }}>
          {history.length === 0 ? (
            <div style={{ color: '#6b7280', textAlign: 'center', padding: 20 }}>No history</div>
          ) : (
            <>
              {history.slice().reverse().map((item, i) => (
                <div key={i} style={{
                  padding: '8px 0',
                  borderBottom: i < history.length - 1 ? '1px solid #374151' : 'none',
                  color: '#d1d5db',
                  fontSize: 13,
                  fontFamily: 'monospace'
                }}>
                  {item}
                </div>
              ))}
              <button
                onClick={() => setHistory([])}
                style={{
                  width: '100%',
                  marginTop: 12,
                  padding: 8,
                  borderRadius: 6,
                  border: 'none',
                  background: '#ef4444',
                  color: 'white',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 6,
                  fontSize: 12
                }}
              >
                <Trash2 size={14} /> Clear History
              </button>
            </>
          )}
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 8
        }}>
          {buttons.map((btn, i) => (
            <button
              key={i}
              onClick={btn[0].action}
              style={{
                padding: 16,
                borderRadius: 12,
                border: 'none',
                fontSize: 20,
                fontWeight: 600,
                cursor: 'pointer',
                ...getButtonStyle(btn[0].type)
              }}
            >
              {btn[0].label}
            </button>
          ))}
          
          <button
            onClick={() => inputDigit('0')}
            style={{
              padding: 16,
              borderRadius: 12,
              border: 'none',
              fontSize: 20,
              fontWeight: 600,
              background: '#374151',
              color: 'white',
              cursor: 'pointer'
            }}
          >
            0
          </button>
          <button
            onClick={inputDecimal}
            style={{
              padding: 16,
              borderRadius: 12,
              border: 'none',
              fontSize: 20,
              fontWeight: 600,
              background: '#374151',
              color: 'white',
              cursor: 'pointer'
            }}
          >
            .
          </button>
          <button
            onClick={equals}
            style={{
              padding: 16,
              borderRadius: 12,
              border: 'none',
              fontSize: 20,
              fontWeight: 600,
              background: '#10b981',
              color: 'white',
              cursor: 'pointer',
              gridColumn: 'span 2'
            }}
          >
            =
          </button>
        </div>
      )}
    </div>
  );
};

export default CalculatorWidget;
