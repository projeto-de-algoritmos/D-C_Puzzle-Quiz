import React, { useState } from 'react';
import './style/dashboard.css';
import questionsData from './perguntas.json';

function merge(esqerd, direit) {
  let vetTemp = [];

  while (esqerd.length && direit.length) {
    if (esqerd[0] < direit[0]) {
      vetTemp.push(esqerd.shift());
    } else {
      vetTemp.push(direit.shift());
    }
  }

  return vetTemp.concat(esqerd, direit);
}

async function SortAndContAndMergeAsync(A, indAtual, numQtdInver) {
  return new Promise((resolve) => {
    setTimeout(() => {
      let qtdInver = numQtdInver;
      let atual = indAtual;
      let proximo = atual + 1;
      let termina = A.length;

      if (atual === A.length - 1) {
        const vetOrden = mergeSort(A);
        resolve({ vet: vetOrden, contInver: qtdInver });
      }

      while (termina !== 1) {
        if (A[proximo] < A[atual]) {
          qtdInver++;
          proximo++;
        } else {
          proximo++;
        }
        termina--;
      }

      atual++;
      resolve(SortAndContAndMergeAsync(A, atual, qtdInver));
    }, 0);
  });
}

function mergeSort(vet) {
  if (vet.length <= 1) {
    return vet;
  }

  const meio = Math.floor(vet.length / 2);
  const esqerd = vet.slice(0, meio);
  const direit = vet.slice(meio);

  return merge(mergeSort(esqerd), mergeSort(direit));
}

function Dashboard() {
  const [selectedOptions, setSelectedOptions] = useState(Array(10).fill(''));
  const options = questionsData.perguntas_respostas.map((question) => question.opcoes);
  const [currentPage, setCurrentPage] = useState(0);
  const [feedback, setFeedback] = useState('');

  const handleOptionChange = async (index, value) => {
    const newSelectedOptions = [...selectedOptions];
    newSelectedOptions[index] = value;
    setSelectedOptions(newSelectedOptions);

    const initialOrder = Object.keys(options[index]).map((key) => options[index][key]); // Array representando a ordem inicial
    const result = await SortAndContAndMergeAsync(
      newSelectedOptions.map((option) => options[index][option]),
      0,
      0
    );

    if (arraysEqual(result.vet, initialOrder)) {
      setFeedback(`Resposta da pergunta ${index + 1} está correta.`);
    } else {
      setFeedback(`Resposta da pergunta ${index + 1} está incorreta.`);
    }
  };

  const arraysEqual = (arr1, arr2) => arr1.join(',') === arr2.join(',');

  const submitAnswer = (index) => {
    const selectedAnswer = selectedOptions[index];
    const correctAnswerKey = questionsData.perguntas_respostas[index].resposta;
    const isCorrect = selectedAnswer === correctAnswerKey;

    setFeedback(`Pergunta ${index + 1}: ${isCorrect ? 'Correta' : 'Incorreta'}`);
  };

  const goToNextPage = () => setCurrentPage((prevPage) => Math.min(prevPage + 1, questionsData.perguntas_respostas.length - 1));
  const goToPrevPage = () => setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));

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
            <p>{feedback}</p>
          </div>
        ))}

        <button type="button" onClick={goToPrevPage}>
          Página Anterior
        </button>
        <button type="button" onClick={goToNextPage}>
          Próxima Página
        </button>
      </form>
    </div>
  );
}

export default Dashboard;


