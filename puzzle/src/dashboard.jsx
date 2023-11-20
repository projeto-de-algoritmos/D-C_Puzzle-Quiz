import React, { useState } from 'react';
import './style/dashboard.css';
import questionsData from './perguntas.json';

function merge(esqerd, direit) {
  let vetTemp = [];

  while (esqerd.length && direit.length) {
      if (esqerd[0] < direit[0]) { 
          vetTemp.push(esqerd.shift()); // remove o primeiro elemento que esta no "esqerd" e retorna esse elemento, add ele no vetTemp 
      } else {
          vetTemp.push(direit.shift());
      }
  }
  
  return vetTemp.concat(esqerd, direit); // junta os valores da esquerda com a direita e insere no vetTemp 
}

function mergeSort(vet) {
  if (vet.length <= 1) {
      return vet;
  }

  const meio = Math.floor(vet.length / 2); // divide ao meio
  const esqerd = vet.slice(0, meio); // valores da posicao 0 ate meio (A)
  const direit = vet.slice(meio); // valores da posisao meio ate final (B)

  return merge(mergeSort(esqerd), mergeSort(direit));
}

function SortAndContAndMerge(A, indAtual, numQtdInver) {
  let qtdInver = numQtdInver;
  let atual = indAtual;
  let proximo = atual+1;
  let termina = A.length;

  if (atual === (A.length-1)) {
      const vetOrden = mergeSort(A);
      return {vet: vetOrden, contInver: qtdInver};
  }

  while (termina != 1) {
      if (A[proximo] < A[atual]) {
          qtdInver++; // conta a quantidade de invercoes
          proximo++;
      }
      else{
          proximo++;
      }
      termina--;
  }

  atual++;
  return SortAndContAndMerge(A, atual, qtdInver);
}

function swap(x, y, vet){
  let vetSwap = vet;
  const temp = vetSwap[x];
  vetSwap[x] = vetSwap[y];
  vetSwap[y] = temp;
  return vetSwap;
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
    //const result =  await newSelectedOptions.map((option) => options[index][option]);

    const vetCheck = [1,2,3,4];
    let resultContInvers = SortAndContAndMerge(vetCheck, 0, 0);

    if (arraysEqual(resultContInvers.vet, initialOrder)) {
      resultContInvers = SortAndContAndMerge(vetCheck, 0, 0);
      setFeedback(`Resposta da pergunta ${index + 1} está correta.`);
    } else {
      swap(0, 3, vetCheck);
      resultContInvers = SortAndContAndMerge(vetCheck, 0, 0);
      setFeedback(`Resposta da pergunta ${index + 1} está incorreta.`);
    }
  };

  const arraysEqual = (arr1, arr2) => arr1.join(',') === arr2.join(',');

  // const submitAnswer = (index) => {
  //   const selectedAnswer = selectedOptions[index];
  //   const correctAnswerKey = questionsData.perguntas_respostas[index].resposta;
  //   const isCorrect = selectedAnswer === correctAnswerKey;

  //   setFeedback(`Pergunta ${index + 1}: ${isCorrect ? 'Correta' : 'Incorreta'}`);
  // };

  const goToNextPage = () => setCurrentPage((prevPage) => Math.min(prevPage + 1, questionsData.perguntas_respostas.length - 1));
  const goToPrevPage = () => setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));

  return (
    <div className='container'>
      <div className='form'>
      <h1>Puzzle Quiz</h1>
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
            {/* <button type="button" onClick={() => submitAnswer(currentPage)}>
              Submeter Alternativa
            </button> */}
            <p>{feedback}</p>
          </div>
        ))}
        <div className='buttons-page'>
        <button className='page-button' type="button" onClick={goToPrevPage}>
          Página Anterior
        </button>
          <button className='page-button' type="button" onClick={goToNextPage}>
          Próxima Página
        </button>
        </div>
      </form>
      </div>
    </div>
  );
}

export default Dashboard;


