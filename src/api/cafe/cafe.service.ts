import { Injectable, NotFoundException } from '@nestjs/common';
import { Cafe } from '../../data-access/cafe/cafe.entity';
import { CreateCafeDto } from './dto/create-cafe.dto';
import { CafeDatabaseService } from '../../data-access/cafe/cafe.database.service';

@Injectable()
export class CafeService {
  constructor(private cafeDatabaseService: CafeDatabaseService) {}

  /**
   * Creates a new cafe entry in the database.
   *
   * @param createCafeDto - Data Transfer Object containing the details of the cafe to be created.
   * @returns A promise that resolves when the cafe is successfully created.
   * @throws An error if the cafe creation fails.
   */
  async create(createCafeDto: CreateCafeDto): Promise<void> {
    try {
      await this.cafeDatabaseService.insertCafe(createCafeDto);
    } catch {
      throw new Error('Failed to create cafe');
    }
  }

  /**
   * Updates an existing cafe entry in the database.
   *
   * @param id - The ID of the cafe to be updated.
   * @param updateCafeDto - Data Transfer Object containing the updated details of the cafe.
   * @returns A promise that resolves to the updated cafe.
   * @throws An error if the cafe update fails.
   */
  async update(id: string, updateCafeDto: CreateCafeDto): Promise<Cafe> {
    try {
      const cafe = await this.cafeDatabaseService.getCafe({
        where: { id },
      });
      Object.assign(cafe, updateCafeDto);
      return this.cafeDatabaseService.upsertCafe(cafe);
    } catch {
      throw new Error('Failed to update cafe');
    }
  }

  /**
   * Finds a cafe by its ID.
   *
   * @param id - The unique identifier of the cafe.
   * @returns A promise that resolves to the cafe object if found.
   * @throws NotFoundException if the cafe with the specified ID is not found.
   */
  async findById(id: string): Promise<Cafe> {
    try {
      return this.cafeDatabaseService.getCafe({
        where: { id },
      });
    } catch {
      throw new NotFoundException(`Cafe with ID "${id}" not found`);
    }
  }

  /**
   * Retrieves a list of cafes, optionally filtered by location.
   *
   * @param location - The location to filter cafes by (optional).
   * @returns A promise that resolves to an array of Cafe objects.
   * @throws An error if the cafes could not be retrieved.
   */
  async findAll(location?: string): Promise<Cafe[]> {
    try {
      return this.cafeDatabaseService.getCafes(location);
    } catch {
      throw new Error('Failed to get cafes');
    }
  }

  /**
   * Deletes a cafe by its ID.
   *
   * @param id - The unique identifier of the cafe to be deleted.
   * @returns A promise that resolves when the cafe is successfully deleted.
   * @throws An error if the deletion fails.
   */
  async delete(id: string): Promise<void> {
    try {
      await this.cafeDatabaseService.deleteCafe(id);
    } catch {
      throw new Error('Failed to delete cafe');
    }
  }
}
