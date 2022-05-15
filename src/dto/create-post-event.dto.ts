import { IsInt, ValidateNested } from 'class-validator';
import { CreatePostDto } from './create-post.dto';

export class CreatePostEventDto {
  @IsInt()
  readonly postStatusId: number;

  @ValidateNested()
  readonly createdPostDto: CreatePostDto;
}
