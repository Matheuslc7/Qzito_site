document.addEventListener('DOMContentLoaded', () => {
  const barcodeInput = document.getElementById('barcodeInput');
  const barcodeList = document.getElementById('barcodeList');
  const subtotalValues = document.getElementById('subtotalValues');
  const totalElement = document.getElementById('total');
  let count = 0;
  const barcodes = {};

  barcodeInput.addEventListener('input', (event) => {
    const barcodeValue = event.target.value.trim();

    if (barcodeValue.length === 13) {
      // Restante do seu código...

      // Limpar o campo de entrada
      barcodeInput.value = '';

      // Atualizar subtotal por código de barras na tela
      subtotalValues.innerHTML = ''; // Limpar os campos de subtotal

      for (const barcode in barcodes) {
        const subtotalInput = document.createElement('input');
        subtotalInput.type = 'hidden';
        subtotalInput.name = `subtotal_${barcode}`; // Nome único para cada subtotal
        subtotalInput.value = barcodes[barcode];
        subtotalValues.appendChild(subtotalInput);
      }

      // Restante do seu código...
    }
  });

  // Evento de envio do formulário
  const myForm = document.getElementById('myForm');
  myForm.addEventListener('submit', (event) => {
    // Impedir o envio padrão do formulário para este exemplo
    event.preventDefault();

    // Aqui você pode enviar o formulário usando AJAX ou realizar outras ações necessárias
    // Por exemplo:
    // const formData = new FormData(myForm);
    // Faça algo com os dados do formulário...
  });
});
