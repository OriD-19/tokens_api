import { Controller, Post, Get, Param, Body, Put, Delete, UseGuards, Request } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { CreateTaskDto } from './dtos/create-task.dto';
import { Task } from './entities/task.entity';
import { JwtAuthGuard } from 'src/auth/jwtAuth.guard';

@UseGuards(JwtAuthGuard)
@Controller('tasks')
export class TasksController {
    constructor(private readonly tasksService: TasksService) { }

    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: "Crear una nueva tarea" })
    @ApiResponse({ status: 201, description: "Tarea creada correctamente." })
    async create(@Body() createTaskDto: CreateTaskDto, @Request() req) {
        const userId = req.user.userId;
        return this.tasksService.createTask(createTaskDto.title, createTaskDto.completed, userId);
    }


    @Get()
    @ApiOperation({ summary: "Obtener todas las tareas" })
    @ApiResponse({ status: 200, description: "Lista de tareas." })
    findAll(): Promise<Task[]> {
        return this.tasksService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: "Obtener una tarea por ID" })
    @ApiParam({ name: "id", description: "ID de la tarea" })
    @ApiResponse({ status: 200, description: "Tarea encontrada." })
    @ApiResponse({ status: 404, description: "Tarea no encontrada." })
    findById(@Param('id') id: string): Promise<Task> {
        return this.tasksService.findById(+id);
    }

    @Put(':id')
    @ApiOperation({ summary: "Actualizar tarea por ID" })
    @ApiParam({ name: "id", description: "ID de la tarea" })
    @ApiResponse({ status: 200, description: "Tarea actualizada." })
    @ApiResponse({ status: 404, description: "Tarea no encontrada." })
    update(@Param('id') id: string, @Body() body: Partial<Task>): Promise<Task> {
        return this.tasksService.updateTask(+id, body);
    }

    @Delete(':id')
    @ApiOperation({ summary: "Eliminar tarea por ID" })
    @ApiParam({ name: "id", description: "ID de la tarea" })
    @ApiResponse({ status: 204, description: "Tarea eliminada." })
    @ApiResponse({ status: 404, description: "Tarea no encontrada." })
    delete(@Param('id') id: string): Promise<void> {
        return this.tasksService.deleteTask(+id);
    }
}
