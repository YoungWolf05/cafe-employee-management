import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Delete,
  Param,
  Put,
} from '@nestjs/common';
import { CafeService } from './cafe.service';
import { CreateCafeDto } from './dto/create-cafe.dto';
import { ApiTags } from '@nestjs/swagger';
import { ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { Cafe } from 'src/data-access/cafe/cafe.entity';

/**
 * CafeController handles all HTTP requests related to cafes.
 */
@ApiTags('cafes')
@Controller('/api/v1/cafes')
export class CafeController {
  constructor(private readonly cafeService: CafeService) {}

  /**
   * Creates a new cafe.
   * @param createCafeDto - Data transfer object containing cafe details.
   * @returns The created cafe.
   */
  @Post()
  @ApiOperation({ summary: 'Create a new cafe' })
  @ApiResponse({
    status: 201,
    description: 'The cafe has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  create(@Body() createCafeDto: CreateCafeDto): Promise<void> {
    return this.cafeService.create(createCafeDto);
  }

  /**
   * Finds a cafe by its ID.
   * @param id - The ID of the cafe to find.
   * @returns The found cafe.
   */
  @Get(':id')
  @ApiOperation({ summary: 'Find a cafe by ID' })
  @ApiResponse({
    status: 200,
    description: 'The cafe has been successfully found.',
  })
  @ApiResponse({ status: 404, description: 'Cafe not found.' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'The ID of the cafe to find',
  })
  findById(@Param('id') id: string): Promise<Cafe> {
    return this.cafeService.findById(id);
  }

  /**
   * Finds all cafes, optionally filtered by location.
   * @param location - The location to filter cafes by.
   * @returns A list of cafes.
   */
  @Get()
  @ApiOperation({ summary: 'Find all cafes, optionally filtered by location' })
  @ApiResponse({
    status: 200,
    description: 'List of cafes retrieved successfully.',
  })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  findAll(@Query('location') location?: string): Promise<Cafe[]> {
    return this.cafeService.findAll(location);
  }

  /**
   * Updates a cafe by its ID.
   * @param id - The ID of the cafe to update.
   * @param updateCafeDto - Data transfer object containing updated cafe details.
   * @returns The updated cafe.
   */
  @Put(':id')
  @ApiOperation({ summary: 'Update a cafe by ID' })
  @ApiResponse({
    status: 200,
    description: 'The cafe has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'Cafe not found.' })
  update(
    @Param('id') id: string,
    @Body() updateCafeDto: CreateCafeDto,
  ): Promise<Cafe> {
    return this.cafeService.update(id, updateCafeDto);
  }

  /**
   * Deletes a cafe by its ID.
   * @param id - The ID of the cafe to delete.
   * @returns A confirmation message.
   */
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a cafe by ID' })
  @ApiResponse({
    status: 200,
    description: 'The cafe has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Cafe not found.' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'The ID of the cafe to delete',
  })
  remove(@Param('id') id: string): Promise<void> {
    return this.cafeService.delete(id);
  }
}
