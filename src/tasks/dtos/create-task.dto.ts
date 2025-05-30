import { ApiProperty } from "@nestjs/swagger";

export class CreateTaskDto {
    @ApiProperty({ example: "Juan Pérez", description: "Título de la tarea" })
    title: string;

    @ApiProperty({ example: false, description: "Define si la tarea ha sido completada" })
    completed: boolean;

    @ApiProperty({ example: 1, description: "ID del usuario asociado a la tarea" })
    userId: number;
}
