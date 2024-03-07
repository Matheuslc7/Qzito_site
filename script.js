document.addEventListener('DOMContentLoaded', () => {
  const barcodeInput = document.getElementById('barcodeInput');
  const myForm = document.getElementById('myForm');
  const barcodeList = document.getElementById('barcodeList');
  const subtotalList = document.getElementById('subtotalList');
  const totalElement = document.getElementById('total');
  const barcodes = JSON.parse(localStorage.getItem('barcodes')) || {};

  // Função para atualizar a exibição dos códigos de barras na tela
  const updateBarcodeDisplay = () => {
    barcodeList.innerHTML = '';
    let count = 0;
    for (const barcode in barcodes) {
      const barcodeDiv = document.createElement('div');
      barcodeDiv.classList.add('barcode');
      barcodeDiv.textContent = `Código : ${++count}: ${barcode}`;
      barcodeList.appendChild(barcodeDiv);
    }
  };

  // Função para atualizar a exibição dos subtotais na tela
  const updateSubtotalDisplay = () => {
    subtotalList.innerHTML = '<h2>Subtotal por Código de Barras:</h2>';
    for (const barcode in barcodes) {
      const subtotalDiv = document.createElement('div');
      subtotalDiv.classList.add('subtotal');
      subtotalDiv.textContent = `Código ${barcode}: ${barcodes[barcode]}`;
      subtotalList.appendChild(subtotalDiv);
    }
  };

  // Carregar códigos de barras salvos no localStorage ao carregar a página
  updateBarcodeDisplay();
  updateSubtotalDisplay();

  barcodeInput.addEventListener('input', (event) => {
    const barcodeValue = event.target.value.trim();

    if (barcodeValue.length === 13) {
      if (!barcodes[barcodeValue]) {
        barcodes[barcodeValue] = 0;
      }
      barcodes[barcodeValue] += 1;

      // Atualizar a exibição dos códigos de barras
      updateBarcodeDisplay();

      // Limpar o campo de entrada
      barcodeInput.value = '';

      // Atualizar a exibição dos subtotais
      updateSubtotalDisplay();

      // Calcular e exibir o total
      const total = Object.values(barcodes).reduce((acc, curr) => acc + curr, 0);
      totalElement.textContent = `Total de códigos lidos: ${total}`;

      // Salvar os códigos de barras no localStorage
      localStorage.setItem('barcodes', JSON.stringify(barcodes));
    }
  });
  myForm.addEventListener('submit', async (event) => {
    event.preventDefault();
  
    // Extrair os dados do input e das divs
    const refValue = document.getElementById('ref').value.trim();
    const subtotalData = Array.from(subtotalList.children).map(div => div.textContent);
    const totalData = totalElement.textContent;
  
    // Obter a data e hora atual em horário de Brasília
    const dateTimeBrasilia = luxon.DateTime.now().setZone('America/Sao_Paulo').toISO();
  
    try {
      // Criar um objeto com os dados que você deseja enviar
      const postData = {
        ref: refValue,
        subtotalList: subtotalData,
        total: totalData,
        datetime: dateTimeBrasilia
      };
  
      // Enviar os dados para o servidor usando a função fetch
      const response = await fetch('https://api.sheetmonkey.io/form/tU48xyPpPN3DsVVefCT7d6', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData)
      });
  
      if (response.ok) {
        // Exibir mensagem de confirmação
        document.getElementById('successMessage').style.display = 'block';
      
        // Limpar os dados no localStorage
        localStorage.removeItem('barcodes');
      
        // Redirecionar para a página inicial (index.html)
        window.location.assign('https://qzito-jeans.vercel.app/');
      } else {
        console.error('Erro ao enviar os dados para o servidor.');
      }
    } catch (error) {
      console.error('Erro na solicitação:', error);
    }
  });
});