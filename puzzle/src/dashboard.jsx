import React, { useState } from 'react';
import './style/dashboard.css';
import questionsData from './perguntas.json';

function Dashboard() {

  const [selectedOptions, setSelectedOptions] = useState(Array(10).fill(''));
  // Adicione esta linha abaixo do useState existente
  const [currentPage, setCurrentPage] = useState(0);

  const options = questionsData.perguntas_respostas.map((question) => question.opcoes);

  // Atualizar respostas se o usuário mudar a opção selecionada
  // const handleOptionChange = (index, value) => {
  //   const newSelectedOptions = [...selectedOptions];
  //   newSelectedOptions[index] = value;
  //   setSelectedOptions(newSelectedOptions);
  // };
  const handleOptionChange = (index, value) => {
    const newSelectedOptions = [...selectedOptions];
    newSelectedOptions[index] = value;
    setSelectedOptions(newSelectedOptions);

    // Submeter automaticamente a resposta ao mudar a opção
    submitAnswer(index);
  };
  const submitAnswer = (index) => {
    const selectedAnswer = selectedOptions[index];
    const correctAnswerKey = questionsData.perguntas_respostas[index].resposta;
    const isCorrect = selectedAnswer === correctAnswerKey;

    alert(`Pergunta ${index + 1}: ${isCorrect ? 'Correta' : 'Incorreta'}`);
  };



  // Submeter respostas
  // const handleSubmit = () => {
  //   const selectedAnswers = selectedOptions.map((selected, index) => {
  //     const correctAnswerKey = questionsData.perguntas_respostas[index].resposta;
  //     return `${index + 1}: ${selected === correctAnswerKey ? 'Correta' : 'Incorreta'}`;
  //   });

  //   alert(`Respostas selecionadas:\n${selectedAnswers.join('\n')}`);
  // };

  return (
    <div>
      <h1>Enigmas</h1>
      <form>
        {questionsData.perguntas_respostas.slice(currentPage, currentPage + 1).map((question, index) => (
          <div key={index}>
            <p>{`Pergunta ${currentPage + 1}: ${question.pergunta}`}</p>
            {Object.entries(question.opcoes).map(([key, option]) => (
              <label key={key}>
                <input
                  type="radio"
                  name={`question${currentPage}`}
                  value={key}
                  checked={selectedOptions[currentPage] === key}
                  onChange={() => handleOptionChange(currentPage, key)}
                />
                {option}
              </label>
            ))}
            <button type="button" onClick={() => submitAnswer(currentPage)}>
              Submeter Alternativa
            </button>
          </div>  
        ))}

        <button type="button" onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}>
          Página Anterior
        </button>
        <button type="button" onClick={() => setCurrentPage(Math.min(questionsData.perguntas_respostas.length - 1, currentPage + 1))}>
          Próxima Página
        </button>

      </form>
    </div>
  );
};

export default Dashboard;