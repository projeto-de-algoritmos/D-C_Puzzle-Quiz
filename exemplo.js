// Função para realizar a contagem de inversões
function countInversions(arr) {
    if (arr.length <= 1) {
      return {
        sortedArray: arr,
        count: 0
      };
    }
  
    // Função auxiliar para mesclar e contar inversões
    function mergeAndCount(left, right) {
      let merged = [];
      let count = 0;
      let leftIndex = 0;
      let rightIndex = 0;
  
      while (leftIndex < left.length && rightIndex < right.length) {
        if (left[leftIndex] <= right[rightIndex]) {
          merged.push(left[leftIndex]);
          leftIndex++;
        } else {
          merged.push(right[rightIndex]);
          count += left.length - leftIndex; // Incrementa o número de inversões
          rightIndex++;
        }
      }
  
      merged = merged.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
      return {
        mergedArray: merged,
        inversionCount: count
      };
    }
  
    const mid = Math.floor(arr.length / 2);
    const left = arr.slice(0, mid);
    const right = arr.slice(mid);
  
    const leftResult = countInversions(left);
    const rightResult = countInversions(right);
  
    const { mergedArray, inversionCount } = mergeAndCount(leftResult.sortedArray, rightResult.sortedArray);
  
    return {
      sortedArray: mergedArray,
      count: inversionCount + leftResult.count + rightResult.count
    };
  }
  
  // Exemplo de uso
  const array = [6,9,12,11,3,7];
  const result = countInversions(array);
  console.log("Número de inversões:", result.count);