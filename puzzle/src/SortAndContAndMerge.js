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

const A = [1,5,4,8,10,2,6,9,12,11,3,7];
const result = SortAndContAndMerge(A, 0, 0);
console.log("Número de inversões:", result.contInver,"\n array ordenado:", result.vet);