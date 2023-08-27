import { IsISO8601, IsInt, IsNotEmpty } from "class-validator";

export class CreatePublicationDto {
    @IsInt()
    @IsNotEmpty({message: "Media id is required!"})
    mediaId: number;

    @IsInt()
    @IsNotEmpty({message: "Post id is required!"})
    postId: number;

    @IsISO8601({ strict: true })
    @IsNotEmpty({message: "Data is required!"})
    date: Date;
}
