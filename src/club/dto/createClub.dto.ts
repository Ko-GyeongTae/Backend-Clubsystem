import { IsNumber, IsString } from "class-validator";

export class CreateClubDTO {
    @IsString()
    name: string;

    @IsString()
    description: string;

    @IsNumber()
    totalCnt: number;
}