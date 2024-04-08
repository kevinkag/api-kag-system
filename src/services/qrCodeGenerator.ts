import qr from 'qrcode';

// Texto que deseas codificar en el código QR
const qrText = 'Texto de prueba para el código QR';

// Generar el código QR como una cadena de texto
qr.toDataURL(qrText, (err: any, qrCodeString: string) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log(qrCodeString); // Esta es la cadena de texto del código QR
});
