import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreatePostDto {
    @IsString()
    @IsNotEmpty({message: 'Title is required!'})
    title: string;

    @IsString()
    @IsNotEmpty({message: 'Text is required!'})
    text:string;

    @IsString()
    @IsOptional()
    image:string;
}
