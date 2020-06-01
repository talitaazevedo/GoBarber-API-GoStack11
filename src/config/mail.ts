interface IMailConfig {
  driver: 'ethereal' | 'ses';
  defaults: {
    from: {
      email: string;
      name: string;
    };
  };
}
export default {
  driver: process.env.MAIL_DRIVER || 'ethereal',
  defaults: {
    from: {
      email: 'oi@talitaazevedo.online',
      name: 'Talita do  GoBarber',
    },
  },
} as IMailConfig;
