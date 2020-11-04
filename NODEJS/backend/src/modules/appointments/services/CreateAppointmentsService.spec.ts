import CreateAppointmentService from './CreateAppointmentService';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import AppError from '@shared/errors/AppError';
import FakeNotificationsRepository from '@modules/notifications/repositories/fakes/FakeNotificationsRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let fakeNotificationsRepository: FakeNotificationsRepository;
let fakeCacheProvider: FakeCacheProvider;
let createAppointment: CreateAppointmentService

describe('CreateAppointment', () => {

  beforeEach(() => {

    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    fakeCacheProvider = new FakeCacheProvider()
    fakeNotificationsRepository = new FakeNotificationsRepository();


    createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
      fakeNotificationsRepository,
      fakeCacheProvider,
    );

  })

  it('should be able to create a new appointment', async () => {

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 8, 17, 12).getTime();
    });

    const appointment = await createAppointment.execute({
      date: new Date(2020, 8, 17, 13),
      user_id: 'user',
      provider_id: 'provider'
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('provider');
  });

  it('should not be able to create two appointments on the same time', async () => {

    const appointmentDate = new Date(2020, 8, 30, 10);

    await createAppointment.execute({
      date: appointmentDate,
      user_id: 'user',
      provider_id: 'provider'
    });

    await expect(createAppointment.execute({
      date: appointmentDate,
      user_id: 'user',
      provider_id: 'provider'
    })).rejects.toBeInstanceOf(AppError)

  });

  it('should not be able to create an appointment on a past date', async () => {

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 8, 17, 12).getTime();
    });

    await expect(createAppointment.execute({
      date: new Date(2020, 8, 16, 11),
      user_id: 'user',
      provider_id: 'provider'
    })).rejects.toBeInstanceOf(AppError)

  });

  it('should not be able to create an appointment with same user as provider', async () => {

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 8, 17, 12).getTime();
    });

    await expect(createAppointment.execute({
      date: new Date(2020, 8, 17, 13),
      user_id: 'user',
      provider_id: 'user'
    })).rejects.toBeInstanceOf(AppError)

  });

  it('should not be able to create an appointment before 8m and after 5pm', async () => {

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 8, 17, 12).getTime();
    });

    await expect(createAppointment.execute({
      date: new Date(2020, 8, 17, 7),
      user_id: 'user',
      provider_id: 'provider'
    })).rejects.toBeInstanceOf(AppError)

    await expect(createAppointment.execute({
      date: new Date(2020, 8, 17, 18),
      user_id: 'user',
      provider_id: 'provider'
    })).rejects.toBeInstanceOf(AppError)

  });


});