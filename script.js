document.addEventListener('DOMContentLoaded', () => {
    const barcodeInput = document.getElementById('barcodeInput');
    const barcodeList = document.getElementById('barcodeList');
    const subtotalList = document.getElementById('subtotalList');
    const totalElement = document.getElementById('total');
    let count = 0;
    const barcodes = {};

    barcodeInput.addEventListener('input', (event) => {
      const barcodeValue = event.target.value.trim();

      if (barcodeValue.length === 13) {
        // Armazenar o valor e calcular subtotal por código de barras
        if (!barcodes[barcodeValue]) {
          barcodes[barcodeValue] = 0;
        }
        barcodes[barcodeValue] += 1;

        // Imprimir o código de barras na tela
        const barcodeDiv = document.createElement('div');
        barcodeDiv.classList.add('barcode');
        barcodeDiv.textContent = `Código: ${++count}: ${barcodeValue}`;
        barcodeList.appendChild(barcodeDiv);

        // Limpar o campo de entrada
        barcodeInput.value = '';

        // Atualizar subtotal por código de barras na tela
        subtotalList.innerHTML = '<h2>Subtotal por Código de Barras:</h2>';
        for (const barcode in barcodes) {
          const subtotalDiv = document.createElement('div');
          subtotalDiv.classList.add('subtotal');
          subtotalDiv.textContent = `Código ${barcode}: ${barcodes[barcode]}`;
          subtotalList.appendChild(subtotalDiv);
        }

        // Calcular e exibir o total
        const total = Object.values(barcodes).reduce((acc, curr) => acc + curr, 0);
        totalElement.textContent = `Total de códigos lidos: ${total}`;
      }
    });
  });