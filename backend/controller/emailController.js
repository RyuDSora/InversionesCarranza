import nodemailer from 'nodemailer';

// Configurar el transporte de correo
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'arambu.enrique1013@gmail.com',
    pass: 'epzt dpgr hppw xndp'
  }
});

// Función para enviar correo electrónico
export const sendEmail = async (to, subject, text) => {
  try {
    const mailOptions = {
      from: 'arambu.enrique1013@gmail.com',
      to,
      subject,
      text
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Correo electrónico enviado:', info.response);
    return true;
  } catch (error) {
    console.error('Error al enviar el correo electrónico:', error);
    return false;
  }
};
