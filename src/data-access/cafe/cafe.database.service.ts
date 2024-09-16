import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { Cafe } from './cafe.entity';
import { CreateCafeDto } from '../../api/cafe/dto/create-cafe.dto';

/**
 * CafeDatabaseService is responsible for all database operations related to cafes.
 */
@Injectable()
export class CafeDatabaseService {
  constructor(
    @InjectRepository(Cafe)
    private cafeRepository: Repository<Cafe>,
  ) {}

  /**
   * Inserts a new cafe record into the database.
   *
   * @param cafe - The data transfer object containing the details of the cafe to be inserted.
   * @returns A promise that resolves when the insertion is complete.
   */
  async insertCafe(cafe: CreateCafeDto): Promise<void> {
    await this.cafeRepository.insert(cafe);
  }

  /**
   * Inserts a new cafe record or updates an existing one in the database.
   *
   * @param cafe - The cafe entity to be inserted or updated.
   * @returns A promise that resolves to the inserted or updated cafe entity.
   */
  async upsertCafe(cafe: Cafe): Promise<Cafe> {
    return this.cafeRepository.save(cafe);
  }

  /**
   * Retrieves a single cafe record based on the provided options.
   *
   * @param option - The options to find a single cafe record.
   * @returns A promise that resolves to the found cafe record, or null if no record matches the options.
   */
  async getCafe(option: FindOneOptions<Cafe>) {
    return this.cafeRepository.findOne(option);
  }

  /**
   * Retrieves a list of cafes, optionally filtered by location.
   * If a location is provided, it returns cafes in that location,
   * along with the count of employees in each cafe, ordered by the number of employees in descending order.
   *
   * @param location - The optional location to filter cafes by.
   * @returns A promise that resolves to an array of cafes.
   */
  async getCafes(location?: string): Promise<Cafe[]> {
    if (location) {
      return this.cafeRepository
        .createQueryBuilder('cafe')
        .where('cafe.location = :location', { location })
        .leftJoin('cafe.employees', 'employee')
        .addSelect('COUNT(employee.id)', 'employeeCount') // Count employees
        .groupBy('cafe.id')
        .orderBy('employeeCount', 'DESC')
        .getMany();
    }

    return this.cafeRepository.find();
  }

  /**
   * Deletes a cafe record from the database.
   *
   * @param id - The unique identifier of the cafe to be deleted.
   * @returns A promise that resolves when the cafe has been deleted.
   */
  async deleteCafe(id: string): Promise<void> {
    await this.cafeRepository.delete(id);
  }
}
