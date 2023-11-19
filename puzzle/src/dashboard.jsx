import React, { useState } from 'react';
import './style/dashboard.css';

function Dashboard() {

  const [selectedOptions, setSelectedOptions] = useState(Array(10).fill(''));

  const options = [
    ['Opção A', 'Opção B', 'Opção C'],
    ['Opção A', 'Opção B', 'Opção C'],
  ];

  // Atualizar respostas se o usuário mudar a opção selecionada
  const handleOptionChange = (index, value) => {
    const newSelectedOptions = [...selectedOptions];
    newSelectedOptions[index] = value;
    setSelectedOptions(newSelectedOptions);
  };

  // Submeter respostas
  const handleSubmit = () => {
    alert('Alternativas selecionadas: ' + selectedOptions.join(', '));
  };

  return (
    <div>
      <h1>Enigmas</h1>
      <form>
        {options.map((alternatives, index) => (
          <div key={index}>
            <p>Pergunta {index + 1}:</p>
            {alternatives.map((option, optionIndex) => (
              <label key={optionIndex}>
                <input
                  type="radio"
                  name={`question${index}`}
                  value={option}
                  checked={selectedOptions[index] === option}
                  onChange={() => handleOptionChange(index, option)}
                />
                {option}
              </label>
            ))}
          </div>
        ))}

        <button type="button" onClick={handleSubmit}>
          Enviar Alternativas
        </button>
      </form>
    </div>
  );
};


export default Dashboard;