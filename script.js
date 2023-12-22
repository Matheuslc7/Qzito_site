document.addEventListener('DOMContentLoaded', () => {
    const barcodeInput = document.getElementById('barcodeInput');
    const myForm = document.getElementById('myForm');
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
        barcodeDiv.textContent = `Código : ${++count}: ${barcodeValue}`;
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
    myForm.addEventListener('submit', (event) => {
      event.preventDefault(); // Prevenir o envio padrão do formulário

      // Obter os valores de subtotalList
      const subtotalItems = document.querySelectorAll('.subtotal');
      const subtotalsToSend = [];

      subtotalItems.forEach((item) => {
        const [codigo, quantidade] = item.textContent.split(':');
        subtotalsToSend.push({
          codigo: codigo.trim().replace('Código ', ''),
          quantidade: parseInt(quantidade.trim()),
        });
      });

      // Enviar os subtotais para o servidor (ajuste o URL para o seu endpoint)
      fetch('http://localhost:3000/armazenarSubtotais', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ subtotais: subtotalsToSend }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Erro ao enviar os subtotais.');
          }
          return response.json();
        })
        .then((data) => {
          console.log('Subtotais enviados com sucesso:', data);
          // Lógica adicional após o envio bem-sucedido, se necessário
        })
        .catch((error) => {
          console.error('Erro ao enviar os subtotais:', error);
        });
    });
  });
  