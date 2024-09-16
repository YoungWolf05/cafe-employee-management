import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Param,
  Query,
  Put,
} from '@nestjs/common';
import { EmployeeService, EmployeeWithDaysWorked } from './employee.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Employee } from '../../data-access/employee/employee.entity';

/**
 * EmployeeController handles all HTTP requests related to employees.
 */
@ApiTags('employees')
@Controller('/api/v1/employees')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  /**
   * Creates a new employee.
   * @param createEmployeeDto - Data Transfer Object containing employee details.
   * @returns The created employee.
   */
  @ApiOperation({ summary: 'Create a new employee' })
  @ApiResponse({
    status: 201,
    description: 'The employee has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  @Post()
  create(@Body() createEmployeeDto: CreateEmployeeDto): Promise<void> {
    return this.employeeService.create(createEmployeeDto);
  }

  /**
   * Finds an employee by ID.
   * @param id - The ID of the employee to find.
   * @returns The employee with the given ID.
   */
  @ApiOperation({ summary: 'Find an employee by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the employee to find' })
  @ApiResponse({
    status: 200,
    description: 'The employee has been successfully found.',
  })
  @ApiResponse({ status: 404, description: 'Employee not found.' })
  @Get(':id')
  findById(@Param('id') id: string): Promise<Employee> {
    return this.employeeService.findById(id);
  }

  /**
   * Finds all employees, optionally filtered by cafe.
   * @param cafe - Optional cafe filter.
   * @returns A list of employees.
   */
  @ApiOperation({ summary: 'Find all employees, optionally filtered by cafe' })
  @ApiParam({
    name: 'cafe',
    required: false,
    description: 'Optional cafe filter',
  })
  @ApiResponse({
    status: 200,
    description: 'List of employees retrieved successfully.',
  })
  @ApiResponse({ status: 404, description: 'Employees not found.' })
  @Get()
  findAll(@Query('cafe') cafe?: string): Promise<EmployeeWithDaysWorked[]> {
    return this.employeeService.findAll(cafe);
  }

  /**
   * Updates an employee by ID.
   * @param id - The ID of the employee to update.
   * @param updateEmployeeDto - Data Transfer Object containing updated employee details.
   * @returns The updated employee.
   */
  @ApiOperation({ summary: 'Update an employee by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the employee to update' })
  @ApiResponse({
    status: 200,
    description: 'The employee has been successfully updated.',
  })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  @ApiResponse({ status: 404, description: 'Employee not found.' })
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateEmployeeDto: CreateEmployeeDto,
  ): Promise<Employee> {
    return this.employeeService.update(id, updateEmployeeDto);
  }

  /**
   * Deletes an employee by ID.
   * @param id - The ID of the employee to delete.
   * @returns A confirmation message.
   */
  @ApiOperation({ summary: 'Delete an employee by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the employee to delete' })
  @ApiResponse({
    status: 200,
    description: 'The employee has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Employee not found.' })
  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.employeeService.delete(id);
  }
}
