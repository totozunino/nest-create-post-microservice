import { Controller, Get } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { AppService } from './app.service';
import { CreatePostEventDto } from './dto/create-post-event.dto';
import { PostStatusOptions } from './enums';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @EventPattern('post-created')
  async handleBookCreatedEvent(event: CreatePostEventDto) {
    const sleep = (ms: number): Promise<void> =>
      new Promise((resolve) => setTimeout(resolve, ms));

    await sleep(5000);

    if (Math.floor(Math.random() * 10) > 8) {
      await this.appService.updatePostStatus(
        event.postStatusId,
        PostStatusOptions.FAILED,
      );
    } else {
      await this.appService.createPost(event.createdPostDto);
      await this.appService.updatePostStatus(
        event.postStatusId,
        PostStatusOptions.CREATED,
      );
    }
  }
}
