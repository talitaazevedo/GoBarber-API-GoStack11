import { getRepository, Repository, Raw } from 'typeorm';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import IFindAllInMonthFromProviderDTO from '@modules/appointments/dtos/IFindAllInMonthFromProviderDTO';
import IFindAllInDayFromProviderDTO from '@modules/appointments/dtos/IFindAllInDayFromProviderDTO';
/*@EntityRepository(Appointment) recebe como parametro o Model  */
/* A Classe depende dop Repository qyue vem de type ORM Repository<Appointment>  */

// SOLID
// Liskov Substituition Principle
// Principio da prograsmação que diz que  deve ser possível substituir as informações
// Criando um conjunto de regras.
// Service não deve conhecer se o que usa  no backend é o  typeorm sql etc.

// Conforme a aplicação cresce precisamos  ter um controle maior.

class AppointmentsRepository implements IAppointmentsRepository {
  /* A Tentativa aqui é desconectar o typeORM o maximo possível da aplicação */
  private ormRepository: Repository<Appointment>;
  constructor() {
    this.ormRepository = getRepository(Appointment);
  }
  public async findAllInDayFromProvider({
    provider_id,
    month,
    year,
    day,
  }: IFindAllInDayFromProviderDTO): Promise<Appointment[]> {
    // Vou converter o mês para não ter problemas  por conta do 01
    // se o meu mes que está sendo convertido numa string for  1 ele faz 01,
    // ou seja tem que ter no minimo dois digitos e ele completa a esquerda
    const parsedDay = String(day).padStart(2, '0');
    const parserMonth = String(month).padStart(2, '0');
    const appointments = await this.ormRepository.find({
      where: {
        provider_id,
        // Aqui é uma query que se faz diretamente no banco
        // o TypeORM muda o nome de todos os campos no banco
        // para pegar utilize o DAteFieldName
        // função do postgres
        date: Raw(
          dateFieldName =>
            `to_char(${dateFieldName}, 'DD-MM-YYYY') = '${parsedDay}-${parserMonth}-${year}'`,
        ),
      },
    });
    return appointments;
  }
  public async findAllInMonthFromProvider({
    provider_id,
    month,
    year,
  }: IFindAllInMonthFromProviderDTO): Promise<Appointment[]> {
    // Vou converter o mês para não ter problemas  por conta do 01
    // se o meu mes que está sendo convertido numa string for  1 ele faz 01,
    // ou seja tem que ter no minimo dois digitos e ele completa a esquerda
    const parserMonth = String(month).padStart(2, '0');
    const appointments = await this.ormRepository.find({
      where: {
        provider_id,
        // Aqui é uma query que se faz diretamente no banco
        // o TypeORM muda o nome de todos os campos no banco
        // para pegar utilize o DAteFieldName
        // função do postgres
        date: Raw(
          dateFieldName =>
            `to_char(${dateFieldName}, 'MM-YYYY') = '${parserMonth}-${year}'`,
        ),
      },
    });
    return appointments;
  }
  /* O retorno de uma função asyncrona sempre é uma promise */
  public async findByDate(
    date: Date,
    provider_id: string,
  ): Promise<Appointment | undefined> {
    const findAppointment = await this.ormRepository.findOne({
      where: { date, provider_id },
    });

    return findAppointment || undefined;
  }
  public async create({
    provider_id,
    user_id,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = this.ormRepository.create({
      provider_id,
      user_id,
      date,
    });
    await this.ormRepository.save(appointment);
    return appointment;
  }
}

export default AppointmentsRepository;
