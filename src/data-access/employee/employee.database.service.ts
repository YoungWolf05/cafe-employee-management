import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from './employee.entity';
import { FindOneOptions, Repository } from 'typeorm';
import { CreateEmployeeDto } from '../../api/employee/dto/create-employee.dto';
import { Cafe } from '../cafe/cafe.entity';

/*
    The EmployeeDatabaseService class is responsible for managing employee records in the database.
*/
@Injectable()
export class EmployeeDatabaseService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
    @InjectRepository(Cafe)
    private cafeRepository: Repository<Cafe>,
  ) {}

  /**
   * Creates a new employee record in the database.
   *
   * @param createEmployeeDto - Data Transfer Object containing the details of the employee to be created.
   * @returns A promise that resolves when the employee record has been successfully created.
   * @throws NotFoundException - If the specified cafe ID does not exist.
   */
  async createEmployee(createEmployeeDto: CreateEmployeeDto): Promise<void> {
    const start_date = new Date();
    const { cafe: cafeId, ...employeeData } = createEmployeeDto;
    const employee = this.employeeRepository.create({
      ...employeeData,
      start_date,
    });

    if (cafeId) {
      const cafe = await this.cafeRepository.findOne({
        where: { id: cafeId },
      });
      if (!cafe) {
        throw new NotFoundException(`Cafe with ID "${cafeId}" not found`);
      }
      employee.cafe = cafe;
    } else {
      employee.cafe = null;
    }
    await this.employeeRepository.save(employee);
  }

  /**
   * Upserts an employee record in the database.
   *
   * This method updates an existing employee's details if the employee is found.
   * If the employee is not found, it throws a `NotFoundException`.
   * It also handles the association of the employee with a cafe, if provided.
   *
   * @param id - The unique identifier of the employee.
   * @param updateEmployeeDto - The data transfer object containing the employee details to be updated.
   * @returns A promise that resolves to the updated employee entity.
   * @throws NotFoundException - If the employee or the cafe (if provided) is not found.
   */
  async upsertEmployee(
    id: string,
    updateEmployeeDto: CreateEmployeeDto,
  ): Promise<Employee> {
    const employee = await this.employeeRepository.findOne({ where: { id } });
    if (!employee) {
      throw new NotFoundException(`Employee with ID "${id}" not found`);
    }

    const { cafe: cafeId, ...employeeData } = updateEmployeeDto;

    if (cafeId) {
      const cafe = await this.cafeRepository.findOne({
        where: { id: cafeId },
      });
      if (!cafe) {
        throw new NotFoundException(`Cafe with ID "${cafeId}" not found`);
      }
      employee.cafe = cafe;
    } else {
      employee.cafe = null;
    }

    Object.assign(employee, employeeData);
    return this.employeeRepository.save(employee);
  }

  /**
   * Retrieves a single employee record from the database based on the provided options.
   *
   * @param option - The options to find a single employee record.
   * @returns A promise that resolves to the employee entity if found, otherwise null.
   */
  async getEmployee(
    option: FindOneOptions<Employee>,
  ): Promise<Employee | null> {
    return this.employeeRepository.findOne(option);
  }

  /**
   * Retrieves a list of employee records from the database.
   *
   * This method fetches all employees, optionally filtering by the cafe name if provided.
   * It performs a left join with the cafe entity to include cafe details in the result.
   *
   * @param cafeName - (Optional) The name of the cafe to filter employees by.
   * @returns A promise that resolves to an array of employee entities.
   */
  async getEmployees(cafeName?: string): Promise<Employee[]> {
    const queryBuilder = this.employeeRepository
      .createQueryBuilder('employee')
      .leftJoinAndSelect('employee.cafe', 'cafe');

    if (cafeName) {
      queryBuilder.where('cafe.name = :cafeName', { cafeName });
    }

    return queryBuilder.getMany();
  }

  /**
   * Deletes an employee record from the database.
   *
   * This method removes an employee record based on the provided employee ID.
   *
   * @param id - The unique identifier of the employee to be deleted.
   * @returns A promise that resolves when the employee record has been successfully deleted.
   */
  async deleteEmployee(id: string): Promise<void> {
    await this.employeeRepository.delete(id);
  }
}
