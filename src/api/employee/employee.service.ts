import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { Employee } from 'src/data-access/employee/employee.entity';
import { EmployeeDatabaseService } from 'src/data-access/employee/employee.database.service';

export interface EmployeeWithDaysWorked
  extends Omit<Employee, 'generateCustomId'> {
  daysWorked: number;
}

@Injectable()
export class EmployeeService {
  constructor(private employeeDatabaseService: EmployeeDatabaseService) {}

  /**
   * Creates a new employee record in the database.
   *
   * @param createEmployeeDto - Data transfer object containing the details of the employee to be created.
   * @returns A promise that resolves when the employee record has been successfully created.
   */
  async create(createEmployeeDto: CreateEmployeeDto): Promise<void> {
    await this.employeeDatabaseService.createEmployee(createEmployeeDto);
  }

  /**
   * Finds an employee by their ID.
   *
   * @param id - The ID of the employee to find.
   * @returns A promise that resolves with the employee if found, otherwise throws a NotFoundException.
   */
  async findById(id: string): Promise<Employee> {
    const employee = await this.employeeDatabaseService.getEmployee({
      where: { id },
      relations: ['cafe'],
    });
    if (!employee) {
      throw new NotFoundException(`Employee with ID "${id}" not found`);
    }
    return employee;
  }

  /**
   * Retrieves a list of employees, optionally filtered by cafe name.
   *
   * @param cafeName - The name of the cafe to filter employees by (optional).
   * @returns A promise that resolves with a list of employees, each including the number of days worked.
   */
  async findAll(cafeName?: string): Promise<EmployeeWithDaysWorked[]> {
    const employees = await this.employeeDatabaseService.getEmployees(cafeName);
    return employees.map((employee) => {
      const startDate = new Date(employee.start_date);
      const currentDate = new Date();
      const daysWorked = Math.floor(
        (currentDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24),
      );

      return { ...employee, daysWorked };
    });
  }

  /**
   * Updates an existing employee record in the database.
   *
   * @param id - The ID of the employee to update.
   * @param updateEmployeeDto - Data transfer object containing the updated details of the employee.
   * @returns A promise that resolves with the updated employee if successful, otherwise throws an error.
   */
  async update(
    id: string,
    updateEmployeeDto: CreateEmployeeDto,
  ): Promise<Employee> {
    try {
      return this.employeeDatabaseService.upsertEmployee(id, updateEmployeeDto);
    } catch {
      throw new Error('Failed to update employee');
    }
  }

  /**
   * Deletes an employee record from the database.
   *
   * @param id - The ID of the employee to delete.
   * @returns A promise that resolves when the employee record has been successfully deleted.
   */
  async delete(id: string): Promise<void> {
    return this.employeeDatabaseService.deleteEmployee(id);
  }
}
