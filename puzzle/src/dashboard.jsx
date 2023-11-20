import React, { useState } from 'react';
import './style/dashboard.css';
import questionsData from './perguntas.json';

function Dashboard() {
  const [selectedOptions, setSelectedOptions] = useState(Array(10).fill(''));
  const [currentPage, setCurrentPage] = useState(0);
  const [feedback, setFeedback] = useState('');

  const options = questionsData.perguntas_respostas.map((question) => question.opcoes);

  const merge = (esqerd, direit) => {
    let vetTemp = [];
    while (esqerd.length && direit.length) {
      if (esqerd[0] < direit[0]) {
        vetTemp.push(esqerd.shift());
      } else {
        vetTemp.push(direit.shift());
      }
    }
    return vetTemp.concat(esqerd, direit);
  };

  const mergeSort = (vet) => {
    if (vet.length <= 1) {
      return vet;
    }
    const meio = Math.floor(vet.length / 2);
    const esqerd = vet.slice(0, meio);
    const direit = vet.slice(meio);
    return merge(mergeSort(esqerd), mergeSort(direit));
  };

  const SortAndContAndMerge = (A, indAtual, numQtdInver) => {
    let qtdInver = numQtdInver;
    let atual = indAtual;
    let proximo = atual + 1;
    let termina = A.length;

    if (atual === A.length - 1) {
      const vetOrden = mergeSort(A);
      return { vet: vetOrden, contInver: qtdInver };
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
    return SortAndContAndMerge(A, atual, qtdInver);
  };

  const handleOptionChange = (index, value) => {
    const newSelectedOptions = [...selectedOptions];
    newSelectedOptions[index] = value;
    setSelectedOptions(newSelectedOptions);
  };
  const submitAnswer = (index) => {
    const selectedAnswer = selectedOptions[index];
    const correctAnswerKey = questionsData.perguntas_respostas[index].resposta;

    // Mapeia a opção para um número de 1 a 4
    const mapOptionToNumber = (option) => {
      const optionKeys = Object.keys(options[index]);
      return optionKeys.indexOf(option) + 1;
    };

    const vetCheck = [1, 2, 3, 4];
    let resultContInvers;

    // Verifica se a resposta escolhida está correta
    if (correctAnswerKey === selectedAnswer) {
      resultContInvers = SortAndContAndMerge(vetCheck, 0, 0);
    } else {
      // Mapeia a resposta correta para um número
      const mappedCorrectAnswer = mapOptionToNumber(correctAnswerKey);
      // Troca a posição da resposta correta com a resposta escolhida no vetor de verificação
      swap(mappedCorrectAnswer - 1, mapOptionToNumber(selectedAnswer) - 1, vetCheck);
      resultContInvers = SortAndContAndMerge(vetCheck, 0, 0);
    }

    if (resultContInvers.contInver !== 0) {
      setFeedback(`Resposta da pergunta ${index + 1} está incorreta.`);
    } else {
      setFeedback(`Resposta da pergunta ${index + 1} está correta.`);
    }
    console.log(resultContInvers, 'teste');
  };

  const swap = (x, y, vet) => {
    const temp = vet[x];
    vet[x] = vet[y];
    vet[y] = temp;
    return vet;
  };

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
            <button className='submit' type="button" onClick={() => submitAnswer(currentPage)}>
              Verificar resposta
            </button>
            <p>{feedback}</p>
          </div>
        ))}
        <div className='buttons-page'>

            <button className='page-button' type="button" onClick={goToPrevPage}>
          Página Anterior
        </button>
            <button className='page-button'type="button" onClick={goToNextPage}>
          Próxima Página
        </button>
        </div>
      </form>
      </div>
    </div>
  );
}

export default Dashboard;
